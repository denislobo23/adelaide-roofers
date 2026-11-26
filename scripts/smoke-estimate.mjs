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
// Address lookup: checks /api/address/suggest (OpenStreetMap Nominatim via
// our server) answers, then types an address on /calculator and the
// homepage, picks a suggestion and carries on. The browser checks type the
// same query, which the server has cached, so a run sends Nominatim about
// one request. If Nominatim doesn't answer, the browser checks use mocked
// suggestions and the API check fails. Also forces the lookup to fail and
// checks the customer can carry on with a typed address.
//
// Also checks /api/send-estimate refuses a wrong smoke token (403), and the
// --submit check shows the address the test lead was saved with.
//
// SMOKE_SUBMIT_ADDRESS="128 King William Street Adelaide" (with --submit):
// types that address on /calculator, picks the first suggestion, walks the
// calculator to the estimate page and submits the answers it produced, so
// the report shows exactly what a real customer's lead would save.
//
// Satellite roof-size suggestion (Google Solar): with mocked answers from
// /api/roof-estimate, checks the "Use … m²" card (never pre-selected), that
// ignoring it works, that no suggestion leaves the step as before, and that
// a street-only address never asks. With --submit, the saved size and
// roof_size_from_satellite flag are read back from the test lead. These
// spend no Solar calls. The route check uses a point outside SA (also free).
// SMOKE_SOLAR_LIVE=1 SMOKE_SOLAR_ADDRESS="..." makes ONE real Solar call
// (counts toward SOLAR_DAILY_LIMIT) and reports the suggestion.
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

let lastSavedLead = null; // from the last submitCheck, for the solar checks

async function submitCheck(c, name, answers) {
  const { errors, off } = trackErrors(c);
  lastSavedLead = null;

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
  lastSavedLead = apiResponse?.savedLead || null;
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
      (apiResponse?.savedLead
        ? `, saved address "${apiResponse.savedLead.address}" (suburb "${apiResponse.savedLead.suburb}")` +
          (apiResponse.savedLead.roofSizeM2 != null
            ? `, roof size ${apiResponse.savedLead.roofSizeM2} m², roof_size_from_satellite ${apiResponse.savedLead.roofSizeFromSatellite}`
            : "")
        : "") +
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

// ── Address lookup (OpenStreetMap Nominatim, via our server) ─────────────
// A public building that OpenStreetMap has mapped (Marion Cultural Centre).
const ADDRESS_TYPED = "287 Diagonal Road Oaklands Park";
const MOCK_SUGGEST = {
  suggestions: [
    { id: "1", address: "287 Diagonal Road, Oaklands Park SA 5046", suburb: "Oaklands Park", lat: -35.0136, lon: 138.5434 },
  ],
};

// Only another suburb: typing a different suburb should offer the typed text.
const MOCK_OTHER_SUBURB = {
  suggestions: [{ id: "2", address: "287 Diagonal Road, Glengowrie SA 5044", suburb: "Glengowrie", lat: -34.99, lon: 138.53 }],
};

// Straight API check. Returns "live" (Nominatim answered via our route) or
// "broken".
async function addressApiCheck() {
  try {
    const res = await fetch(`${BASE}/api/address/suggest?q=${encodeURIComponent(ADDRESS_TYPED)}`);
    const body = await res.json().catch(() => ({}));
    const first = body.suggestions?.[0];
    const ok = res.ok && first && first.lat < -30 && first.lon > 130;
    console.log(
      `${ok ? "PASS" : "FAIL"}  address API: HTTP ${res.status}, ` +
        (ok
          ? `${body.suggestions.length} suggestions: ${body.suggestions.map((x) => `"${x.address}"`).join(", ")}; ` +
            `first: suburb "${first.suburb}", ${first.lat}, ${first.lon}`
          : JSON.stringify(body))
    );
    return ok ? "live" : "broken";
  } catch (err) {
    console.log(`FAIL  address API: ${err.message}`);
    return "broken";
  }
}

// The smoke-test read-back must never work without the right token.
async function wrongTokenCheck() {
  try {
    const res = await fetch(`${BASE}/api/send-estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-smoke-test": "wrong-token" },
      body: "{}",
    });
    const body = await res.json().catch(() => ({}));
    const ok = res.status === 403 && body.reason === "bad_smoke_token";
    console.log(`${ok ? "PASS" : "FAIL"}  estimate API refuses a wrong smoke token: HTTP ${res.status} ${JSON.stringify(body)}`);
    return ok;
  } catch (err) {
    console.log(`FAIL  estimate API wrong-token check: ${err.message}`);
    return false;
  }
}

// Types an address on `path`, then either picks the suggestion ("pick") or,
// with the lookup forced to fail ("down"), carries on with the typed text.
async function addressUiCheck(c, path, mode, mock) {
  const { errors, off } = trackErrors(c);
  const intercept = mode !== "pick" || mock;
  const offFetch = c.on(async (m) => {
    if (m.method !== "Fetch.requestPaused") return;
    const body = mode === "down" ? { error: "smoke_forced_failure" } : mode === "typed" ? MOCK_OTHER_SUBURB : MOCK_SUGGEST;
    await c.send("Fetch.fulfillRequest", {
      requestId: m.params.requestId,
      responseCode: mode === "down" ? 503 : 200,
      responseHeaders: [{ name: "Content-Type", value: "application/json" }],
      body: Buffer.from(JSON.stringify(body)).toString("base64"),
    });
  });
  if (intercept) await c.send("Fetch.enable", { patterns: [{ urlPattern: "*/api/address/*" }] });
  const problems = [];
  const until = async (expr, ms = 8000) => {
    for (let t = 0; t < ms; t += 250) {
      const v = await evaluate(c, expr);
      if (v) return v;
      await sleep(250);
    }
    return null;
  };
  const button = (re) => `[...document.querySelectorAll("button")].find((b) => ${re}.test(b.innerText))`;
  try {
    await c.send("Page.navigate", { url: BASE + path });
    const input = `document.querySelector('input[placeholder="Start typing your address"]')`;
    if (!(await until(`!!${input}`))) throw new Error("address box not found");
    await sleep(800);
    await evaluate(c, `${input}.focus()`);
    await c.send("Input.insertText", { text: ADDRESS_TYPED });
    if (!(await until(`/Address data © OpenStreetMap contributors/.test(document.body.innerText)`, 1000)))
      problems.push("credit line missing");
    if (mode === "pick") {
      if (!(await until(`!!${button("/Diagonal/i")}`))) throw new Error("no suggestions appeared");
      await evaluate(c, `${button("/Diagonal/i")}.click()`);
      if (!(await until(`${button("/That.s my roof/")}?.disabled === false`))) throw new Error(`"That's my roof" never enabled`);
      if (!(await until(`!!document.querySelector('iframe[src*="maps.google.com"]')`, 3000))) problems.push("no satellite view");
      await evaluate(c, `${button("/That.s my roof/")}.click()`);
    } else if (mode === "typed") {
      // The typed option must exist and be the first entry in the list.
      if (!(await until(`(() => { const b = ${button("/Use exactly what I typed/")}; return !!b && b.parentElement.firstElementChild === b; })()`)))
        throw new Error(`"Use exactly what I typed" not offered first`);
      await evaluate(c, `${button("/Use exactly what I typed/")}.click()`);
      if (!(await until(`${button("/Use this address/")}?.disabled === false`))) {
        const seen = await evaluate(c, `[...document.querySelectorAll("button")].map((b) => b.innerText.trim().slice(0, 50) + (b.disabled ? " (disabled)" : "")).join(" | ")`);
        throw new Error(`"Use this address" never enabled; buttons: ${seen}`);
      }
      await evaluate(c, `${button("/Use this address/")}.click()`);
    } else {
      if (!(await until(`/isn.t available right now/.test(document.body.innerText)`))) problems.push("no fallback message");
      if (!(await until(`${button("/Use this address/")}?.disabled === false`))) throw new Error(`"Use this address" never enabled`);
      await evaluate(c, `${button("/Use this address/")}.click()`);
    }
    if (!(await until(`/need done/i.test(document.querySelector("h3")?.innerText || "")`)))
      problems.push("didn't reach the job-type step");
    // Back to the address step: the box should still hold the address.
    await evaluate(c, `${button("/Back/")}?.click()`);
    const kept = await until(`${input}?.value`, 3000);
    if (!/Diagonal/i.test(kept || "")) problems.push(`address not kept (box shows "${kept}")`);
  } catch (err) {
    problems.push(err.message);
  } finally {
    // Leave the page first, so no late lookup from it lands in the next check.
    await c.send("Page.navigate", { url: "about:blank" });
    await sleep(300);
    if (intercept) await c.send("Fetch.disable");
    offFetch();
    off();
  }
  const unexpected = errors.filter((e) => !(mode === "down" && /Address lookup unavailable/.test(e)));
  const ok = !problems.length && !unexpected.length;
  const label =
    mode === "pick"
      ? `pick a suggestion${mock ? " (mocked)" : ""}`
      : mode === "typed"
      ? `other suburb typed, "Use exactly what I typed" (mocked)`
      : "lookup down, typed address";
  console.log(
    `${ok ? "PASS" : "FAIL"}  address ${path === "/" ? "homepage" : path}: ${label}` +
      (problems.length ? ` — ${problems.join("; ")}` : "") +
      (unexpected.length ? `, JS errors: ${unexpected.join(" | ")}` : "")
  );
  return ok;
}

// Type `typed` on /calculator, pick the first suggestion, walk a roof
// restoration to the estimate page, and return the answers it stored.
async function answersFromTypedAddress(c, typed) {
  const until = async (expr, ms = 8000) => {
    for (let t = 0; t < ms; t += 250) {
      const v = await evaluate(c, expr);
      if (v) return v;
      await sleep(250);
    }
    return null;
  };
  const click = (re) =>
    evaluate(c, `(() => { const b = [...document.querySelectorAll("button")].find((x) => ${re}.test(x.innerText)); if (b) b.click(); return !!b; })()`);
  await c.send("Page.navigate", { url: `${BASE}/calculator` });
  const input = `document.querySelector('input[placeholder="Start typing your address"]')`;
  if (!(await until(`!!${input}`))) throw new Error("address box not found");
  await sleep(800);
  await evaluate(c, `${input}.focus()`);
  await c.send("Input.insertText", { text: typed });
  const list = await until(
    `(() => { const box = ${input}.parentElement.querySelector("div.absolute"); return box ? [...box.querySelectorAll("button")].map((b) => b.innerText) : null; })()`
  );
  if (!list?.length) throw new Error(`no suggestions for "${typed}"`);
  console.log(`INFO  suggestions for "${typed}": ${list.map((x) => `"${x}"`).join(", ")}`);
  await evaluate(c, `${input}.parentElement.querySelector("div.absolute button").click()`);
  console.log(`INFO  address box after picking the first: "${await evaluate(c, `${input}.value`)}"`);
  await sleep(300);
  for (const re of [/That.s my roof/, /Roof Restoration/, /^Continue/, /Not sure\? Use a typical/, /^Continue/, /^Single storey$/, /^Continue/, /Concrete tile/, /^Continue/, /Hip/, /See my estimate/]) {
    if (!(await click(re))) throw new Error(`couldn't click ${re}`);
    await sleep(250);
  }
  if (!(await until(`location.pathname === "/get-my-estimate"`))) throw new Error("didn't reach the estimate page");
  return JSON.parse(await evaluate(c, `sessionStorage.getItem("roofEstimateAnswers")`));
}

// ── Satellite roof-size suggestion ──────────────────────────────────────
const SOLAR_PICK = { id: "s1", address: "287 Diagonal Road, Oaklands Park SA 5046", suburb: "Oaklands Park", lat: -35.0136, lon: 138.5434 };

// Free: a point outside SA is answered {} before any Solar call or count.
async function roofEstimateRouteCheck() {
  try {
    const res = await fetch(`${BASE}/api/roof-estimate?lat=-33.87&lon=151.21`);
    const body = await res.json().catch(() => null);
    const ok = res.status === 200 && body && Object.keys(body).length === 0;
    console.log(`${ok ? "PASS" : "FAIL"}  roof-estimate route: non-SA point gives no suggestion (HTTP ${res.status} ${JSON.stringify(body)})`);
    return ok;
  } catch (err) {
    console.log(`FAIL  roof-estimate route: ${err.message}`);
    return false;
  }
}

// variant: "use" (tap Use 210 m²), "ignore" (set 150 m² on the slider),
// "none" (no suggestion), "street" (street-only pick: must not ask),
// "live" (real call; only with SMOKE_SOLAR_LIVE=1).
async function solarCheck(c, variant, typed) {
  const { errors, off } = trackErrors(c);
  let roofRequests = 0;
  const live = variant === "live";
  const offFetch = c.on(async (m) => {
    if (m.method !== "Fetch.requestPaused") return;
    const url = m.params.request.url;
    let body;
    if (url.includes("/api/roof-estimate")) {
      roofRequests++;
      body = variant === "none" ? {} : { areaM2: 210, shape: "hip" };
    } else {
      body = { suggestions: [{ ...SOLAR_PICK, exact: variant !== "street" }] };
    }
    await c.send("Fetch.fulfillRequest", {
      requestId: m.params.requestId,
      responseCode: 200,
      responseHeaders: [{ name: "Content-Type", value: "application/json" }],
      body: Buffer.from(JSON.stringify(body)).toString("base64"),
    });
  });
  if (!live) {
    await c.send("Fetch.enable", { patterns: [{ urlPattern: "*/api/address/*" }, { urlPattern: "*/api/roof-estimate*" }] });
  }
  const problems = [];
  let answers = null;
  let info = "";
  const until = async (expr, ms = 8000) => {
    for (let t = 0; t < ms; t += 250) {
      const v = await evaluate(c, expr);
      if (v) return v;
      await sleep(250);
    }
    return null;
  };
  const button = (re) => `[...document.querySelectorAll("button")].find((b) => ${re}.test(b.innerText))`;
  const click = async (re) => {
    if (!(await until(`!!${button(re)} && !${button(re)}.disabled`))) throw new Error(`couldn't click ${re}`);
    await evaluate(c, `${button(re)}.click()`);
    await sleep(250);
  };
  const continueLocked = () => evaluate(c, `${button("/^Continue/")}?.disabled === true`);
  const hasCard = () => evaluate(c, `/Satellite data suggests your roof is about/.test(document.body.innerText)`);
  try {
    await c.send("Page.navigate", { url: `${BASE}/calculator` });
    const input = `document.querySelector('input[placeholder="Start typing your address"]')`;
    if (!(await until(`!!${input}`))) throw new Error("address box not found");
    await sleep(800);
    await evaluate(c, `${input}.focus()`);
    await c.send("Input.insertText", { text: typed || "287 Diagonal Road Oaklands Park" });
    if (!(await until(`!!${input}.parentElement.querySelector("div.absolute button")`))) throw new Error("no suggestions");
    await evaluate(c, `${input}.parentElement.querySelector("div.absolute button").click()`);
    await click(/That.s my roof/);
    await click(/Roof Restoration/);
    await click(/^Continue/);
    if (!(await until(`/how big is your roof/i.test(document.querySelector("h3")?.innerText || "")`))) throw new Error("size step not reached");
    // Give the suggestion time to arrive.
    const shown = await until(`/Satellite data suggests your roof is about/.test(document.body.innerText)`, live ? 6000 : 3000);
    const unanswered = await evaluate(c, `/Drag the slider to set your roof size/.test(document.body.innerText)`);
    if (!unanswered) problems.push("size was pre-selected");
    if (!(await continueLocked())) problems.push("Continue unlocked before choosing a size");

    if (variant === "use" || variant === "ignore") {
      if (!shown) throw new Error("suggestion card not shown");
      if (!(await evaluate(c, `!!${button("/^Use 210 m²$/")}`))) problems.push(`no "Use 210 m²" button`);
      if (!(await evaluate(c, `/Source: Includes solar data from Google/.test(document.body.innerText)`))) problems.push("no Google attribution");
      if (variant === "use") {
        await click(/^Use 210 m²$/);
      } else {
        await evaluate(
          c,
          `(() => { const s = document.querySelector('input[type=range]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(s, "150"); s.dispatchEvent(new Event("input", { bubbles: true })); })()`
        );
        await sleep(250);
      }
      if (await continueLocked()) problems.push("Continue still locked after choosing");
      await click(/^Continue/);
      await click(/^Single storey$/);
      await click(/^Continue/);
      await click(/Concrete tile/);
      await click(/^Continue/);
      if (!(await until(`/which shape/i.test(document.querySelector("h3")?.innerText || "")`))) throw new Error("shape step not reached");
      const label = await evaluate(
        c,
        `(() => { const b = [...document.querySelectorAll("button")].find((x) => /Looks like this from satellite/.test(x.innerText)); return b ? b.innerText.replace(/\\s+/g, " ") : ""; })()`
      );
      if (!/slopes down on all four sides/.test(label)) problems.push(`satellite label not on the Hip card ("${label}")`);
      if (await evaluate(c, `${button("/See my estimate/")}?.disabled === false`)) problems.push("a shape was pre-selected");
      await click(/A roof that slopes down on all four sides/);
      await click(/See my estimate/);
      if (!(await until(`location.pathname === "/get-my-estimate"`))) throw new Error("estimate page not reached");
      answers = JSON.parse(await evaluate(c, `sessionStorage.getItem("roofEstimateAnswers")`));
      const want = variant === "use" ? { size: 210, flag: true } : { size: 150, flag: false };
      if (answers.roofSizeM2 !== want.size || answers.roofSizeFromSatellite !== want.flag) {
        problems.push(`answers: ${answers.roofSizeM2} m², flag ${answers.roofSizeFromSatellite} (expected ${want.size}, ${want.flag})`);
      }
      info = `answers ${answers.roofSizeM2} m², roofSizeFromSatellite ${answers.roofSizeFromSatellite}`;
    } else if (variant === "none") {
      if (shown) problems.push("card shown with no suggestion");
      info = "size step unchanged";
    } else if (variant === "street") {
      await sleep(1500);
      if (roofRequests) problems.push(`${roofRequests} roof-estimate request(s) for a street-only pick`);
      if (shown) problems.push("card shown for a street-only pick");
      info = `${roofRequests} roof-estimate requests`;
    } else if (variant === "live") {
      if (!shown) {
        info = "no suggestion (no data, limit reached, switched off, or outside the rules)";
      } else {
        // Use the suggestion and walk to the shape step to read the satellite
        // shape label (no further Solar calls: one per picked address).
        const m2 = await evaluate(c, `document.body.innerText.match(/about\\s+(\\d+) m²/)?.[1]`);
        await click(new RegExp(`^Use ${m2} m²$`));
        await click(/^Continue/);
        await click(/^Single storey$/);
        await click(/^Continue/);
        await click(/Concrete tile/);
        await click(/^Continue/);
        await until(`/which shape/i.test(document.querySelector("h3")?.innerText || "")`);
        const shape = await evaluate(
          c,
          `(() => { const b = [...document.querySelectorAll("button")].find((x) => /Looks like this from satellite/.test(x.innerText)); return b ? (b.innerText.match(/Dutch Gable|Skillion|Gable|Hip|Multi-level/) || ["labelled"])[0] : "none"; })()`
        );
        info = `suggestion: ${m2} m², satellite shape label: ${shape}`;
      }
    }
  } catch (err) {
    problems.push(err.message);
  } finally {
    await c.send("Page.navigate", { url: "about:blank" });
    await sleep(300);
    if (!live) await c.send("Fetch.disable");
    offFetch();
    off();
  }
  const ok = !problems.length && !errors.length;
  console.log(
    `${ok ? "PASS" : "FAIL"}  solar ${variant}: ${info}` +
      (problems.length ? ` — ${problems.join("; ")}` : "") +
      (errors.length ? `, JS errors: ${errors.join(" | ")}` : "")
  );
  if (ok && SUBMIT && answers && (variant === "use" || variant === "ignore")) {
    const submitted = await submitCheck(c, `solar ${variant}`, answers);
    const saved = lastSavedLead;
    const flagOk = saved && (saved.roofSizeFromSatellite === answers.roofSizeFromSatellite || saved.roofSizeFromSatellite === "column not added yet");
    if (!submitted || !saved || saved.roofSizeM2 !== answers.roofSizeM2 || !flagOk) {
      console.log(`FAIL  solar ${variant}: saved lead ${JSON.stringify(saved)}`);
      return false;
    }
  }
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
  if (!(await wrongTokenCheck())) allOk = false;
  const api = await addressApiCheck();
  if (api === "broken") allOk = false;
  for (const path of ["/calculator", "/"]) {
    if (!(await addressUiCheck(c, path, "pick", api !== "live"))) allOk = false;
    if (!(await addressUiCheck(c, path, "down", false))) allOk = false;
    if (!(await addressUiCheck(c, path, "typed", true))) allOk = false;
  }
  if (!(await calculatorCheck(c))) allOk = false;
  if (!(await roofEstimateRouteCheck())) allOk = false;
  for (const variant of ["use", "ignore", "none", "street"]) {
    if (!(await solarCheck(c, variant))) allOk = false;
  }
  if (process.env.SMOKE_SOLAR_LIVE === "1") {
    if (!process.env.SMOKE_SOLAR_ADDRESS) {
      console.log("FAIL  solar live: set SMOKE_SOLAR_ADDRESS to the agreed test address");
      allOk = false;
    } else if (!(await solarCheck(c, "live", process.env.SMOKE_SOLAR_ADDRESS))) allOk = false;
  }
  for (const [name, answers] of Object.entries(SAMPLES)) {
    if (!(await renderCheck(c, name, answers))) allOk = false;
  }
  if (SUBMIT && !(await submitCheck(c, "restoration", SAMPLES.restoration))) allOk = false;
  if (SUBMIT && process.env.SMOKE_SUBMIT_ADDRESS) {
    try {
      const answers = await answersFromTypedAddress(c, process.env.SMOKE_SUBMIT_ADDRESS);
      if (!(await submitCheck(c, `typed "${process.env.SMOKE_SUBMIT_ADDRESS}"`, answers))) allOk = false;
    } catch (err) {
      console.log(`FAIL  submit typed address: ${err.message}`);
      allOk = false;
    }
  }
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
