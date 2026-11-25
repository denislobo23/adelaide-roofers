// scripts/smoke-estimate.mjs
//
// Smoke test for /get-my-estimate. The page only renders its form when the
// calculator's answers are in sessionStorage, so a static build can't catch
// a crash there. This opens the page in headless Chrome/Edge with sample
// answers and checks the name / mobile / timeframe form appears with no
// JavaScript errors. It never submits the form (no SMS, email or lead).
//
// Usage: npm run build && npm start   (in another terminal)
//        npm run smoke                (defaults to http://localhost:3000)
//        SMOKE_URL=https://... npm run smoke
//
// Needs Node 22+ (built-in WebSocket) and Chrome or Edge installed
// (or set CHROME_PATH).

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.SMOKE_URL || "http://localhost:3000").replace(/\/$/, "");
const PORT = 9333;

const SAMPLES = {
  restoration: {
    jobType: "restoration", address: "1 Test St, Marion SA", suburb: "Marion",
    roofSizeM2: 200, storeys: "single", material: "concreteTile", complexity: "gable",
  },
  "asbestos restoration (redirected)": {
    jobType: "replacement", requestedJobType: "restoration", asbestosRedirect: true,
    address: "1 Test St, Marion SA", suburb: "Marion", roofSizeM2: 200, storeys: "single",
    material: "asbestos", currentMaterial: "asbestos", desiredMaterial: "colorbond", complexity: "gable",
  },
  repairs: {
    jobType: "repairs", address: "1 Test St, Marion SA", suburb: "Marion",
    storeys: "single", material: "concreteTile", repairAreas: "few",
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
  const listeners = [];
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
        on: (fn) => listeners.push(fn),
        close: () => ws.close(),
      });
  });
}

async function checkSample(c, name, answers) {
  const errors = [];
  c.on((m) => {
    if (m.method === "Runtime.exceptionThrown")
      errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
      errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  });
  const { result } = await c.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `sessionStorage.setItem("roofEstimateAnswers", ${JSON.stringify(JSON.stringify(answers))});`,
  });
  await c.send("Page.navigate", { url: `${BASE}/get-my-estimate` });
  let state;
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    const r = await c.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        name: !!document.querySelector("#name"),
        mobile: !!document.querySelector("#mobile"),
        timeframes: document.querySelectorAll("#timeframe option").length,
        noAnswers: document.body.innerText.includes("We couldn't find your answers") || document.body.innerText.includes("We couldn’t find your answers"),
        crashed: /Application error|client-side exception/i.test(document.body.innerText),
      })`,
    });
    state = r.result.result.value;
    if (state.crashed || (state.name && state.mobile && state.timeframes)) break;
  }
  await c.send("Page.removeScriptToEvaluateOnNewDocument", { identifier: result.identifier });
  const ok = state.name && state.mobile && state.timeframes >= 4 && !state.crashed && !state.noAnswers && !errors.length;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${name}: name ${state.name}, mobile ${state.mobile}, timeframe options ${state.timeframes}` +
      (state.crashed ? ", PAGE CRASHED" : "") +
      (state.noAnswers ? ", answers not found" : "") +
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
  console.log(`Checking ${BASE}/get-my-estimate`);
  for (const [name, answers] of Object.entries(SAMPLES)) {
    if (!(await checkSample(c, name, answers))) allOk = false;
  }
  c.close();
} catch (err) {
  console.error("FAIL ", err.message);
  allOk = false;
} finally {
  browser.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
process.exit(allOk ? 0 : 1);
