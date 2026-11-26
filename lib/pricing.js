// lib/pricing.js
//
// The single source of calculator pricing. Used by /get-my-estimate (client)
// and /api/send-estimate (server recomputes from the answers, so the PDF,
// SMS and lead record can't drift from these tables).
//
// All figures are guide ranges INCLUDING GST, not quotes.
//
// RESTORATION / PAINTING are calibrated to the 2026 guide tiers used in
// app/blog/roof-restoration-cost-adelaide (200 m² single-storey):
//   concrete tile full restoration  $4,500–$8,000
//   metal / Colorbond restoration   $3,500–$7,000
//   terracotta, double-storey, complex  $7,500–$12,000+
//   clean and recoat only (painting)    $3,500–$5,000
//   slate (heritage) restoration         $9,200–$15,000 (its own rate + a
//                                        higher-tier factor, like terracotta)
//   pressed metal tiles (Decramastic)    priced like concrete tile
//
// REPLACEMENT is calibrated to 2026 Adelaide guide targets (200 m², gable,
// single storey):
//   metal → Colorbond re-roof            $75–$125/m²   ($15,000–$25,000)
//   tile → Colorbond (strip tiles)       $90–$150/m²   ($18,000–$30,000)
//   re-roof in concrete tile             $92.50–$160/m²
//   re-roof in terracotta                $125–$200/m²
//   asbestos removal on top               +$23–$50/m²  (+$4,600–$10,000)
// then capped so no range's high end is more than 1.6× its low end.
// Double storey and multi-level are higher-tier factors that soften
// (+25–35% for one, ×1.45–1.6 for both), like the restoration tiers.
//
// REPAIRS and LEAKS: one/few/several areas land at $300–$900 / $700–$1,800
// / $1,500–$3,500, leaks at $250–$1,500. Premium materials (terracotta,
// slate, asbestos) and double storey are softened higher-tier factors.
// GUTTERS (downpipes included) sit at $40–$80 per metre installed.
//
// Asbestos roofs can't be priced as a restoration: see normaliseAnswers().

export const RANGE_LABEL = "Guide range incl. GST, not a quote";

export const ASBESTOS_RESTORE_MESSAGE =
  "Asbestos roofs shouldn't be restored. Here's a replacement estimate instead.";

export const SLATE_PAINT_MESSAGE =
  "Slate isn't painted or coated. Here's a slate restoration estimate instead.";

// Asbestos roofs aren't restored or recoated (high-pressure cleaning asbestos
// cement is prohibited in SA). A restoration or painting request on an
// asbestos roof becomes an asbestos replacement estimate.
// Slate is never painted or coated, so a painting request on a slate roof
// becomes a slate restoration estimate.
export function normaliseAnswers(answers) {
  const { jobType, material, desiredMaterial } = answers;
  if (jobType === "painting" && material === "slate") {
    return { ...answers, jobType: "restoration", requestedJobType: "painting", slateRedirect: true };
  }
  if ((jobType === "restoration" || jobType === "painting") && material === "asbestos") {
    return {
      ...answers,
      jobType: "replacement",
      requestedJobType: jobType,
      asbestosRedirect: true,
      currentMaterial: "asbestos",
      desiredMaterial: desiredMaterial && desiredMaterial !== "asbestos" ? desiredMaterial : "colorbond",
    };
  }
  return answers;
}

// ── Restoration & painting (2026 guide tiers) ─────────────────────────────
// Per-m² low/high rates incl. GST for a single-storey, non-complex roof.
const RESTORATION_PRICING = {
  ratePerM2: {
    restoration: {
      concreteTile: { low: 22.5, high: 40 },
      notSure: { low: 22.5, high: 40 }, // treated as concrete tile
      terracotta: { low: 22.5, high: 40 }, // tile base; terracotta is a higher-tier factor
      colorbond: { low: 17.5, high: 35 },
      galvanised: { low: 17.5, high: 35 },
      zincalume: { low: 17.5, high: 35 },
      // Slate: specialist work (replacing slates, copper tingles, ridges,
      // flashings); higher base rate AND a higher-tier factor.
      slate: { low: 27.5, high: 50 },
      // Pressed metal tiles (Decramastic): re-fix, rust-treat, seal, coat.
      pressedMetal: { low: 22.5, high: 40 },
    },
    // Clean and recoat only: no ridge re-bedding.
    painting: {
      concreteTile: { low: 17.5, high: 25 },
      notSure: { low: 17.5, high: 25 },
      terracotta: { low: 17.5, high: 25 },
      colorbond: { low: 17.5, high: 25 },
      galvanised: { low: 17.5, high: 25 },
      zincalume: { low: 17.5, high: 25 },
      pressedMetal: { low: 17.5, high: 25 },
    },
  },
  // Higher-tier factors: terracotta (restoration only), double storey and a
  // multi-level / complex roof. They don't stack in full: the first lifts a
  // $4,500–$8,000 tile job to about $7,500–$12,000, a second to about
  // $10,000–$15,000, and all three to about $12,000–$18,000 (200 m²).
  tierMultiplier: [
    { low: 1, high: 1 },
    { low: 5 / 3, high: 1.5 },
    { low: 20 / 9, high: 15 / 8 },
    { low: 8 / 3, high: 2.25 },
  ],
  premiumMaterials: { restoration: ["terracotta", "slate"], painting: [] },
  // Small shape adjustment, applied on top of the tier.
  complexityMultiplier: {
    flat: { low: 1, high: 1 },
    gable: { low: 1, high: 1 },
    hip: { low: 1, high: 1 },
    dutchGable: { low: 1.05, high: 1.05 },
    multiLevel: { low: 1, high: 1 }, // counted as a higher-tier factor instead
  },
  minimumLow: 2500,
};

// ── Replacement (2026 guide targets) ───────────────────────────────────────
// Per-m² low/high rates incl. GST for a gable, single-storey roof.
const REPLACEMENT_PRICING = {
  ratePerM2: {
    metalToMetal: { low: 75, high: 125 },
    tileToMetal: { low: 90, high: 150 },
    concreteTile: { low: 92.5, high: 160 },
    terracotta: { low: 125, high: 200 },
    slate: { low: 185, high: 250 },
  },
  // Licensed removal, containment and disposal, on top of the tile rate.
  asbestosRemovalPerM2: { low: 23, high: 50 },
  // Double storey and multi-level: soften like the restoration tiers.
  tierMultiplier: [
    { low: 1, high: 1 },
    { low: 1.25, high: 1.35 },
    { low: 1.45, high: 1.6 },
  ],
  shapeMultiplier: { flat: 1, gable: 1, hip: 1.1, dutchGable: 1.15, multiLevel: 1 },
  minimumLow: 3200,
};

// No range's high end is more than this many times its low end
// (replacement, repairs, leaks and gutters).
export const MAX_RANGE_RATIO = 1.6;

// Repairs and leaks: standard materials have a small adjustment; premium
// materials (terracotta, slate, asbestos) and double storey are higher-tier
// factors that soften: ×1.1 for one, ×1.25 for both.
const SMALL_JOB_MATERIAL = {
  colorbond: 1,
  galvanised: 0.9,
  zincalume: 0.95,
  pressedMetal: 1.05,
  concreteTile: 1.1,
  notSure: 1.1,
  terracotta: 1.1,
  slate: 1.1,
  asbestos: 1.1,
};
const SMALL_JOB_PREMIUM = ["terracotta", "slate", "asbestos"];
const SMALL_JOB_TIER = [1, 1.1, 1.25];

const REPAIR_PRICING = {
  baseByAreaCount: { one: 450, few: 950, many: 1800 },
  minimumJob: 350,
  conservativeMargin: 1.15,
};

const LEAK_PRICING = {
  baseByDuration: { just_noticed: 400, few_weeks: 550, months: 750, recurring: 950 },
  minimumJob: 350,
  conservativeMargin: 1.15,
};

// Includes downpipes.
const GUTTER_PRICING = {
  baseRatePerMetre: 55,
  storeyMultiplier: { single: 1, double: 1.25 },
  minimumJob: 900,
  conservativeMargin: 1.15,
};

const round100 = (n) => Math.round(n / 100) * 100;

// Keep the high end within MAX_RANGE_RATIO × the low end (whole $100s).
function capRange({ low, high }) {
  return { low, high: Math.min(high, Math.floor((low * MAX_RANGE_RATIO) / 100) * 100) };
}

function rangeFrom(total) {
  return capRange({ low: round100(total * 0.85), high: round100(total * 1.15) });
}

function smallJobRange(base, answers, P) {
  const tier =
    (SMALL_JOB_PREMIUM.includes(answers.material) ? 1 : 0) + (answers.storeys === "double" ? 1 : 0);
  const raw =
    base * SMALL_JOB_MATERIAL[answers.material] * SMALL_JOB_TIER[tier] * P.conservativeMargin;
  return rangeFrom(Math.max(raw, P.minimumJob));
}

function replacementRange(answers) {
  const P = REPLACEMENT_PRICING;
  const { currentMaterial, desiredMaterial } = answers;
  const rate =
    desiredMaterial === "slate" || desiredMaterial === "terracotta" || desiredMaterial === "concreteTile"
      ? P.ratePerM2[desiredMaterial]
      : conversionGroup(currentMaterial) === "metal"
      ? P.ratePerM2.metalToMetal
      : P.ratePerM2.tileToMetal;
  const removal = currentMaterial === "asbestos" ? P.asbestosRemovalPerM2 : { low: 0, high: 0 };
  const tier = P.tierMultiplier[
    (answers.storeys === "double" ? 1 : 0) + (answers.complexity === "multiLevel" ? 1 : 0)
  ];
  const shape = P.shapeMultiplier[answers.complexity];
  const low = Math.max(answers.roofSizeM2 * (rate.low + removal.low) * tier.low * shape, P.minimumLow);
  const high = Math.max(answers.roofSizeM2 * (rate.high + removal.high) * tier.high * shape, low * 1.3);
  return capRange({ low: round100(low), high: round100(high) });
}

// "notSure" is treated as tile for conversion purposes, since concrete tile
// is the most common Adelaide roof type. Pressed metal tiles are a light
// metal roof; slate is a heavy roof like tile.
export const METAL_MATERIALS = ["colorbond", "galvanised", "zincalume", "pressedMetal"];
export function conversionGroup(material) {
  return METAL_MATERIALS.includes(material) ? "metal" : "tile";
}

function restorationRange(answers) {
  const P = RESTORATION_PRICING;
  const rate = P.ratePerM2[answers.jobType][answers.material];
  const premiumCount =
    (P.premiumMaterials[answers.jobType].includes(answers.material) ? 1 : 0) +
    (answers.storeys === "double" ? 1 : 0) +
    (answers.complexity === "multiLevel" ? 1 : 0);
  const t = P.tierMultiplier[premiumCount];
  const c = P.complexityMultiplier[answers.complexity];
  const low = Math.max(answers.roofSizeM2 * rate.low * t.low * c.low, P.minimumLow);
  const high = Math.max(answers.roofSizeM2 * rate.high * t.high * c.high, low * 1.4);
  return { low: round100(low), high: round100(high) };
}

export function estimateCost(rawAnswers) {
  const answers = normaliseAnswers(rawAnswers);
  const { jobType } = answers;

  if (jobType === "repairs") {
    return smallJobRange(REPAIR_PRICING.baseByAreaCount[answers.repairAreas], answers, REPAIR_PRICING);
  }

  if (jobType === "leak") {
    return smallJobRange(LEAK_PRICING.baseByDuration[answers.leakDuration], answers, LEAK_PRICING);
  }

  if (jobType === "gutters") {
    const raw =
      answers.gutterLengthM *
      GUTTER_PRICING.baseRatePerMetre *
      GUTTER_PRICING.storeyMultiplier[answers.storeys] *
      GUTTER_PRICING.conservativeMargin;
    return rangeFrom(Math.max(raw, GUTTER_PRICING.minimumJob));
  }

  if (jobType === "restoration" || jobType === "painting") {
    return restorationRange(answers);
  }

  if (jobType === "replacement") {
    return replacementRange(answers);
  }

  throw new Error(`Unknown job type: ${jobType}`);
}

// ── Live range (calculator side panel) ────────────────────────────────────
// The range across every answer still to come, so it narrows as each step
// is answered. Unanswered sizes span the slider's ends; asbestos is left out
// of unanswered material choices (it's a special case with its own message).
const JOB_FIELDS = {
  restoration: ["roofSizeM2", "storeys", "material", "complexity"],
  painting: ["roofSizeM2", "storeys", "material", "complexity"],
  replacement: ["roofSizeM2", "storeys", "currentMaterial", "desiredMaterial", "complexity"],
  repairs: ["storeys", "material", "repairAreas"],
  leak: ["storeys", "material", "leakDuration"],
  gutters: ["storeys", "gutterLengthM"],
};
const ROOF_MATERIALS = ["colorbond", "galvanised", "zincalume", "pressedMetal", "concreteTile", "terracotta", "slate"];
const FIELD_OPTIONS = {
  roofSizeM2: [80, 500],
  gutterLengthM: [10, 80],
  storeys: ["single", "double"],
  material: ROOF_MATERIALS,
  currentMaterial: ROOF_MATERIALS,
  desiredMaterial: ROOF_MATERIALS,
  complexity: ["flat", "gable", "hip", "dutchGable", "multiLevel"],
  repairAreas: ["one", "few", "many"],
  leakDuration: ["just_noticed", "few_weeks", "months", "recurring"],
};

const isAnswered = (v) => v !== "" && v !== null && v !== undefined;

export function liveRange(answers) {
  const fields = JOB_FIELDS[answers?.jobType];
  if (!fields) return null;
  let combos = [{ ...answers }];
  for (const f of fields) {
    let values = isAnswered(answers[f]) ? [answers[f]] : FIELD_OPTIONS[f];
    // Slate is never painted, so it doesn't widen a painting range.
    if (answers.jobType === "painting" && f === "material" && !isAnswered(answers[f])) {
      values = values.filter((v) => v !== "slate");
    }
    combos = combos.flatMap((c) => values.map((v) => ({ ...c, [f]: v })));
  }
  let low = Infinity;
  let high = -Infinity;
  for (const c of combos) {
    const r = estimateCost(c);
    low = Math.min(low, r.low);
    high = Math.max(high, r.high);
  }
  const answered = fields.filter((f) => isAnswered(answers[f])).length;
  return { low, high, answered, total: fields.length };
}
