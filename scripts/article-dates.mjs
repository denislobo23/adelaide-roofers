// Generates data/article-dates.json from git history for every blog article.
//
//   node scripts/article-dates.mjs
//
// Run it before committing a real content change to an article, so its
// "Last updated" date moves forward. The output is committed because hosting
// builds often use a shallow clone with no usable history.
//
// datePublished = first commit that touched the article's folder (folder-based,
//                 so the July rename to page.js doesn't confuse it).
// dateModified  = last commit that touched it, ignoring commits that didn't
//                 change the content: those listed in SKIP_COMMITS, and any
//                 commit whose message contains [skip-dates].

import { execSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Internal-link and SEO-only commits that shouldn't count as updates.
const SKIP_COMMITS = [
  "9a982fa", // service pages as keyword home (repair-vs-replace title/links)
  "0c76c5f", // roof cleaning page (link paragraph in how-often-inspect)
  "fd886cb", // roof restoration cluster links
  "017c07b", // roof replacement cluster links
];
const SKIP_TAG = "[skip-dates]";

const blogDir = "app/blog";
const git = (args) => execSync(`git ${args}`, { encoding: "utf8" }).trim();

const slugs = readdirSync(blogDir)
  .filter((d) => statSync(join(blogDir, d)).isDirectory())
  .sort();

const out = {};
for (const slug of slugs) {
  const lines = git(`log --format=%h%x09%cs%x09%s -- ${blogDir}/${slug}`)
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [hash, date, subject] = l.split("\t");
      return { hash, date, subject };
    });
  if (lines.length === 0) {
    throw new Error(`No commits yet for ${slug}: commit it before running this script.`);
  }
  const counted = lines.filter(
    (c) => !SKIP_COMMITS.some((h) => c.hash.startsWith(h)) && !c.subject.includes(SKIP_TAG)
  );
  out[slug] = {
    datePublished: lines[lines.length - 1].date,
    dateModified: (counted[0] || lines[lines.length - 1]).date,
  };
}

writeFileSync("data/article-dates.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote dates for ${slugs.length} articles to data/article-dates.json`);
