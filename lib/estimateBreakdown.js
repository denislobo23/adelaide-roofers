// lib/estimateBreakdown.js
//
// Takes the calculator answers + estimate range and produces a detailed,
// itemised cost breakdown for the PDF. The OVERALL SPLIT (materials vs
// labour vs waste vs access) and the SUB-ITEM RATIOS within materials are
// currently sensible PLACEHOLDER PROPORTIONS of the total estimate — not
// independently priced line items. Once Wally's real cost structure is
// captured, these ratios should be replaced with his actual splits.

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

// Sub-item ratios within the "labour" bucket, per job type.
// Each set of ratios sums to 1.0. Labour splits are the LEAST certain
// figures in this whole document — worth prioritising in the Wally
// pricing conversation even above material unit costs.
const LABOUR_SUBITEMS = {
  restoration: [
    { label: "Roof cleaning & preparation", ratio: 0.25 },
    { label: "Tile replacement labour", ratio: 0.2 },
    { label: "Ridge capping — re-bedding & pointing labour", ratio: 0.35 },
    { label: "Coating application", ratio: 0.2 },
  ],
  painting: [
    { label: "Roof cleaning & preparation", ratio: 0.35 },
    { label: "Priming labour", ratio: 0.2 },
    { label: "Coating application", ratio: 0.45 },
  ],
  replacement: [
    { label: "Old roof removal / strip-out", ratio: 0.3 },
    { label: "New roofing installation", ratio: 0.45 },
    { label: "Flashing & capping installation", ratio: 0.15 },
    { label: "Final inspection & clean-up", ratio: 0.1 },
  ],
  gutters: [
    { label: "Old gutter removal", ratio: 0.3 },
    { label: "New gutter & downpipe installation", ratio: 0.7 },
  ],
};

// Sub-item ratios within the "materials" bucket, per job type.
// Each set of ratios sums to 1.0.
const MATERIAL_SUBITEMS = {
  restoration: [
    { label: "Replacement tiles (as needed)", ratio: 0.35 },
    { label: "Ridge capping — bedding compound & pointing", ratio: 0.3 },
    { label: "Sealant / protective coating", ratio: 0.25 },
    { label: "Primer", ratio: 0.1 },
  ],
  painting: [
    { label: "Sealant / protective coating", ratio: 0.55 },
    { label: "Primer", ratio: 0.25 },
    { label: "Replacement tiles (as needed)", ratio: 0.2 },
  ],
  replacement: [
    { label: "Roofing sheets / tiles", ratio: 0.45 },
    { label: "Battens & timber", ratio: 0.15 },
    { label: "Flashings & capping", ratio: 0.15 },
    { label: "Fasteners & sealant", ratio: 0.1 },
    { label: "Sarking / insulation layer", ratio: 0.15 },
  ],
  gutters: [
    { label: "Guttering", ratio: 0.6 },
    { label: "Downpipes", ratio: 0.25 },
    { label: "Brackets & fasteners", ratio: 0.15 },
  ],
};

// Supporting items are calculated from the "waste/access" bucket, not materials.
const SUPPORTING_ITEMS = {
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
  gutters: [
    { label: "Old gutter removal & disposal", ratio: 1 },
  ],
};

const FULL_FLOW_TYPES = ["restoration", "replacement", "painting"];

export function buildEstimateBreakdown({ answers, estimate }) {
  const average = (estimate.low + estimate.high) / 2;
  const jobType = answers.jobType;
  const isFullFlow = FULL_FLOW_TYPES.includes(jobType);
  const isGutters = jobType === "gutters";
  const isSimpleJob = jobType === "repairs" || jobType === "leak";

  // Overall split of the total estimate.
  let materialsShare, labourShare, wasteShare;
  if (isSimpleJob) {
    // Small jobs: just materials + labour, no separate waste line.
    materialsShare = 0.35;
    labourShare = 0.65;
    wasteShare = 0;
  } else {
    materialsShare = 0.4;
    labourShare = answers.storeys === "double" ? 0.4 : 0.48;
    wasteShare = 1 - materialsShare - labourShare; // covers waste + access
  }

  const materialsTotal = average * materialsShare;
  const labourTotal = average * labourShare;
  const wasteTotal = average * wasteShare;

  const materialLineItems = isSimpleJob
    ? []
    : (MATERIAL_SUBITEMS[jobType] || []).map((item) => ({
        label: item.label,
        cost: Math.round((materialsTotal * item.ratio) / 10) * 10,
      }));

  const labourLineItems = isSimpleJob
    ? []
    : (LABOUR_SUBITEMS[jobType] || []).map((item) => ({
        label: item.label,
        cost: Math.round((labourTotal * item.ratio) / 10) * 10,
      }));

  const supportingLineItems = isSimpleJob
    ? []
    : (SUPPORTING_ITEMS[jobType] || [])
        .filter((item) => !item.doubleStoreyOnly || answers.storeys === "double")
        .map((item) => ({
          label: item.label,
          cost: Math.round((wasteTotal * item.ratio) / 10) * 10,
        }));

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
      const METAL_GROUP = ["colorbond", "galvanised", "zincalume"];
      const sameGroup =
        METAL_GROUP.includes(answers.currentMaterial) === METAL_GROUP.includes(answers.desiredMaterial);
      detailRows.push({
        label: "Conversion type",
        value: sameGroup ? "Like-for-like material swap" : "Material conversion (tile ↔ metal)",
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
    detailRows.push({ label: "Guttering length", value: `${answers.gutterLengthM} m` });
  }

  return {
    jobTypeLabel: JOB_TYPE_LABEL[jobType],
    detailRows,
    materialsTotal: Math.round(materialsTotal / 10) * 10,
    labourTotal: Math.round(labourTotal / 10) * 10,
    materialLineItems,
    labourLineItems,
    supportingLineItems,
    isSimpleJob,
  };
}
