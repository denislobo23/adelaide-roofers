# Solar roof auto-fill: plan

Status: plan only, not built. Saved 2026-11-26.

## Decisions so far

1. **Terms.** The Solar API terms limit use to solar and energy systems. The owner decided to go ahead knowing the risk. The feature has a one-setting off switch: `SOLAR_AUTOFILL_ENABLED`.
2. **No pre-selected answers.** The Solar figure is only a suggestion: "Satellite data suggests your roof is about 210 m²" with a "Use 210 m²" button. The slider stays unanswered until the customer taps that button or sets it themselves. Continue unlocks only after one of those.

Still open:

- `roofSizeFromSatellite` flag: decided, yes (saved as `leads.roof_size_from_satellite`).
- Which address should the live smoke test use?

## How it works

1. **On/off switch.** The feature only runs when `SOLAR_AUTOFILL_ENABLED=true`. It's off by default, and switching it off in Vercel turns it off everywhere at the next deploy.
2. **When the call happens.** After the customer picks a job type with a size step (restoration, painting or replacement). That's on /calculator, including when the address came from the homepage box. It also needs an address picked from the suggestions where OpenStreetMap had the house number, so the location is the house itself. Street-only picks (where we put the typed number back) and hand-typed addresses never call Solar. Repairs, leaks and gutters never call it.
3. **Server call.** Our server calls Google's Solar API (`buildingInsights:findClosest`) for that location.
   - It sends `requiredQuality=MEDIUM`, since Adelaide only has medium-quality coverage.
   - It gives up after 3 seconds.
   - The key (`GOOGLE_SOLAR_API_KEY`) stays on the server.
4. **Using the answer.**
   - **Size:** the total roof surface area (`solarPotential.wholeRoofStats.areaMeters2`), rounded to the nearest 10 m².
   - **Discarded if:**
     - it's outside the slider's 80–500 m² range;
     - Google's building is more than about 25 m from our point;
     - the imagery quality is below MEDIUM.
   - **Shape:** suggested only in clear cases:
     - **flat or skillion:** every roof section is under 10° pitch;
     - **gable:** the 2 main sections face opposite directions (about 180° apart) and make up at least 85% of the area;
     - **hip:** 4 main sections face 4 directions about 90° apart and make up at least 85% of the area.

     Dutch gable, multi-level and anything untidy get no suggestion.
5. **Size step: a suggestion, never pre-selected.**
   - **The slider starts unanswered,** exactly as today, and Continue stays locked.
   - **When a figure is available,** a card appears above the slider:
     - "Satellite data suggests your roof is about **210 m²**"
     - a **[Use 210 m²]** button
     - small print: "Source: Includes solar data from Google"
   - **Tapping the button** sets the size to 210 m² and unlocks Continue. The customer can still move the slider afterwards. If they set the slider themselves without tapping the button, that's fine too.
   - **"Not sure? Use a typical 200 m²"** stays below the slider.
   - **Timing:** if the figure arrives after the customer has already chosen a size, the card still appears but changes nothing unless they tap it.
   - **Live price:** it stays locked until the customer actually chooses a size, so nothing is answered in advance.
6. **Shape step.** If there's a clear suggestion, the matching card shows a small "Looks like this from satellite" label. Nothing is pre-selected.
7. **Falling back.** If there's no data, an error, a timeout, a limit hit, or the switch is off, no card appears. The step looks exactly as it does today, with no error message.
8. **What's stored.**
   - **The lead:** only `roofSizeM2`, whatever the customer chose. No Solar data, pitch, sections or coordinates go into the lead, PDF, emails or logs.
   - **Flag (decided: yes):** `roofSizeFromSatellite: true`, set only if the customer tapped "Use 210 m²" and didn't move the slider afterwards; false if they set the size themselves; empty for jobs with no size step. It contains no Google data and would show how often the suggestion gets accepted.

## Limits

- **Daily cap** (`SOLAR_DAILY_LIMIT`, default 50 calls per day): counted in a Supabase table, one row per day in Adelaide time, so it holds across all of Vercel's server copies. If the count can't be checked, no Solar call is made.
- **Billing backstop:** Google Cloud only offers per-minute Solar quotas (not a daily one), so `SOLAR_DAILY_LIMIT` is the real cap. The owner sets a $10 billing budget alert in Google Cloud as a warning.
- **Per visitor:** at most 3 calls per 10 minutes, and only from our own pages.
- **No caching** across customers. The figure lives only in that customer's browser tab.
- **Cost:** 50 calls a day is about 1,500 a month, within Google's free monthly allowance. Check the current pricing page before turning it on.

## Files

**New**

- `lib/solar.js` (server only): the Google call, the time limit and the quality setting.
- `lib/roofFromSolar.js`: rules for size, distance and shape, with no network calls, so they can be tested.
- `lib/solarBudget.js`: the daily cap via Supabase.
- `supabase/solar_usage.sql`: the table and counting function, to run once in Supabase's SQL editor. It keeps 90 days of counts.
- `app/api/roof-estimate/route.js`: `GET ?lat=&lon=`. It checks the switch, the visitor limit and the daily cap, then calls Solar. It returns `{ areaM2, shape }`, or `{}` for "no suggestion".

**Changed**

- `lib/addressRoute.js`: the visitor guard takes per-route limits.
- `lib/nominatim.js`: each suggestion says whether OpenStreetMap had the house number.
- `lib/formatAddress.js`: an address where we added the typed number back counts as street-only.
- `components/AddressSearch.jsx` and `components/HeroCalculatorMini.jsx`: pass that flag along with the address.
- `components/RoofCalculator.jsx`: the call after the job type is chosen, the suggestion card and "Use … m²" button on the size step, and the shape label.
- `app/api/send-estimate/route.js`: saves `roof_size_from_satellite` (retrying without it if the column isn't there yet) and shows the roof-size source in the lead email.
- `app/privacy/page.js`: one line saying that for some quotes, the location of the chosen address is sent to Google to estimate roof size.
- `.env.local.example`: `GOOGLE_SOLAR_API_KEY`, `SOLAR_AUTOFILL_ENABLED=false`, `SOLAR_DAILY_LIMIT=50`.
- `scripts/smoke-estimate.mjs`: the new checks below.

## Tests

**Unit tests** (saved sample responses, no real calls):

- 213.4 m² gives 210 m²; 75 m² and 620 m² give no suggestion.
- A building more than 25 m away is rejected; one 10 m away is accepted.
- LOW quality is rejected; MEDIUM is accepted.
- Shapes: all sections under 10° gives flat; 2 opposite sections give gable; 4 sections 90° apart give hip; mixed or minor-section roofs give no suggestion.
- Missing or partial responses give no suggestion and no crash.
- An address where we added the typed number never triggers a call; one where OpenStreetMap had the number does.
- The daily cap refuses call 51, and refuses when Supabase errors.
- The route returns `{}` when the switch is off, the key is missing, or the visitor limit is hit.

**Smoke tests:**

- **Mocked suggestion of 210 m²:**
  - the card and "Use 210 m²" appear;
  - the slider is unanswered and Continue is locked;
  - tapping the button unlocks Continue;
  - the test lead's saved size is read back as 210.
- **Ignoring the card:** setting the slider to 150 instead saves 150.
- **Mocked failure or switch off:** the size step looks exactly as it does today.
- **Street-only pick:** no `/api/roof-estimate` call is made.
- **Live, only with `SMOKE_SOLAR_LIVE=1`:** one real call per run, which counts toward the daily 50. Use an address the owner is happy to test against, ideally their own or a public building with Solar data.

## Rollout

1. Build with `SOLAR_AUTOFILL_ENABLED=false`. Run the tests, lint and smoke tests, and show before/after screenshots for approval.
2. The owner runs `supabase/solar_usage.sql` in Supabase and sets a $10 billing budget alert in Google Cloud.
3. Commit and deploy with the switch still off. The site behaves exactly as it does now.
4. Turn the switch on in Vercel and redeploy. Then run the live smoke test with `SMOKE_SOLAR_LIVE=1` and one test address.
