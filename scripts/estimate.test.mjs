// scripts/estimate.test.mjs — run with `npm test`
//
// Checks the calculator's pricing, PDF breakdown and address formatting:
// - restoration / painting breakdowns follow the roof material
// - line items always add up exactly to the midpoint of the range
// - asbestos is never broken down as a restoration or painting job
// - addresses read "4 Tintern Crescent", not "4, Tintern Crescent"

import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateCost, liveRange, MAX_RANGE_RATIO } from "../lib/pricing.js";
import { buildEstimateBreakdown, allocate } from "../lib/estimateBreakdown.js";
import { formatNominatimAddress, suburbFromAddress, looksLikeAddress, tidyAddress, withTypedNumber } from "../lib/formatAddress.js";
import { parseResults } from "../lib/nominatim.js";
import { rankSuggestions } from "../lib/rankSuggestions.js";
import { roofFromInsights, shapeFromSegments, distanceM } from "../lib/roofFromSolar.js";
import { takeSolarCall, dailyLimit } from "../lib/solarBudget.js";
import { solarEnabled } from "../lib/solar.js";
import { satelliteEmbedSrc } from "../lib/satelliteEmbed.js";

const METALS = ["colorbond", "galvanised", "zincalume"];
const TILES = ["concreteTile", "terracotta", "notSure"];
const NEW = ["slate", "pressedMetal"];
const SHAPES = ["flat", "gable", "hip", "dutchGable", "multiLevel"];

function breakdownFor(answers) {
  const estimate = estimateCost(answers);
  return { estimate, b: buildEstimateBreakdown({ answers, estimate }) };
}

function allItems(b) {
  return [...b.materialLineItems, ...b.labourLineItems, ...b.supportingLineItems];
}

function assertAddsUp(b, estimate, context) {
  const midpoint = (estimate.low + estimate.high) / 2;
  const items = allItems(b);
  const sum = b.isSimpleJob ? b.materialsTotal + b.labourTotal : items.reduce((t, i) => t + i.cost, 0);
  assert.equal(sum, midpoint, `${context}: items add to ${sum}, midpoint ${midpoint}`);
  for (const i of items) assert.equal(i.cost % 10, 0, `${context}: ${i.label} ${i.cost} not a whole $10`);
  if (!b.isSimpleJob) {
    const sumOf = (list) => list.reduce((t, i) => t + i.cost, 0);
    assert.equal(sumOf(b.materialLineItems), b.materialsTotal, `${context}: materials subtotal`);
    assert.equal(sumOf(b.labourLineItems), b.labourTotal, `${context}: labour subtotal`);
  }
}

const labels = (b) => allItems(b).map((i) => i.label).join(" | ");

for (const material of METALS) {
  test(`metal restoration breakdown: ${material}`, () => {
    const { b } = breakdownFor({ jobType: "restoration", material, storeys: "single", complexity: "gable", roofSizeM2: 200 });
    const text = labels(b);
    assert.doesNotMatch(text, /tile|ridge|bedding|pointing/i, text);
    for (const needed of [/clean/i, /screw/i, /rust/i, /flashing/i, /sealant/i, /primer|priming/i, /coating/i]) {
      assert.match(text, needed, `missing ${needed} in: ${text}`);
    }
    assert.doesNotMatch(b.includedItems.join(" "), /tile|ridge/i);
  });
  test(`metal painting breakdown: ${material}`, () => {
    const { b } = breakdownFor({ jobType: "painting", material, storeys: "single", complexity: "gable", roofSizeM2: 200 });
    assert.doesNotMatch(labels(b), /tile|ridge|bedding|pointing/i, labels(b));
    assert.match(labels(b), /coating/i);
  });
}

for (const material of TILES) {
  test(`tile restoration breakdown: ${material}`, () => {
    const { b } = breakdownFor({ jobType: "restoration", material, storeys: "single", complexity: "gable", roofSizeM2: 200 });
    const text = labels(b);
    for (const needed of [/tiles/i, /ridge/i, /bedding|re-bedding/i, /pointing/i, /coating/i]) {
      assert.match(text, needed, `missing ${needed} in: ${text}`);
    }
    assert.doesNotMatch(text, /screw|rust/i, text);
  });
  test(`tile painting breakdown: ${material}`, () => {
    const { b } = breakdownFor({ jobType: "painting", material, storeys: "single", complexity: "gable", roofSizeM2: 200 });
    assert.doesNotMatch(labels(b), /screw|rust/i, labels(b));
    assert.match(labels(b), /coating/i);
  });
}

for (const jobType of ["restoration", "painting"]) {
  test(`asbestos ${jobType} is broken down as a replacement only`, () => {
    const { b } = breakdownFor({
      jobType, material: "asbestos", storeys: "single", complexity: "gable", roofSizeM2: 200, desiredMaterial: "",
    });
    assert.equal(b.jobTypeLabel, "Roof Replacement");
    assert.match(labels(b), /Licensed asbestos removal/);
    assert.doesNotMatch(labels(b), /coating|ridge|rust treatment/i);
  });
}

const base200 = { storeys: "single", complexity: "gable", roofSizeM2: 200 };

test("slate restoration breakdown: slates, tingles, ridges, flashings; never coated", () => {
  const { b } = breakdownFor({ ...base200, jobType: "restoration", material: "slate" });
  const text = labels(b);
  for (const needed of [/slates/i, /tingles/i, /ridge/i, /pointing/i, /flashing/i]) {
    assert.match(text, needed, `missing ${needed} in: ${text}`);
  }
  assert.doesNotMatch(text, /coating|primer|paint|screw|rust/i, text);
});

test("slate painting is priced and broken down as a slate restoration", () => {
  const a = { ...base200, jobType: "painting", material: "slate" };
  const { b, estimate } = breakdownFor(a);
  assert.equal(b.jobTypeLabel, "Roof Restoration");
  assert.doesNotMatch(labels(b), /coating|primer|paint/i);
  assert.deepEqual(estimate, estimateCost({ ...a, jobType: "restoration" }));
});

test("pressed metal tile restoration breakdown: metal-tile items, no ridge re-bed", () => {
  const { b } = breakdownFor({ ...base200, jobType: "restoration", material: "pressedMetal" });
  const text = labels(b);
  for (const needed of [/pressed metal tiles/i, /re-fixing/i, /rust/i, /sealer|primer/i, /coating/i]) {
    assert.match(text, needed, `missing ${needed} in: ${text}`);
  }
  assert.doesNotMatch(text, /bedding|re-bed|pointing|slate/i, text);
  assert.doesNotMatch(b.includedItems.join(" "), /re-bed|pointing/i);
});

test("pressed metal tile painting breakdown: coating, no ridge re-bed", () => {
  const { b } = breakdownFor({ ...base200, jobType: "painting", material: "pressedMetal" });
  assert.match(labels(b), /coating/i);
  assert.doesNotMatch(labels(b), /bedding|pointing/i);
});

test("slate and pressed metal price ranges (200 m², gable)", () => {
  const p = (extra) => estimateCost({ ...base200, ...extra });
  assert.deepEqual(p({ jobType: "restoration", material: "slate" }), { low: 9200, high: 15000 });
  assert.deepEqual(p({ jobType: "restoration", material: "slate", storeys: "double" }), { low: 12200, high: 18800 });
  assert.deepEqual(p({ jobType: "restoration", material: "pressedMetal" }), { low: 4500, high: 8000 });
  assert.deepEqual(p({ jobType: "painting", material: "pressedMetal" }), { low: 3500, high: 5000 });
});

test("live range never widens a painting estimate with slate", () => {
  const r = liveRange({ jobType: "painting", roofSizeM2: 200, storeys: "single" });
  const slateRestore = estimateCost({ ...base200, jobType: "restoration", material: "slate" });
  assert.ok(r.high < slateRestore.high, `painting high ${r.high}`);
});

test("line items add up to the midpoint for every job, material and size", () => {
  let cases = 0;
  for (const storeys of ["single", "double"]) {
    for (const roofSizeM2 of [80, 150, 200, 250, 500]) {
      for (const complexity of SHAPES) {
        for (const material of [...METALS, ...TILES, ...NEW, "asbestos"]) {
          for (const jobType of ["restoration", "painting"]) {
            const a = { jobType, material, storeys, complexity, roofSizeM2 };
            const { b, estimate } = breakdownFor(a);
            assertAddsUp(b, estimate, JSON.stringify(a));
            cases++;
          }
          for (const desiredMaterial of [...METALS, ...NEW, "concreteTile", "terracotta"]) {
            const a = { jobType: "replacement", currentMaterial: material, desiredMaterial, storeys, complexity, roofSizeM2 };
            const { b, estimate } = breakdownFor(a);
            assertAddsUp(b, estimate, JSON.stringify(a));
            cases++;
          }
        }
      }
    }
    for (const material of [...METALS, ...TILES, ...NEW, "asbestos"]) {
      for (const repairAreas of ["one", "few", "many"]) {
        const a = { jobType: "repairs", material, storeys, repairAreas };
        const { b, estimate } = breakdownFor(a);
        assertAddsUp(b, estimate, JSON.stringify(a));
        cases++;
      }
      for (const leakDuration of ["just_noticed", "few_weeks", "months", "recurring"]) {
        const a = { jobType: "leak", material, storeys, leakDuration };
        const { b, estimate } = breakdownFor(a);
        assertAddsUp(b, estimate, JSON.stringify(a));
        cases++;
      }
    }
    for (const gutterLengthM of [10, 25, 80]) {
      const a = { jobType: "gutters", storeys, gutterLengthM };
      const { b, estimate } = breakdownFor(a);
      assertAddsUp(b, estimate, JSON.stringify(a));
      cases++;
    }
  }
  assert.ok(cases > 1000, `only ${cases} cases`);
});

test("allocate() keeps whole $10s and the exact total", () => {
  const items = [{ label: "a", ratio: 1 / 3 }, { label: "b", ratio: 1 / 3 }, { label: "c", ratio: 1 / 3 }];
  const out = allocate(100, items);
  assert.deepEqual(out.map((i) => i.cost), [40, 30, 30]);
  assert.equal(allocate(6250, items).reduce((t, i) => t + i.cost, 0), 6250);
});

test("restoration price tiers still match the article (200 m², single storey)", () => {
  const base = { jobType: "restoration", storeys: "single", complexity: "gable", roofSizeM2: 200 };
  assert.deepEqual(estimateCost({ ...base, material: "concreteTile" }), { low: 4500, high: 8000 });
  assert.deepEqual(estimateCost({ ...base, material: "colorbond" }), { low: 3500, high: 7000 });
  assert.deepEqual(estimateCost({ ...base, material: "terracotta" }), { low: 7500, high: 12000 });
});

const TINTERN = {
  place_id: 1,
  lat: "-35.1327",
  lon: "138.5208",
  display_name: "4, Tintern Crescent, Morphett Vale, Adelaide, City of Onkaparinga, South Australia, 5162, Australia",
  address: {
    house_number: "4", road: "Tintern Crescent", suburb: "Morphett Vale",
    city: "Adelaide", state: "South Australia", postcode: "5162", country: "Australia",
  },
};

test("addresses have no comma after the street number", () => {
  assert.equal(formatNominatimAddress(TINTERN), "4 Tintern Crescent, Morphett Vale SA 5162");
  assert.equal(tidyAddress("4, Tintern Crescent, Morphett Vale"), "4 Tintern Crescent, Morphett Vale");
  assert.equal(tidyAddress("12A, Smith St, Marion"), "12A Smith St, Marion");
  assert.equal(tidyAddress("3/14, King Rd, Unley"), "3/14 King Rd, Unley");
  assert.equal(tidyAddress("4 Tintern Crescent, Morphett Vale"), "4 Tintern Crescent, Morphett Vale");
  assert.equal(
    formatNominatimAddress({ display_name: "7, Some Lane, Aldinga, South Australia", address: { state: "South Australia" } }),
    "7 Some Lane, Aldinga, South Australia"
  );
});

test("suburb is taken from a chosen or typed address", () => {
  assert.equal(suburbFromAddress("4 Tintern Crescent, Morphett Vale SA 5162"), "Morphett Vale");
  assert.equal(suburbFromAddress("4 Tintern Cres, Morphett Vale"), "Morphett Vale");
  assert.equal(suburbFromAddress("4 Tintern Cres Morphett Vale"), "");
});

test("a typed address is accepted only if it looks like one", () => {
  assert.ok(looksLikeAddress("4 Tintern Cres Morphett Vale"));
  assert.ok(looksLikeAddress("Lot 12, New Road, Aldinga"));
  assert.ok(!looksLikeAddress("Morphett Vale"));
  assert.ok(!looksLikeAddress("4 Tin"));
});

test("Nominatim results become suggestions with a location", () => {
  assert.deepEqual(parseResults([TINTERN, { ...TINTERN, place_id: 2 }, { place_id: 3, lat: "x", lon: "y", address: {} }]), [
    { id: "1", address: "4 Tintern Crescent, Morphett Vale SA 5162", suburb: "Morphett Vale", lat: -35.1327, lon: 138.5208, exact: true },
  ]);
  assert.deepEqual(parseResults({ error: "Access denied" }), []);
});

test("suggestions are South Australian addresses only", () => {
  const vic = {
    place_id: 9, lat: "-37.8868", lon: "145.2229",
    address: { house_number: "4", road: "Tintern Crescent", suburb: "Wantirna South", state: "Victoria", postcode: "3152" },
  };
  assert.deepEqual(parseResults([vic, TINTERN]).map((x) => x.address), ["4 Tintern Crescent, Morphett Vale SA 5162"]);
});

test("the typed house number is kept when the suggestion has none", () => {
  const street = "King William Street, Adelaide SA 5000";
  assert.equal(withTypedNumber(street, "128 King William Street Adelaide"), "128 King William Street, Adelaide SA 5000");
  assert.equal(withTypedNumber(street, "128A King William St"), "128A King William Street, Adelaide SA 5000");
  assert.equal(withTypedNumber(street, "3 / 14 King William"), "3/14 King William Street, Adelaide SA 5000");
  assert.equal(withTypedNumber(street, "Unit 3 14 King William"), "Unit 3 14 King William Street, Adelaide SA 5000");
  assert.equal(withTypedNumber(street, "12 3rd Avenue"), "12 King William Street, Adelaide SA 5000");
  // Nothing typed to restore, or the suggestion already has its number.
  assert.equal(withTypedNumber(street, "King William Street"), street);
  assert.equal(withTypedNumber("287 Diagonal Road, Oaklands Park SA 5046", "300 Diagonal"), "287 Diagonal Road, Oaklands Park SA 5046");
});

// As Nominatim returned them live: Kent Town first.
const KING_WILLIAM = [
  { id: "1", address: "King William Street, Kent Town SA 5067", suburb: "Kent Town", lat: -34.9207, lon: 138.6155 },
  { id: "2", address: "King William Street, Adelaide SA 5000", suburb: "Adelaide", lat: -34.9297, lon: 138.6004 },
];

test("suggestions in the typed suburb come first: 128 King William Street Adelaide", () => {
  const typed = "128 King William Street Adelaide";
  const r = rankSuggestions(KING_WILLIAM, typed);
  assert.equal(r.suggestions[0].suburb, "Adelaide");
  assert.equal(withTypedNumber(r.suggestions[0].address, typed), "128 King William Street, Adelaide SA 5000");
  assert.equal(r.typedSuburb, "Adelaide");
  assert.equal(r.offerTyped, false);
  // Also with commas, state and postcode, or a part-typed suburb.
  assert.equal(rankSuggestions(KING_WILLIAM, "128 King William St, Adelaide SA 5000").suggestions[0].suburb, "Adelaide");
  assert.equal(rankSuggestions(KING_WILLIAM, "128 King William Street Adel").suggestions[0].suburb, "Adelaide");
  assert.equal(rankSuggestions(KING_WILLIAM, "128 king william st kent town").suggestions[0].suburb, "Kent Town");
});

test("no suburb typed: Nominatim's order is kept and nothing extra is offered", () => {
  for (const typed of ["128 King William Street", "128 King Wil"]) {
    const r = rankSuggestions(KING_WILLIAM, typed);
    assert.deepEqual(r.suggestions.map((x) => x.suburb), ["Kent Town", "Adelaide"]);
    assert.equal(r.offerTyped, false);
  }
});

test("a typed suburb with no matching suggestion offers the typed address first", () => {
  const r = rankSuggestions(KING_WILLIAM, "128 King William Street Glenelg");
  assert.equal(r.offerTyped, true);
  assert.equal(r.typedSuburb, "Glenelg");
  assert.equal(r.suggestions.length, 2); // still shown, below the typed option
  assert.equal(rankSuggestions([], "128 King William Street Glenelg").offerTyped, false);
});

// ── Replacement, repairs, leaks, gutters (2026 guide targets) ─────────────
const REPLACE = { jobType: "replacement", roofSizeM2: 200, storeys: "single", complexity: "gable" };
const rep = (currentMaterial, desiredMaterial, extra = {}) =>
  estimateCost({ ...REPLACE, currentMaterial, desiredMaterial, ...extra });
const inside = (r, [lo, hi], label) =>
  assert.ok(r.low >= lo && r.high <= hi, `${label}: $${r.low}–$${r.high} outside $${lo}–$${hi}`);

test("replacement prices sit inside the 2026 targets (200 m², gable)", () => {
  inside(rep("concreteTile", "colorbond"), [18000, 30000], "tile → Colorbond");
  inside(rep("concreteTile", "concreteTile"), [18500, 32000], "tile → tile");
  inside(rep("terracotta", "terracotta"), [25000, 40000], "terracotta → terracotta");
  inside(rep("colorbond", "colorbond"), [15000, 25000], "Colorbond → Colorbond");
  inside(rep("pressedMetal", "colorbond"), [15000, 25000], "pressed metal → Colorbond");
  inside(rep("asbestos", "colorbond"), [22000, 40000], "asbestos → Colorbond");
  assert.deepEqual(rep("concreteTile", "colorbond"), { low: 18000, high: 28800 });
  assert.deepEqual(rep("concreteTile", "slate"), { low: 37000, high: 50000 });
});

test("double storey and multi-level soften on replacements", () => {
  const single = rep("concreteTile", "colorbond");
  const double = rep("concreteTile", "colorbond", { storeys: "double" });
  const step1 = double.low / single.low;
  assert.ok(step1 >= 1.24 && step1 <= 1.36, `double storey low ×${step1}`);
  const both = rep("concreteTile", "colorbond", { storeys: "double", complexity: "multiLevel" });
  assert.ok(both.low / double.low < step1, "the second factor adds less than the first");
});

test("every replacement, repair, leak and gutter range is at most 1.6× wide", () => {
  const all = [];
  const mats = [...METALS, ...TILES, ...NEW, "asbestos"];
  for (const storeys of ["single", "double"]) {
    for (const roofSizeM2 of [50, 80, 200, 500]) {
      for (const complexity of SHAPES) {
        for (const currentMaterial of mats) {
          for (const desiredMaterial of [...METALS, ...NEW, "concreteTile", "terracotta"]) {
            all.push({ ...REPLACE, storeys, roofSizeM2, complexity, currentMaterial, desiredMaterial });
          }
        }
      }
    }
    for (const material of mats) {
      for (const repairAreas of ["one", "few", "many"]) all.push({ jobType: "repairs", material, storeys, repairAreas });
      for (const leakDuration of ["just_noticed", "few_weeks", "months", "recurring"]) {
        all.push({ jobType: "leak", material, storeys, leakDuration });
      }
    }
    for (const gutterLengthM of [10, 25, 40, 80]) all.push({ jobType: "gutters", storeys, gutterLengthM });
  }
  for (const a of all) {
    const r = estimateCost(a);
    assert.ok(r.high <= r.low * MAX_RANGE_RATIO, `${JSON.stringify(a)}: $${r.low}–$${r.high}`);
    assert.ok(r.high > r.low, `${JSON.stringify(a)}: empty range`);
  }
});

test("single-storey repairs and leaks sit inside the targets for every material", () => {
  const REP_T = { one: [300, 900], few: [700, 1800], many: [1500, 3500] };
  const LEAK_T = { just_noticed: [250, 750], few_weeks: [400, 1200], months: [400, 1200], recurring: [600, 1500] };
  for (const material of [...METALS, ...TILES, ...NEW, "asbestos"]) {
    for (const [repairAreas, t] of Object.entries(REP_T)) {
      inside(estimateCost({ jobType: "repairs", material, storeys: "single", repairAreas }), t, `repairs ${repairAreas} ${material}`);
    }
    for (const [leakDuration, t] of Object.entries(LEAK_T)) {
      inside(estimateCost({ jobType: "leak", material, storeys: "single", leakDuration }), t, `leak ${leakDuration} ${material}`);
    }
  }
});

test("gutters stay at $40–$80 per metre and say downpipes are included", () => {
  for (const m of [15, 25, 40]) {
    inside(estimateCost({ jobType: "gutters", storeys: "single", gutterLengthM: m }), [40 * m, 80 * m], `gutters ${m} m`);
  }
  const { b } = breakdownFor({ jobType: "gutters", storeys: "single", gutterLengthM: 25 });
  assert.match(b.detailRows.map((r) => r.value).join(" "), /includes downpipes/);
  assert.match(labels(b), /Downpipes \(included\)/);
});

// ── Satellite roof-size suggestion (Google Solar) ─────────────────────────
const HOUSE = { lat: -34.9, lon: 138.6 };
const seg = (pitchDegrees, azimuthDegrees, areaMeters2) => ({ pitchDegrees, azimuthDegrees, stats: { areaMeters2 } });
const insights = (over = {}) => ({
  imageryQuality: "MEDIUM",
  center: { latitude: HOUSE.lat + 0.00005, longitude: HOUSE.lon }, // ~5.6 m away
  solarPotential: {
    wholeRoofStats: { areaMeters2: 213.4 },
    roofSegmentStats: [seg(22, 0, 100), seg(22, 180, 100), seg(20, 90, 8)],
  },
  ...over,
});

test("solar: roof area is rounded to 10 m² and kept within the slider's 80–500 m²", () => {
  assert.equal(roofFromInsights(insights(), HOUSE).areaM2, 210);
  const withArea = (areaMeters2) =>
    roofFromInsights(insights({ solarPotential: { wholeRoofStats: { areaMeters2 } } }), HOUSE);
  assert.equal(withArea(75), null);
  assert.equal(withArea(620), null);
  assert.equal(withArea(84).areaM2, 80);
  assert.equal(withArea(497).areaM2, 500);
  assert.equal(withArea(504), null);
});

test("solar: building must be within 25 m and imagery at least MEDIUM", () => {
  const at = (metresNorth) =>
    roofFromInsights(insights({ center: { latitude: HOUSE.lat + metresNorth / 111195, longitude: HOUSE.lon } }), HOUSE);
  assert.ok(at(10));
  assert.equal(at(40), null);
  assert.ok(Math.abs(distanceM(HOUSE, { lat: HOUSE.lat + 0.001, lon: HOUSE.lon }) - 111.2) < 0.5);
  assert.ok(roofFromInsights(insights({ imageryQuality: "HIGH" }), HOUSE));
  assert.equal(roofFromInsights(insights({ imageryQuality: "LOW" }), HOUSE), null);
});

test("solar: missing or partial responses give no suggestion and never throw", () => {
  for (const bad of [null, undefined, {}, "x", insights({ center: undefined }), insights({ solarPotential: undefined }),
    insights({ solarPotential: { wholeRoofStats: {} } })]) {
    assert.equal(roofFromInsights(bad, HOUSE), null);
  }
  // Area but no segments: size only, no shape.
  assert.deepEqual(roofFromInsights(insights({ solarPotential: { wholeRoofStats: { areaMeters2: 200 } } }), HOUSE), { areaM2: 200, shape: null });
});

test("solar: shape is suggested only in clear cases", () => {
  assert.equal(shapeFromSegments([seg(3, 10, 150), seg(5, 190, 40)]), "flat");
  assert.equal(shapeFromSegments([seg(22, 0, 100), seg(22, 180, 100), seg(20, 90, 8)]), "gable");
  assert.equal(shapeFromSegments([seg(22, 5, 60), seg(22, 95, 50), seg(22, 185, 60), seg(22, 275, 50)]), "hip");
  // Two opposite faces but only 70% of the roof: too untidy.
  assert.equal(shapeFromSegments([seg(22, 0, 70), seg(22, 180, 70), seg(22, 90, 30), seg(22, 270, 30)].slice(0, 3)), null);
  // Six mixed faces (Dutch gable / multi-level look): no suggestion.
  assert.equal(shapeFromSegments([seg(22, 0, 50), seg(22, 180, 50), seg(30, 90, 30), seg(30, 270, 30), seg(15, 45, 25), seg(15, 225, 25)]), null);
  assert.equal(shapeFromSegments([]), null);
  assert.equal(shapeFromSegments(undefined), null);
});

test("solar: daily cap allows calls up to the limit, then refuses; fails closed", async () => {
  let count = 0;
  const stub = { rpc: async (_name, { p_limit }) => ({ data: ++count <= p_limit, error: null }) };
  const results = [];
  for (let i = 0; i < 51; i++) results.push(await takeSolarCall(stub, 50));
  assert.equal(results.filter(Boolean).length, 50);
  assert.equal(results[50], false);
  assert.equal(await takeSolarCall({ rpc: async () => ({ data: null, error: { message: "down" } }) }, 50), false);
  assert.equal(await takeSolarCall({ rpc: async () => { throw new Error("network"); } }, 50), false);
  assert.equal(await takeSolarCall(null, 50), false);
  assert.equal(await takeSolarCall(stub, 0), false);
  assert.equal(dailyLimit({}), 50);
  assert.equal(dailyLimit({ SOLAR_DAILY_LIMIT: "20" }), 20);
  assert.equal(dailyLimit({ SOLAR_DAILY_LIMIT: "nonsense" }), 50);
});

test("solar: switched off unless SOLAR_AUTOFILL_ENABLED=true and a key is set", () => {
  assert.equal(solarEnabled({}), false);
  assert.equal(solarEnabled({ GOOGLE_SOLAR_API_KEY: "k" }), false);
  assert.equal(solarEnabled({ GOOGLE_SOLAR_API_KEY: "k", SOLAR_AUTOFILL_ENABLED: "false" }), false);
  assert.equal(solarEnabled({ SOLAR_AUTOFILL_ENABLED: "true" }), false);
  assert.equal(solarEnabled({ GOOGLE_SOLAR_API_KEY: "k", SOLAR_AUTOFILL_ENABLED: "true" }), true);
});

test("only suggestions with OpenStreetMap's own house number are exact", () => {
  const [house] = parseResults([TINTERN]);
  assert.equal(house.exact, true);
  const [street] = parseResults([{ ...TINTERN, address: { ...TINTERN.address, house_number: undefined } }]);
  assert.equal(street.exact, false);
  // Putting the typed number back doesn't make the point the house.
  assert.notEqual(withTypedNumber(street.address, "4 Tintern Crescent"), street.address);
});

test("satellite map: official Maps Embed API with a key, keyless embed without", () => {
  const withKey = new URL(satelliteEmbedSrc(-34.935852, 138.6313694, "test-key"));
  assert.equal(withKey.origin + withKey.pathname, "https://www.google.com/maps/embed/v1/place");
  assert.equal(withKey.searchParams.get("key"), "test-key");
  assert.equal(withKey.searchParams.get("q"), "-34.935852,138.6313694");
  assert.equal(withKey.searchParams.get("maptype"), "satellite");
  assert.equal(withKey.searchParams.get("zoom"), "20");
  assert.equal(
    satelliteEmbedSrc(-34.935852, 138.6313694, ""),
    "https://maps.google.com/maps?q=-34.935852,138.6313694&z=20&t=k&output=embed"
  );
  assert.equal(satelliteEmbedSrc(null, 138.6, "k"), null);
  assert.equal(satelliteEmbedSrc(-34.9, undefined, "k"), null);
  assert.equal(satelliteEmbedSrc("x", 138.6, "k"), null);
});
