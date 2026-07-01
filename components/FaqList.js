// components/FaqList.js
// Reusable FAQ accordion. Renders the questions AND emits FAQPage
// JSON-LD for rich results. Pass it any array of {q, a} objects.
// `emitSchema` lets the suburb page keep using its own schema and
// avoid double-emitting if needed.

export default function FaqList({ faqs, heading, eyebrow = "Questions", emitSchema = true }) {
  if (!faqs?.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="border-t border-mortar bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16">
        {emitSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <span className="eyebrow text-clay">{eyebrow}</span>
        {heading && (
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {heading}
          </h2>
        )}
        <div className="mt-8 divide-y divide-mortar">
          {faqs.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between font-display font-semibold tracking-tight text-ink marker:content-['']">
                {f.q}
                <span className="ml-4 text-clay transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 font-body leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
