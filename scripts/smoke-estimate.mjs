// scripts/smoke-estimate.mjs
//
// Smoke test for /get-my-estimate, in a real headless Chrome/Edge.
//
// Default (render check): opens the page with sample calculator answers and
// checks the name / mobile / timeframe form appears with no JS errors.
// Never submits anything.
//
// --submit (end-to-end): also fills in and submits the form for a roof
// restoration. Every request to /api/send-estimate gets the header
// `x-smoke-test: $SMOKE_TEST_TOKEN`, which makes the API run the whole
// pipeline (pricing, PDF, Supabase upload, lead save) but send NO SMS and
// NO email, then delete the test PDF and lead row. Passes only if the API
// reports every step ok and the page shows "Check your phone".
// Refuses to run without SMOKE_TEST_TOKEN, so it can never send a real text.
// The token must match SMOKE_TEST_TOKEN on the server (.env.local / Vercel).
//
// Usage: npm run build && npm start          (in another terminal)
//        npm run smoke                       (render check, localhost:3000)
//        SMOKE_TEST_TOKEN=... npm run smoke -- --submit
//        SMOKE_URL=https://adelaideroofers.com.au ...   (live site)
//
// Needs Node 22+ (built-in WebSocket) and Chrome or Edge (or CHROME_PATH).

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.SMOKE_URL || "http://localhost:3000").replace(/\/$/, "");
const SUBMIT = process.argv.includes("--submit");
const TOKEN = process.env.SMOKE_TEST_TOKEN || "";
const PORT = 9333;

if (SUBMIT && !TOKEN) {
  console.error("FAIL  --submit needs SMOKE_TEST_TOKEN (so no real SMS or email can be sent).");
  process.exit(1);
}

const ADDRESS = { address: "1 Smoke Test St, Marion SA", suburb: "Marion" };
const SAMPLES = {
  restoration: {
    jobType: "restoration", ...ADDRESS,
    roofSizeM2: 200, storeys: "single", material: "concreteTile", complexity: "gable",
  },
  "asbestos restoration (redirected)": {
    jobType: "replacement", requestedJobType: "restoration", asbestosRedirect: true, ...ADDRESS,
    roofSizeM2: 200, storeys: "single", material: "asbestos", currentMaterial: "asbestos",
    desiredMaterial: "colorbond", complexity: "gable",
  },
  repairs: {
    jobType: "repairs", ...ADDRESS, storeys: "single", material: "concreteTile", repairAreas: "few",
  },
};

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found; set CHROME_PATH");
  return found;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDebugger() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const pages = (await res.json()).filter((t) => t.type === "page");
      if (pages.length) return pages[0].webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("Browser debugger did not start");
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else listeners.forEach((fn) => fn(msg));
  };
  return new Promise((resolve) => {
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res) => {
            const n = ++id;
            pending.set(n, res);
            ws.send(JSON.stringify({ id: n, method, params }));
          }),
        on: (fn) => {
          listeners.add(fn);
          return () => listeners.delete(fn);
        },
        close: () => ws.close(),
      });
  });
}

const evaluate = async (c, expression) =>
  (await c.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result
    ?.result?.value;

async function openWithAnswers(c, answers, errors) {
  const { result } = await c.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `sessionStorage.setItem("roofEstimateAnswers", ${JSON.stringify(JSON.stringify(answers))});`,
  });
  await c.send("Page.navigate", { url: `${BASE}/get-my-estimate` });
  let state;
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    state = await evaluate(
      c,
      `({
        name: !!document.querySelector("#name"),
        mobile: !!document.querySelector("#mobile"),
        timeframes: document.querySelectorAll("#timeframe option").length,
        noAnswers: /couldn.t find your answers/i.test(document.body.innerText),
        crashed: /Application error|client-side exception/i.test(document.body.innerText),
      })`
    );
    if (state?.crashed || (state?.name && state?.mobile && state?.timeframes)) break;
  }
  await c.send("Page.removeScriptToEvaluateOnNewDocument", { identifier: result.identifier });
  const ok =
    state?.name && state?.mobile && state?.timeframes >= 4 && !state.crashed && !state.noAnswers && !errors.length;
  return { ok, state };
}

function describe(state, errors) {
  return (
    `name ${state?.name}, mobile ${state?.mobile}, timeframe options ${state?.timeframes}` +
    (state?.crashed ? ", PAGE CRASHED" : "") +
    (state?.noAnswers ? ", answers not found" : "") +
    (errors.length ? `, JS errors: ${errors.join(" | ")}` : "")
  );
}

function trackErrors(c) {
  const errors = [];
  const off = c.on((m) => {
    if (m.method === "Runtime.exceptionThrown")
      errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
      errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  });
  return { errors, off };
}

async function renderCheck(c, name, answers) {
  const { errors, off } = trackErrors(c);
  const { ok, state } = await openWithAnswers(c, answers, errors);
  off();
  console.log(`${ok ? "PASS" : "FAIL"}  render ${name}: ${describe(state, errors)}`);
  return ok;
}

async function submitCheck(c, name, answers) {
  const { errors, off } = trackErrors(c);

  // Add the smoke-test header to every /api/send-estimate request, and
  // capture its response.
  let apiResponse = null;
  let apiStatus = null;
  const offFetch = c.on(async (m) => {
    if (m.method !== "Fetch.requestPaused") return;
    const p = m.params;
    if (p.responseStatusCode === undefined) {
      const headers = Object.entries(p.request.headers).map(([n, v]) => ({ name: n, value: v }));
      headers.push({ name: "x-smoke-test", value: TOKEN });
      await c.send("Fetch.continueRequest", { requestId: p.requestId, headers });
    } else {
      apiStatus = p.responseStatusCode;
      const body = await c.send("Fetch.getResponseBody", { requestId: p.requestId });
      const raw = body.result?.base64Encoded
        ? Buffer.from(body.result.body, "base64").toString("utf8")
        : body.result?.body;
      try {
        apiResponse = JSON.parse(raw);
      } catch {
        apiResponse = { unparsed: raw };
      }
      await c.send("Fetch.continueRequest", { requestId: p.requestId });
    }
  });
  await c.send("Fetch.enable", {
    patterns: [
      { urlPattern: "*/api/send-estimate*", requestStage: "Request" },
      { urlPattern: "*/api/send-estimate*", requestStage: "Response" },
    ],
  });

  const { ok: loaded, state } = await openWithAnswers(c, answers, errors);
  if (!loaded) {
    console.log(`FAIL  submit ${name}: form did not load (${describe(state, errors)})`);
    await c.send("Fetch.disable");
    offFetch();
    off();
    return false;
  }

  // Fill the form the way a person would (typed text, real select change).
  await evaluate(c, `document.querySelector("#name").focus()`);
  await c.send("Input.insertText", { text: "Smoke Test" });
  await evaluate(c, `document.querySelector("#mobile").focus()`);
  await c.send("Input.insertText", { text: "0400000000" });
  await evaluate(
    c,
    `(() => {
      const sel = document.querySelector("#timeframe");
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set;
      setter.call(sel, "exploring");
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    })()`
  );
  await sleep(200);
  await evaluate(c, `document.querySelector("#timeframe").closest("form").requestSubmit()`);

  let screen = "";
  for (let i = 0; i < 120 && !(apiResponse && screen); i++) {
    await sleep(250);
    if (apiResponse) {
      screen = await evaluate(
        c,
        `(() => {
          const t = document.body.innerText;
          if (/Check your phone/i.test(t)) return "Check your phone";
          if (/Something went wrong/i.test(t)) return "Something went wrong";
          if (/we.ve got your details/i.test(t)) return "Delayed: we've got your details";
          if (/couldn.t reach that number/i.test(t)) return "SMS failed";
          return "";
        })()`
      );
    }
  }
  await c.send("Fetch.disable");
  offFetch();
  off();

  const checks = apiResponse?.checks || {};
  const ok =
    apiStatus === 200 &&
    apiResponse?.success === true &&
    apiResponse?.smokeTest === true &&
    screen === "Check your phone" &&
    !errors.length;
  console.log(
    `${ok ? "PASS" : "FAIL"}  submit ${name}: HTTP ${apiStatus}, screen "${screen || "(none)"}"` +
      (apiResponse?.estimate ? `, estimate $${apiResponse.estimate.low}-$${apiResponse.estimate.high}` : "") +
      `, PDF ${checks.pdfBytes ?? "?"} bytes, storage ${checks.storage ?? "?"}, lead saved ${checks.leadSaved ?? "?"}` +
      `, customer SMS ${checks.customerSms ?? "?"}` +
      (apiResponse && !apiResponse.smokeTest ? `, response: ${JSON.stringify(apiResponse)}` : "") +
      (errors.length ? `, JS errors: ${errors.join(" | ")}` : "")
  );
  return ok;
}

// /calculator: every step must start unanswered, with Continue disabled
// until a choice is made. Walks a restoration from the job-type step (the
// address is pre-filled the same way the homepage mini-calculator does it).
async function calculatorCheck(c) {
  const { errors, off } = trackErrors(c);
  const { result } = await c.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `sessionStorage.setItem("heroPrefillAddress", ${JSON.stringify(
      JSON.stringify({ address: "4, Tintern Crescent, Morphett Vale", suburb: "Morphett Vale", lat: -35.13, lon: 138.52 })
    )});`,
  });
  await c.send("Page.navigate", { url: `${BASE}/calculator` });
  const problems = [];
  const state = () =>
    evaluate(
      c,
      `(() => {
        const btns = [...document.querySelectorAll("button")];
        const cont = btns.find((b) => /^(Continue|See my estimate)/.test(b.innerText.trim()));
        const heading = document.querySelector("h3")?.innerText || "";
        return { heading, continueDisabled: cont ? cont.disabled : null };
      })()`
    );
  const click = (pattern) =>
    evaluate(
      c,
      `(() => {
        const b = [...document.querySelectorAll("button")].find((x) => ${pattern}.test(x.innerText));
        if (b) b.click();
        return !!b;
      })()`
    );
  let s;
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    s = await state();
    if (/need done/i.test(s?.heading || "")) break;
  }
  // Each step: [what to click, step heading pattern]
  const walk = [
    [/Roof Restoration/, /need done/i],
    [/Not sure\? Use a typical/, /how big is your roof/i],
    [/^Single storey$/, /single or double/i],
    [/Concrete tile/, /roof made of/i],
    [/Hip/, /which shape/i],
  ];
  for (const [choice, headingPattern] of walk) {
    s = await state();
    if (!headingPattern.test(s.heading)) problems.push(`expected step ${headingPattern}, got "${s.heading}"`);
    if (s.continueDisabled !== true) problems.push(`"${s.heading}": Continue not disabled before answering`);
    await click(choice);
    await sleep(150);
    s = await state();
    if (s.continueDisabled !== false) problems.push(`"${s.heading}": Continue still disabled after choosing`);
    const isLast = headingPattern.source.includes("shape");
    if (!isLast) {
      await click(/^Continue/);
      await sleep(200);
    }
  }
  await c.send("Page.removeScriptToEvaluateOnNewDocument", { identifier: result.identifier });
  off();
  const ok = !problems.length && !errors.length;
  console.log(
    `${ok ? "PASS" : "FAIL"}  calculator: every step starts unanswered, Continue enabled only after a choice` +
      (problems.length ? ` — ${problems.join("; ")}` : "") +
      (errors.length ? `, JS errors: ${errors.join(" | ")}` : "")
  );
  return ok;
}

const profile = mkdtempSync(join(tmpdir(), "smoke-estimate-"));
const browser = spawn(
  findBrowser(),
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"],
  { stdio: "ignore" }
);

let allOk = true;
try {
  const c = await cdp(await waitForDebugger());
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  console.log(`Checking ${BASE}/get-my-estimate${SUBMIT ? " (render + end-to-end submit, test mode)" : ""}`);
  if (!(await calculatorCheck(c))) allOk = false;
  for (const [name, answers] of Object.entries(SAMPLES)) {
    if (!(await renderCheck(c, name, answers))) allOk = false;
  }
  if (SUBMIT && !(await submitCheck(c, "restoration", SAMPLES.restoration))) allOk = false;
  c.close();
} catch (err) {
  console.error("FAIL ", err.message);
  allOk = false;
} finally {
  browser.kill();
  await sleep(500);
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
process.exit(allOk ? 0 : 1);
