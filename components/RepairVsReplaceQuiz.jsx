"use client";
// components/RepairVsReplaceQuiz.jsx
//
// Small interactive quiz — NOT a RoofCalculator-scale build, deliberately.
// The underlying logic is 5 priority-ordered rules (see the decision
// table in app/blog/repair-vs-replace/page.js), so the tool stays
// proportionate to the question it's answering. Questions are asked in
// priority order — safety first, then chronic-repair pattern, then age/
// solar, then cosmetic condition — first match wins, "Repair" is the
// fallback if nothing else triggers.
//
// Verdict screen hands off to the real price calculator — this tool
// decides WHICH job type you have, /calculator decides what it costs.

import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  {
    key: "asbestos",
    question: "Is your roof asbestos cement sheeting, and is it cracked, cut, or deteriorating?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Not sure", value: "unsure" },
    ],
  },
  {
    key: "pattern",
    question: "How many areas need attention right now?",
    options: [
      { label: "Just one or two, roof otherwise sound", value: "isolated" },
      { label: "Several different spots, or repairs needed more than once this year", value: "repeated" },
    ],
  },
  {
    key: "ageOrSolar",
    question: "Is your roof 40+ years old, or are you planning to add solar panels?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    key: "condition",
    question: "How does the rest of the roof actually look?",
    options: [
      { label: "Solid — just the specific issue needs fixing", value: "solid" },
      { label: "Faded, chalky, or has moss/lichen, but structurally fine", value: "worn" },
    ],
  },
];

const VERDICTS = {
  replace_safety: {
    title: "Replacement — for safety, not just cosmetics",
    body: "Asbestos roofing that's cracking or deteriorating isn't a repair or DIY job — it needs a licensed asbestos removalist and, realistically, a full replacement.",
    jobType: "replacement",
  },
  replace_pattern: {
    title: "Getting close to replacement",
    body: "Repeated repairs in different spots is usually a sign the roof itself is nearing the end of its life, not that you've had bad luck. The real comparison isn't one repair's price — it's repeated repair cost over the next few years vs. one replacement now.",
    jobType: "replacement",
  },
  replace_age: {
    title: "Replacement usually pays off here",
    body: "A roof this old, or one about to carry solar panels, is generally better served by a full replacement than ongoing patching — especially if you want the new roof and any solar mounting done properly, once.",
    jobType: "replacement",
  },
  restore: {
    title: "Restoration",
    body: "Structurally your roof is fine — this is a cleaning, sealing, and repainting job (plus re-bedding ridge capping where needed), not a repair or a replacement.",
    jobType: "restoration",
  },
  repair: {
    title: "Repair",
    body: "This sounds like an isolated issue on an otherwise sound roof — a straightforward repair, not something bigger.",
    jobType: "repairs",
  },
};

function getVerdict(answers) {
  if (answers.asbestos === "yes") return "replace_safety";
  if (answers.pattern === "repeated") return "replace_pattern";
  if (answers.ageOrSolar === "yes") return "replace_age";
  if (answers.condition === "worn") return "restore";
  return "repair";
}

export default function RepairVsReplaceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verdictKey, setVerdictKey] = useState(null);

  const answer = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setVerdictKey(getVerdict(next));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setVerdictKey(null);
  };

  if (verdictKey) {
    const verdict = VERDICTS[verdictKey];
    return (
      <div className="rounded-2xl border-2 border-clay/50 bg-white p-6 shadow-xl md:p-8">
        <span className="eyebrow text-clay">Your answer</span>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
          {verdict.title}
        </h3>
        <p className="mt-3 font-body leading-relaxed text-ink/70">{verdict.body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
          >
            Get an instant estimate →
          </Link>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center justify-center rounded-xl border-2 border-mortar px-6 py-3 font-display font-bold tracking-tight text-ink/70 transition hover:border-clay/50"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="rounded-2xl border-2 border-clay/50 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-5 flex items-center gap-1.5">
        {QUESTIONS.map((q, i) => (
          <div
            key={q.key}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-clay" : "bg-teal-100"
            }`}
          />
        ))}
      </div>
      <span className="eyebrow text-clay">
        Question {step + 1} of {QUESTIONS.length}
      </span>
      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">
        {current.question}
      </h3>
      <div className="mt-5 space-y-2.5">
        {current.options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => answer(current.key, o.value)}
            className="w-full rounded-lg border-2 border-teal-200 p-4 text-left font-body text-sm font-medium text-ink/80 transition-all hover:border-clay/50"
          >
            {o.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-5 text-sm font-semibold text-ink/50 hover:text-ink/70"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
