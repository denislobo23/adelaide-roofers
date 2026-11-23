"use client";
// components/PrintableChecklist.jsx
// A tickable checklist that prints on its own (the rest of the page is hidden
// while printing). Two layouts:
//   - items only: one checkbox per item
//   - items + columns: a grid with one checkbox per item per column
//     (e.g. "Roofer A / Roofer B / Roofer C" for comparing quotes)

import { useId, useRef } from "react";

export default function PrintableChecklist({ heading, intro, items, columns, footer }) {
  const ref = useRef(null);
  const uid = useId();

  function handlePrint() {
    const el = ref.current;
    if (!el) return;
    el.classList.add("is-printing");
    document.body.classList.add("printing-checklist");
    const cleanup = () => {
      el.classList.remove("is-printing");
      document.body.classList.remove("printing-checklist");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  return (
    <article>
      <style>{`
        @media print {
          body.printing-checklist * { visibility: hidden !important; }
          body.printing-checklist .is-printing,
          body.printing-checklist .is-printing * { visibility: visible !important; }
          body.printing-checklist .is-printing {
            position: absolute; left: 0; top: 0; width: 100%;
            border: none !important; box-shadow: none !important;
          }
          body.printing-checklist .is-printing .no-print { display: none !important; }
        }
      `}</style>
      <div ref={ref} className="rounded-2xl border border-mortar bg-paper p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-clay">{heading}</h2>
          <button
            type="button"
            onClick={handlePrint}
            className="no-print inline-flex items-center justify-center rounded-xl border-2 border-ink px-4 py-2 font-display text-sm font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
          >
            Print this checklist
          </button>
        </div>
        {intro && <p className="mt-3 font-body leading-relaxed text-ink/70">{intro}</p>}

        {columns ? (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b border-mortar py-2 pr-3 font-display text-sm font-bold text-ink">
                    Check
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="border-b border-mortar px-2 py-2 text-center font-display text-sm font-bold text-ink"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, r) => (
                  <tr key={item}>
                    <td className="border-b border-mortar py-2 pr-3 font-body text-sm text-ink/80">
                      {item}
                    </td>
                    {columns.map((c, ci) => (
                      <td key={c} className="border-b border-mortar px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          aria-label={`${item}: ${c}`}
                          id={`${uid}-${r}-${ci}`}
                          className="h-4 w-4 accent-clay"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {items.map((item, r) => (
              <li key={item} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`${uid}-${r}`}
                  className="mt-1 h-4 w-4 shrink-0 accent-clay"
                />
                <label htmlFor={`${uid}-${r}`} className="font-body leading-relaxed text-ink/80">
                  {item}
                </label>
              </li>
            ))}
          </ul>
        )}

        {footer && <p className="mt-5 font-body text-sm font-semibold text-ink">{footer}</p>}
        <p className="mt-4 font-body text-xs text-ink/50">From adelaideroofers.com.au</p>
      </div>
    </article>
  );
}
