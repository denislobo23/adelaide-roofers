// components/ArticleSources.jsx
// "Sources" list for the end of an article. Every link opens in a new tab.

const linkClass = "font-semibold text-clay hover:text-clay-deep";

export default function ArticleSources({ sources }) {
  return (
    <article>
      <h2 className="font-display text-lg font-bold tracking-tight text-ink">Sources</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-ink/60 marker:text-clay">
        {sources.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {s.note}
          </li>
        ))}
      </ul>
    </article>
  );
}
