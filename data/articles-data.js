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
];

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null;
}
