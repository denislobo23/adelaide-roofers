# Adelaide Roofers — Brand Kit

A simple, consistent kit built around the roofline mark already used on the site.

## The mark
A house/roofline forming a peaked roof with an open doorway — "a roof over your
home." It's the same mark used in the site header, so everything stays consistent.

## Files (in this kit)

### Logos — `public/brand/`
| File | Use |
|---|---|
| `logo-horizontal.svg` | Primary logo, light backgrounds (website, letterhead, quotes) |
| `logo-horizontal-dark.svg` | Primary logo, dark backgrounds |
| `logo-stacked.svg` | Narrow / square-ish spaces |
| `logo-mark.svg` / `logo-mark-paper.svg` | Mark only (clay / off-white) |
| `logo-square-clay.svg` + `-clay-1024/512.png` | **Primary avatar** — Google Business Profile, social |
| `logo-square-ink.svg` + `-ink-1024/512.png` | Dark alternative avatar |
| `logo-square-paper-1024.png` | Light alternative avatar |
| `logo-icon-512.png` | General app/PWA icon |
| `favicon-48.png` | Fallback favicon raster |

### Favicon — `app/`
| File | Use |
|---|---|
| `icon.svg` | Browser-tab favicon (Next.js detects this automatically) |
| `apple-icon.png` | Home-screen icon on iPhones/iPads (auto-detected) |

Just drop `icon.svg` and `apple-icon.png` into your `app/` folder — Next.js wires them
up with no code change. Clear `.next` and restart to see the tab icon.

## Colour palette
| Name | Hex | Role |
|---|---|---|
| Ink | `#1B2430` | Primary text, dark backgrounds |
| Clay | `#BC5B3A` | Accent, the mark, calls-to-action |
| Trust | `#2E6B52` | Secondary accent (reassurance) |
| Steel | `#4A6076` | Muted text, secondary UI |
| Mortar | `#E7E2D8` | Borders, dividers |
| Paper | `#FAF8F4` | Page background, light surfaces |

## Type
- **Bricolage Grotesque** (weights 700/800) — display, headings, the wordmark. Free on Google Fonts.
- **Inter** (400/500) — body text and everything else. Free on Google Fonts.

## Usage notes
- Keep clear space around the logo of at least the height of the mark's doorway.
- Minimum size: don't render the horizontal logo below ~120px wide, or the mark below 20px.
- For Google Business Profile, upload `logo-square-clay-1024.png` (it works cropped to a circle).
- Don't recolour the mark outside the palette, stretch it, or add effects/shadows.
- On photos, use the dark or light square avatar so the logo stays legible.
