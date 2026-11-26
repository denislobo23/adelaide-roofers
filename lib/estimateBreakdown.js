// lib/estimateBreakdown.js
//
// Takes the calculator answers + estimate range and produces a detailed,
// itemised cost breakdown for the PDF. The OVERALL SPLIT (materials vs
// labour vs waste/access) and the SUB-ITEM RATIOS are sensible PLACEHOLDER
// PROPORTIONS of the total estimate — not independently priced line items.
// Once Wally's real cost structure is captured, replace the ratios.
//
// Rules this file guarantees (tested in scripts/estimate.test.mjs):
// - Restoration and painting breakdowns follow the roof material. A metal
//   roof never shows tiles or ridge re-bedding; a tile roof never shows
//   screws or rust treatment.
// - Slate restorations never show coating; pressed metal tiles never show
//   ridge re-bedding or pointing (their ridge caps are screwed down).
// - Asbestos roofs are never broken down as a restoration or painting job
//   (they are re-priced as a replacement by normaliseAnswers()).
// - Every line item is a whole $10, and the line items add up EXACTLY to the
//   midpoint of the estimate range.

import { normaliseAnswers, conversionGroup } from "./pricing.js";

const JOB_TYPE_LABEL = {
  restoration: "Roof Restoration",
  replacement: "Roof Replacement",
  repairs: "Roof Repairs",
  leak: "Roof Leak Repair",
  painting: "Roof Painting / Re-Coating",
  gutters: "Gutter Repairs",
};

const MATERIAL_LABEL = {
  colorbond: "Colorbond",
  galvanised: "Galvanised steel",
  zincalume: "Zincalume",
  concreteTile: "Concrete tile",
  terracotta: "Terracotta tile",
  notSure: "Concrete tile (estimated — unconfirmed)",
  asbestos: "Asbestos cement (fibro)",
  slate: "Slate",
  pressedMetal: "Pressed metal tiles (Decramastic)",
};

const SHAPE_LABEL = {
  flat: "Flat or gently sloped (Skillion)",
  gable: "Simple triangle-shaped (Gable)",
  hip: "Slopes on all four sides (Hip)",
  dutchGable: "Small peak on a sloped roof (Dutch Gable)",
  multiLevel: "Multiple levels, angles or valleys (Complex)",
};

const REPAIR_AREA_LABEL = {
  one: "One area",
  few: "A few areas (2–3)",
  many: "Several areas (4+)",
};

const LEAK_DURATION_LABEL = {
  just_noticed: "Just noticed",
  few_weeks: "A few weeks",
  months: "Months",
  recurring: "Recurring / keeps coming back",
};

const SHEET_METAL = ["colorbond", "galvanised", "zincalume"];

// Breakdown group: "metal" (sheet), "metalTile" (pressed metal tiles),
// "slate" or "tile". "notSure" is treated as concrete tile, the most common
// Adelaide roof.
export function materialGroup(material) {
  if (SHEET_METAL.includes(material)) return "metal";
  if (material === "pressedMetal") return "metalTile";
  if (material === "slate") return "slate";
  return "tile";
}

// Line items per job, keyed "jobType" or "jobType:<group>".
// Each set of ratios sums to 1.
const ITEMS = {
  "restoration:tile": {
    materials: [
      { label: "Replacement tiles (as needed)", ratio: 0.3 },
      { label: "Ridge capping — bedding compound & pointing", ratio: 0.3 },
      { label: "Sealer / primer", ratio: 0.15 },
      { label: "Roof coating (2 topcoats)", ratio: 0.25 },
    ],
    labour: [
      { label: "Roof cleaning & preparation", ratio: 0.25 },
      { label: "Tile replacement labour", ratio: 0.15 },
      { label: "Ridge capping — re-bedding & pointing labour", ratio: 0.35 },
      { label: "Coating application", ratio: 0.25 },
    ],
    included: [
      "Cleaning and preparing the existing roof surface",
      "Replacing broken or cracked tiles",
      "Re-bedding and re-pointing ridge capping",
      "Sealing and re-coating the roof",
    ],
  },
  "restoration:metal": {
    materials: [
      { label: "Replacement roofing screws", ratio: 0.15 },
      { label: "Rust treatment / converter", ratio: 0.15 },
      { label: "Flashings & sealant", ratio: 0.2 },
      { label: "Primer", ratio: 0.15 },
      { label: "Roof coating (2 topcoats)", ratio: 0.35 },
    ],
    labour: [
      { label: "Roof cleaning & preparation", ratio: 0.25 },
      { label: "Screw replacement", ratio: 0.15 },
      { label: "Rust treatment", ratio: 0.15 },
      { label: "Flashing & sealant work", ratio: 0.15 },
      { label: "Priming & coating application", ratio: 0.3 },
    ],
    included: [
      "Cleaning and preparing the existing roof surface",
      "Replacing worn or loose roofing screws",
      "Treating surface rust",
      "Resealing flashings",
      "Priming and re-coating the roof",
    ],
  },
  "restoration:slate": {
    materials: [
      { label: "Replacement slates (as needed)", ratio: 0.35 },
      { label: "Copper tingles / slate hooks", ratio: 0.1 },
      { label: "Ridge capping — bedding compound & pointing", ratio: 0.25 },
      { label: "Flashings (lead / copper) & sealant", ratio: 0.3 },
    ],
    labour: [
      { label: "Moss & debris removal (low pressure)", ratio: 0.15 },
      { label: "Slate replacement & re-fixing slipped slates", ratio: 0.4 },
      { label: "Ridge capping — re-bedding & pointing labour", ratio: 0.25 },
      { label: "Flashing repairs", ratio: 0.2 },
    ],
    included: [
      "Gently clearing moss and debris (slate isn't pressure-cleaned)",
      "Replacing cracked or missing slates and re-fixing slipped ones",
      "Re-bedding and re-pointing ridge capping",
      "Repairing or replacing flashings",
    ],
  },
  "restoration:metalTile": {
    materials: [
      { label: "Replacement pressed metal tiles (as needed)", ratio: 0.2 },
      { label: "Fixings (nails / screws) for re-fixing", ratio: 0.1 },
      { label: "Rust treatment / converter", ratio: 0.15 },
      { label: "Sealer / primer for stone-chip surface", ratio: 0.2 },
      { label: "Roof coating (2 topcoats)", ratio: 0.35 },
    ],
    labour: [
      { label: "Roof cleaning & loose chip removal", ratio: 0.25 },
      { label: "Tile replacement & re-fixing (incl. ridge caps)", ratio: 0.2 },
      { label: "Rust treatment", ratio: 0.15 },
      { label: "Sealing, priming & coating application", ratio: 0.4 },
    ],
    included: [
      "Cleaning and removing loose stone chip",
      "Replacing damaged pressed metal tiles and re-fixing loose tiles and ridge caps",
      "Treating surface rust",
      "Sealing, priming and re-coating the roof",
    ],
  },
  "painting:metalTile": {
    materials: [
      { label: "Rust treatment / converter", ratio: 0.15 },
      { label: "Sealer / primer for stone-chip surface", ratio: 0.3 },
      { label: "Roof coating (2 topcoats)", ratio: 0.55 },
    ],
    labour: [
      { label: "Roof cleaning & loose chip removal", ratio: 0.35 },
      { label: "Rust spot treatment & priming", ratio: 0.2 },
      { label: "Coating application", ratio: 0.45 },
    ],
    included: [
      "Cleaning and removing loose stone chip",
      "Spot-treating surface rust and sealing",
      "Applying protective coating",
    ],
  },
  "painting:tile": {
    materials: [
      { label: "Sealer / primer", ratio: 0.35 },
      { label: "Roof coating (2 topcoats)", ratio: 0.55 },
      { label: "Replacement tiles (as needed)", ratio: 0.1 },
    ],
    labour: [
      { label: "Roof cleaning & preparation", ratio: 0.35 },
      { label: "Sealing / priming", ratio: 0.2 },
      { label: "Coating application", ratio: 0.45 },
    ],
    included: [
      "Cleaning and preparing the roof surface",
      "Sealing or priming the tiles",
      "Applying protective coating",
    ],
  },
  "painting:metal": {
    materials: [
      { label: "Rust treatment / converter", ratio: 0.15 },
      { label: "Primer", ratio: 0.3 },
      { label: "Roof coating (2 topcoats)", ratio: 0.55 },
    ],
    labour: [
      { label: "Roof cleaning & preparation", ratio: 0.35 },
      { label: "Rust spot treatment & priming", ratio: 0.2 },
      { label: "Coating application", ratio: 0.45 },
    ],
    included: [
      "Cleaning and preparing the roof surface",
      "Spot-treating surface rust and priming",
      "Applying protective coating",
    ],
  },
  replacement: {
    materials: [
      { label: "Roofing sheets / tiles", ratio: 0.45 },
      { label: "Battens & timber", ratio: 0.15 },
      { label: "Flashings & capping", ratio: 0.15 },
      { label: "Fasteners & sealant", ratio: 0.1 },
      { label: "Sarking / insulation layer", ratio: 0.15 },
    ],
    labour: [
      { label: "Old roof removal / strip-out", ratio: 0.3 },
      { label: "New roofing installation", ratio: 0.45 },
      { label: "Flashing & capping installation", ratio: 0.15 },
      { label: "Final inspection & clean-up", ratio: 0.1 },
    ],
    included: [
      "Removal and disposal of the old roof",
      "Supply and installation of new roofing material",
      "New flashings, capping and fasteners",
      "Final inspection and clean-up",
    ],
  },
  gutters: {
    materials: [
      { label: "Guttering", ratio: 0.6 },
      { label: "Downpipes (included)", ratio: 0.25 },
      { label: "Brackets & fasteners", ratio: 0.15 },
    ],
    labour: [
      { label: "Old gutter removal", ratio: 0.3 },
      { label: "New gutter & downpipe installation", ratio: 0.7 },
    ],
    included: [
      "Removal of old, damaged guttering",
      "Supply and installation of new gutters and downpipes (downpipes included in this estimate)",
      "Checking fall/pitch for correct drainage",
    ],
  },
  repairs: {
    materials: [{ label: "Materials", ratio: 1 }],
    labour: [{ label: "Labour", ratio: 1 }],
    included: [
      "On-site assessment of the affected area(s)",
      "Supply and fitting of replacement materials",
      "Sealing and weatherproofing the repaired area",
    ],
  },
  leak: {
    materials: [{ label: "Materials", ratio: 1 }],
    labour: [{ label: "Labour", ratio: 1 }],
    included: [
      "Tracing the leak to its actual source",
      "Repairing or replacing the failed flashing, tile or seal",
      "Checking surrounding areas for related damage",
    ],
  },
};

// Supporting items come from the waste/access bucket.
const SUPPORTING = {
  restoration: [
    { label: "Scaffolding / access equipment", doubleStoreyOnly: true, ratio: 0.5 },
    { label: "Tarps & surface protection", ratio: 0.2 },
    { label: "Waste bags & disposal", ratio: 0.3 },
  ],
  painting: [
    { label: "Scaffolding / access equipment", doubleStoreyOnly: true, ratio: 0.6 },
    { label: "Tarps & surface protection", ratio: 0.4 },
  ],
  replacement: [
    { label: "Scaffolding / access equipment", doubleStoreyOnly: true, ratio: 0.4 },
    { label: "Old material removal & disposal", ratio: 0.6 },
  ],
  gutters: [{ label: "Old gutter removal & disposal", ratio: 1 }],
};

const FULL_FLOW_TYPES = ["restoration", "replacement", "painting"];

// Split `total` (a whole multiple of $10) across `items` by ratio, in whole
// $10 amounts that add up exactly to `total` (largest-remainder rounding).
export function allocate(total, items) {
  if (!items.length) return [];
  const units = Math.round(total / 10);
  const weightSum = items.reduce((t, i) => t + i.ratio, 0);
  const raw = items.map((i) => (units * i.ratio) / weightSum);
  const floors = raw.map(Math.floor);
  let left = units - floors.reduce((t, n) => t + n, 0);
  raw
    .map((v, idx) => ({ idx, frac: v - floors[idx] }))
    .sort((a, b) => b.frac - a.frac || a.idx - b.idx)
    .forEach(({ idx }) => {
      if (left > 0) {
        floors[idx] += 1;
        left -= 1;
      }
    });
  return items.map((i, idx) => ({ label: i.label, cost: floors[idx] * 10 }));
}

function itemKey(jobType, material) {
  if (jobType === "restoration" || jobType === "painting") {
    return `${jobType}:${materialGroup(material)}`;
  }
  return jobType;
}

export function buildEstimateBreakdown({ answers: rawAnswers, estimate }) {
  // Safety net: an asbestos restoration/painting is always a replacement.
  const answers = normaliseAnswers(rawAnswers);
  const jobType = answers.jobType;
  const isFullFlow = FULL_FLOW_TYPES.includes(jobType);
  const isGutters = jobType === "gutters";
  const isSimpleJob = jobType === "repairs" || jobType === "leak";
  const spec = ITEMS[itemKey(jobType, answers.material)] || ITEMS.repairs;

  // Midpoint, to the nearest $10. Ranges are whole $100s, so this is exact.
  const midpoint = Math.round((estimate.low + estimate.high) / 2 / 10) * 10;

  // Overall split of the midpoint into buckets.
  let shares;
  if (isSimpleJob) {
    shares = [
      { label: "materials", ratio: 0.35 },
      { label: "labour", ratio: 0.65 },
    ];
  } else {
    const labourShare = answers.storeys === "double" ? 0.4 : 0.48;
    shares = [
      { label: "materials", ratio: 0.4 },
      { label: "labour", ratio: labourShare },
      { label: "waste", ratio: 1 - 0.4 - labourShare },
    ];
  }
  const buckets = Object.fromEntries(allocate(midpoint, shares).map((b) => [b.label, b.cost]));
  const materialsTotal = buckets.materials;
  const labourTotal = buckets.labour;
  const wasteTotal = buckets.waste || 0;

  const materialLineItems = isSimpleJob ? [] : allocate(materialsTotal, spec.materials);
  const labourLineItems = isSimpleJob ? [] : allocate(labourTotal, spec.labour);

  const isAsbestosRemoval = jobType === "replacement" && answers.currentMaterial === "asbestos";
  const supportingSpec = (SUPPORTING[jobType] || [])
    .filter((item) => !item.doubleStoreyOnly || answers.storeys === "double")
    .map((item) => ({
      ...item,
      label:
        isAsbestosRemoval && item.label === "Old material removal & disposal"
          ? "Licensed asbestos removal & disposal"
          : item.label,
    }));
  const supportingLineItems = isSimpleJob ? [] : allocate(wasteTotal, supportingSpec);

  // Property/job detail rows for the PDF's "what we used" section.
  const detailRows = [
    { label: "Job type", value: JOB_TYPE_LABEL[jobType] },
    { label: "Storeys", value: answers.storeys === "double" ? "Double storey" : "Single storey" },
  ];

  if (isFullFlow) {
    detailRows.push({ label: "Roof size", value: `${answers.roofSizeM2} m²` });
    if (jobType === "replacement") {
      detailRows.push({ label: "Current roof", value: MATERIAL_LABEL[answers.currentMaterial] });
      detailRows.push({ label: "New roof", value: MATERIAL_LABEL[answers.desiredMaterial] });
      const sameGroup =
        conversionGroup(answers.currentMaterial) === conversionGroup(answers.desiredMaterial);
      detailRows.push({
        label: "Conversion type",
        value:
          answers.currentMaterial === "asbestos"
            ? "Licensed asbestos removal + new roof install"
            : sameGroup
            ? "Like-for-like material swap"
            : "Material conversion (tile / metal)",
      });
    } else {
      detailRows.push({ label: "Material", value: MATERIAL_LABEL[answers.material] });
    }
    detailRows.push({ label: "Roof shape", value: SHAPE_LABEL[answers.complexity] });
  } else if (jobType === "repairs") {
    detailRows.push({ label: "Material", value: MATERIAL_LABEL[answers.material] });
    detailRows.push({ label: "Areas needing repair", value: REPAIR_AREA_LABEL[answers.repairAreas] });
  } else if (jobType === "leak") {
    detailRows.push({ label: "Material", value: MATERIAL_LABEL[answers.material] });
    detailRows.push({ label: "Duration", value: LEAK_DURATION_LABEL[answers.leakDuration] });
  } else if (isGutters) {
    detailRows.push({ label: "Guttering length", value: `${answers.gutterLengthM} m (includes downpipes)` });
  }

  return {
    jobTypeLabel: JOB_TYPE_LABEL[jobType],
    detailRows,
    midpoint,
    materialsTotal,
    labourTotal,
    wasteTotal,
    materialLineItems,
    labourLineItems,
    supportingLineItems,
    includedItems: spec.included,
    isSimpleJob,
  };
}
