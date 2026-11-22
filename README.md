# BYS / Lior — Concept A, desktop refinement

Active direction: **A2 — Editorial Features**, refining only the four-feature section. A2 uses the large text list selected by the user and the neutral product visuals from the other explorations. On desktop, the list and a single picture share one sticky stage: scrolling or clicking selects the matching description and picture together. Per the latest decision, work is limited to desktop. Responsive work follows the desktop design decision.

Open **http://localhost:4182/index.html** for the working preview, or `/concept-a2.html#overview` for the selected feature section. The review shell always renders a 1440px desktop viewport and scales it to fit the available space. Concept and mobile-width selectors have been removed.

B and C are retained as previous explorations and are not being developed. The former comparison shell is archived in `review/previous/comparison-v1.html`. `/concept-a.html` retains the earlier row layout; `/concept-a2.html` is the active refinement.

## Run

No build step or runtime dependencies:

```sh
python3 -m http.server 4182 --directory concepts
```

## Shared implementation

- `concepts/content.js` retains the existing landing copy.
- `concepts/landing.js` renders the same sections and interactions for all concepts.
- `concepts/particle-cta.js` animates the white point-cloud sphere in A2’s feature CTA, pausing offscreen and respecting reduced motion.
- `concepts/landing.css` defines the shared visual language and responsive concept treatments.
- `concepts/assets/product/README.md` records the original asset and exact crop used for each product image.
- `review/previous/` preserves the previous HTML source before this redesign.

The four feature descriptions, order, hero copy, CTA text and existing Shopify pricing note are preserved. Registration and login destinations were recovered from the live landing; store theme links retain their original niche IDs (1, 5, 3, 4, 2). Native dropdowns, mobile navigation, testimonial/store carousels, and keyboard-accessible FAQ disclosure remain functional. No funnel screens were modified.

## Visual references

- Primary: https://liorpozin.com/
- Additional composition reference: https://www.squarespace.com/
- Destination source: https://www.buildyourstore.ai/bys_lp/fb-lior-1/

## Previous verification

`review/verification.json` records the nine concept/width checks (1440, 768, 390). Screenshots are in `review/screenshots/`. Checks cover copied feature content and order, real link destinations, image loading, horizontal overflow, heading/portrait overlap, FAQ, carousel navigation, mobile navigation, and the former comparison width controls. These results describe the previous multi-concept pass.

With Playwright available, rerun from the project directory:

```sh
node review/verify.cjs
```

Optional environment variables: `PLAYWRIGHT_MODULE` for a preinstalled Playwright package, and `CHROMIUM_PATH` for an existing Chromium executable.

## Current A2 hero

The main A2 hero uses a code-rendered black storefront with a modular product grid, a larger SVG pointer, and an enlarged illustrative rising sales chart. The editing badge has been removed. The storefront and chart are aligned without tilt, and the extra background panel has been removed. All layers sit below the portrait’s phone-holding hand. No sales totals or revenue claims are shown in this illustration. Earlier generated 3D object studies remain separate and are not used by A2.

## Current A2 domain illustration

The domain feature uses a black-and-beige headphone product preview with a large custom `.store` address and a separate **FREE FOR 1 YEAR** label. The frame retains the same 6:5 dimensions as the other three feature illustrations. The generated transparent product asset and its prompt are saved in `concepts/assets/product/domain-headphones-v1.png` and the adjacent Markdown file. Earlier concepts retain their original domain compositions.
