// scripts/estimate.test.mjs — run with `npm test`
//
// Checks the calculator's pricing, PDF breakdown and address formatting:
// - restoration / painting breakdowns follow the roof material
// - line items always add up exactly to the midpoint of the range
// - asbestos is never broken down as a restoration or painting job
// - addresses read "4 Tintern Crescent", not "4, Tintern Crescent"

import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateCost } from "../lib/pricing.js";
import { buildEstimateBreakdown, allocate } from "../lib/estimateBreakdown.js";
import { formatNominatimAddress, tidyAddress } from "../lib/formatAddress.js";

const METALS = ["colorbond", "galvanised", "zincalume"];
const TILES = ["concreteTile", "terracotta", "notSure"];
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

test("line items add up to the midpoint for every job, material and size", () => {
  let cases = 0;
  for (const storeys of ["single", "double"]) {
    for (const roofSizeM2 of [80, 150, 200, 250, 500]) {
      for (const complexity of SHAPES) {
        for (const material of [...METALS, ...TILES, "asbestos"]) {
          for (const jobType of ["restoration", "painting"]) {
            const a = { jobType, material, storeys, complexity, roofSizeM2 };
            const { b, estimate } = breakdownFor(a);
            assertAddsUp(b, estimate, JSON.stringify(a));
            cases++;
          }
          for (const desiredMaterial of [...METALS, "concreteTile", "terracotta"]) {
            const a = { jobType: "replacement", currentMaterial: material, desiredMaterial, storeys, complexity, roofSizeM2 };
            const { b, estimate } = breakdownFor(a);
            assertAddsUp(b, estimate, JSON.stringify(a));
            cases++;
          }
        }
      }
    }
    for (const material of [...METALS, ...TILES, "asbestos"]) {
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

test("addresses have no comma after the street number", () => {
  const item = {
    display_name: "4, Tintern Crescent, Morphett Vale, Adelaide, City of Onkaparinga, South Australia, 5162, Australia",
    address: {
      house_number: "4", road: "Tintern Crescent", suburb: "Morphett Vale",
      city: "Adelaide", state: "South Australia", postcode: "5162", country: "Australia",
    },
  };
  assert.equal(formatNominatimAddress(item), "4 Tintern Crescent, Morphett Vale SA 5162");
  assert.equal(tidyAddress("4, Tintern Crescent, Morphett Vale"), "4 Tintern Crescent, Morphett Vale");
  assert.equal(tidyAddress("12A, Smith St, Marion"), "12A Smith St, Marion");
  assert.equal(tidyAddress("3/14, King Rd, Unley"), "3/14 King Rd, Unley");
  assert.equal(tidyAddress("4 Tintern Crescent, Morphett Vale"), "4 Tintern Crescent, Morphett Vale");
  assert.equal(
    formatNominatimAddress({ display_name: "7, Some Lane, Aldinga, South Australia", address: { state: "South Australia" } }),
    "7 Some Lane, Aldinga, South Australia"
  );
});
