// components/ArticleFaq.jsx
// Short FAQ block for the end of an article, plus FAQPage JSON-LD.
// Answers are plain strings so the visible text and the schema always match.

export default function ArticleFaq({ heading, faqs, id }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <article id={id} className={id ? "scroll-mt-24" : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-display text-2xl font-bold tracking-tight text-clay">{heading}</h2>
      <dl className="mt-6 space-y-6">
        {faqs.map(({ q, a }) => (
          <div key={q}>
            <dt className="font-display text-lg font-bold tracking-tight text-ink">{q}</dt>
            <dd className="mt-2 font-body leading-relaxed text-ink/70">{a}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
