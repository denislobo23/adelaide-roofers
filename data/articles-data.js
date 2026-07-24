// data/articles-data.js
//
// Lightweight index of every article under app/blog/{slug}/page.js — NOT
// the full article content (that stays in each page.js), just enough to
// list them: in the header nav dropdown, the homepage's Resources
// section, and any future "related articles" component. One source of
// truth so adding a new article means updating this file once, not
// hunting down every place articles are listed.
//
// When you add a new app/blog/{slug}/page.js, add a matching entry here
// in the same turn — easy to forget otherwise, and an article that
// exists but isn't listed here is effectively unreachable from the nav.

export const articles = [
  {
    slug: "roof-replacement-cost-adelaide",
    title: "How Much Does a Roof Replacement Cost in Adelaide?",
    category: "Costs",
  },
  {
    slug: "roof-restoration-cost-adelaide",
    title: "How Much Does Roof Restoration Cost in Adelaide?",
    category: "Costs",
  },
  {
    slug: "roof-repair-cost-factors",
    title: "What Factors Affect the Cost of a Roof Repair",
    category: "Costs",
  },
  {
    slug: "repair-vs-replace",
    title: "Repair vs. Replace: Which Does Your Roof Need?",
    category: "Repair vs. replace",
  },
  {
    slug: "signs-you-need-a-new-roof",
    title: "Signs You Need a Roof Replacement, Not Just a Repair",
    category: "Repair vs. replace",
  },
  {
    slug: "tile-to-metal-roofing",
    title: "What Actually Changes When You Go Tile-to-Metal",
    category: "Materials",
  },
  {
    slug: "colorbond-vs-tile",
    title: "Colorbond vs Tile: Which Is Better for Adelaide Homes?",
    category: "Materials",
  },
  {
    slug: "asbestos-roof-removal-guide",
    title: "Asbestos Roof Removal: What Adelaide Homeowners Need to Know",
    category: "Materials",
  },
  {
    slug: "questions-to-ask-a-roofer",
    title: "10 Questions to Ask a Roofer Before You Sign",
    category: "Choosing a roofer",
  },
  {
    slug: "insurance-roof-replacement-sa",
    title: "Does Home Insurance Cover Roof Replacement in SA?",
    category: "Costs",
  },
  {
    slug: "how-to-read-a-roofing-quote",
    title: "How to Read a Roofing Quote: What Should Be Included",
    category: "Choosing a roofer",
  },
  {
    slug: "roofer-vs-contractor-vs-plumber",
    title: "Roofer vs Roof Contractor vs Roof Plumber: Which Do You Need?",
    category: "Choosing a roofer",
  },
  {
    slug: "roofing-scams-adelaide",
    title: "Common Roofing Scams in Australia (and How to Avoid Them)",
    category: "Choosing a roofer",
  },
  {
    slug: "roof-warranties-explained",
    title: "Roof Warranties Explained: What's Actually Covered",
    category: "Choosing a roofer",
  },
  {
    slug: "financing-a-new-roof",
    title: "Can I Finance a New Roof? Options for Adelaide Homeowners",
    category: "Costs",
  },
  {
    slug: "does-colorbond-rust",
    title: "Does Colorbond Rust? What Adelaide Homeowners Should Know",
    category: "Materials",
  },
  {
    slug: "terracotta-roofs-pros-cons",
    title: "Terracotta Roofs: Pros, Cons, and When to Restore vs Replace",
    category: "Materials",
  },
  {
    slug: "council-approval-roof-replacement-sa",
    title: "Do I Need Council Approval to Replace My Roof in SA?",
    category: "Process",
  },
  {
    slug: "how-long-does-roof-replacement-take",
    title: "How Long Does a Roof Replacement Actually Take?",
    category: "Process",
  },
  {
    slug: "metal-roof-noise-in-rain",
    title: "Is a Metal Roof Really Noisier in the Rain?",
    category: "Materials",
  },
  {
    slug: "how-often-inspect-your-roof",
    title: "How Often Should You Get Your Roof Inspected?",
    category: "Process",
  },
  {
    slug: "rain-during-a-roofing-job",
    title: "What Happens If It Rains During a Roofing Job?",
    category: "Process",
  },
  {
    slug: "roof-ventilation-whirlybirds-guide",
    title: "Roof Ventilation & Whirlybirds: Do You Actually Need Them?",
    category: "Materials",
  },
  {
    slug: "solar-panels-and-your-roof",
    title: "Solar Panels and Your Roof: What to Check First",
    category: "Materials",
  },
];

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null;
}
