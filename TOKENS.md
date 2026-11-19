# Tokens: Lior style (proposed for the library)

Measured from the live DOM of https://liorpozin.com/ at 1440×900 on 2026-11-18 (computed
styles, not by eye). These become the new library variables / text styles for the redesign.
Names are proposals; Olena approves the names before the Figma transfer.

## Colour
| Token | Value | Where on the reference |
|---|---|---|
| `lp/bg` | `#181919` (rgb 24 25 25) | page background, most sections |
| `lp/bg-light` | `#E7E7E6` (rgb 231 231 230) | the one light section (Mission) |
| `lp/surface` | `#FFFFFF` @ 10% | cards (timeline card) on `lp/bg` |
| `lp/overlay` | `#000000` @ 48% | dark wash over photos in media cards |
| `lp/text` | `#FFFFFF` | text on dark |
| `lp/text-muted` | `#FFFFFF` @ 40% | dimmed big lines (stats not in focus), pill borders |
| `lp/text-on-light` | `#000000` | text on `lp/bg-light` and on the sand button |
| `lp/accent` | `#D9BD9A` (sand) | primary button fill + border, small accents |
| `lp/accent-hot` | `#FF4C24` (orange) | required-field `*`, very small highlights only |
| `lp/divider` | `#FFFFFF` @ 20% | 1px row dividers |
| `lp/border-strong` | `#FFFFFF` | outline buttons, input underline |

## Type (fonts: JetBrains Mono for almost everything, Inter 800 for small section labels)
| Style | Font / size / line / weight / tracking / case | Reference use |
|---|---|---|
| `lp/display` | Mono 80 / 84 / 600 / −2.4 / UPPER | "FORBES 30 UNDER 30" stats |
| `lp/h1` | Mono 60 / 63 / 600 / −2.4 / UPPER | "BUILD WITH LIOR" |
| `lp/h2` | Mono 41.6 / 45.76 / 800 / −1.25 / UPPER | card titles "FIT IN OR FLY?" |
| `lp/label` | Inter 16 / 24 / 800 / 0 / UPPER | "MISSION", "IN THE MEDIA" |
| `lp/body` | Mono 16 / 24 / 400 | paragraphs |
| `lp/button` | Mono 14 / 21 / 700 / +0.14 / UPPER | button and card-caption text |

Also on the reference (decorative, not proposed as styles): 144 and 160 px numbers, 32 px mission
typewriter, 12 px copyright. The rule «≤5 text styles, nothing under 14px» is applied per screen
of our landing.

## Components
- **Button / primary:** sand fill `lp/accent`, black text `lp/button`, padding 12/16, height 41,
  border 1.5 px same colour, **radius 0**, gap 8 to a "→" arrow.
- **Button / outline pill:** transparent, white text, border 1.5 px white, **radius 999**, same
  padding/height.
- **Button / ghost (nav link):** transparent, border 1.5 px transparent, padding 12/16.
- **Arrow button (slider):** 28×28, border 1.5 px white, radius 0.
- **Input:** no box, 1 px white underline, padding 16/0, Mono 16; label above in `lp/button` style
  with an `lp/accent-hot` asterisk.
- **Card:** `lp/surface` fill, padding 48, gap 16, radius 0.
- **Row list:** 1 px `lp/divider` bottom border, padding 40/0.

## Layout
- Page gutter 32 px; content width 1376 at 1440.
- Header 77 px high, transparent over the page, sticky.
- Section padding 112 or 160 px top/bottom; hero 80.
- Corners are square everywhere except pills.

## 2026-11-18 — replaced by the «Lior Pozin» design system
Source: artifact https://claude.ai/artifact/Uw7ZSSjKdXPPbE75dzSAQt (`project/tokens.css`). Olena approved
items 1–7: Display-S 80/1.1/800 −3%, Headings-ExtraBold-H1 56/1/800 −3%, Body-Regular-16 16/1.5 −1%,
Button-Medium 14/1.4/700 −1% uppercase (not Button-Small 12 — 14px floor), secondary text tint-80,
hairlines 1px in `theme-border` #686868, cards tint-5 + border tint-5, primary hover sand-dark #C89B6F.
`hot #FF4C24` removed (not in the DS). Overlay 48% → shade-50. Open: Q1 Lior photos, Q2 Inter, Q3 voice.
