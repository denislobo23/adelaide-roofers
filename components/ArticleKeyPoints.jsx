// components/ArticleKeyPoints.jsx
// "Key points" box near the top of an article, with optional jump links to sections.

const linkClass = "font-semibold text-clay hover:text-clay-deep";

export default function ArticleKeyPoints({ points, jumpLinks = [] }) {
  return (
    <div className="mt-6 rounded-2xl border border-mortar bg-paper p-5">
      <p className="font-display text-sm font-bold uppercase tracking-wide text-clay">Key points</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {jumpLinks.length > 0 && (
        <nav aria-label="Jump to a section" className="mt-4 border-t border-mortar pt-4">
          <p className="font-display text-sm font-bold text-ink">Jump to:</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-body text-sm">
            {jumpLinks.map((j) => (
              <li key={j.href}>
                <a href={j.href} className={linkClass}>
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
