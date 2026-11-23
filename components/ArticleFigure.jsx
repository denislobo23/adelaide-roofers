// components/ArticleFigure.jsx
// Wrapper for an inline SVG diagram in an article: heading, scrollable frame, caption.

export default function ArticleFigure({ heading, caption, children, id }) {
  return (
    <article id={id} className={id ? "scroll-mt-24" : undefined}>
      <h2 className="font-display text-2xl font-bold tracking-tight text-clay">{heading}</h2>
      <figure className="mt-5">
        <div className="overflow-x-auto rounded-xl border border-mortar bg-paper p-4">
          {children}
        </div>
        {caption && (
          <figcaption className="mt-3 font-body text-sm leading-relaxed text-ink/60">
            {caption}
          </figcaption>
        )}
      </figure>
    </article>
  );
}
