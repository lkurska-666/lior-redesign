# Brief: BYS redesign in the Lior Pozin style (landing + funnel)

Confirmed by Olena 2026-11-18 (with her corrections). Status: Phase 1 done, waiting for "так".

## Story
As a new user arriving at Build Your Store, I want a modern, consistent look from the landing
page through the end of the funnel, so that I trust the product and want to keep going.

## Scope and order
1. **Part 1: landing page** buildyourstore.ai. Desktop first, then approval, then 768 / 390.
2. **Part 2: the whole funnel** app.buildyourstore.ai. Starts only after the landing is approved.

Only the look changes: content, steps and functionality stay the same.

## Visual direction (Olena's correction 2026-11-18)
- **This is a separate project: it must look like the reference** https://liorpozin.com/, not
  "the BYS design system with a mood". The design-rules line «a reference is a mood, translated
  into our tokens» **does not apply here** (exception granted by Olena).
- **New tokens will be added to the library** for this style. Values come from the live
  reference DOM (measured, not eyeballed), e.g. seen so far: background `#181919`,
  JetBrains Mono + Inter, white / white 40%, accent `#FF4C24`, sand `#D9BD9A`. The full list is
  extracted in Phase 2 and becomes `TOKENS.md` in this folder.
- The other rules still apply: ≤5 text styles per screen, 4 sizes (max 5), ≤3 weights,
  nothing under 14px, no invented values, containers do not jump between states.

## Content
- **Hero: text only from Figma** `BfdPwlksaf5KbStFc4MN39`, node `7607:2842` (the layout and
  the light gradient of that hero are NOT used):
  - Headline: "Get a FREE AI-built Shopify store in minutes" ("FREE" highlighted)
  - Body: "A fully optimized Shopify store with winning products, ready-to-sell product pages
    and private dropshipping courses"
  - CTA: "Build my FREE store" → · under it: "No credit card. Yours forever."
  - Trust row: Shopify partners · Shopify coach badge · "Join over 1M+ happy customers"
  - Header: logo · Features / Solutions / Tools (dropdowns) · Glossary · Login · CTA
- **Other sections: the same content as live buildyourstore.ai** (11 after the hero):
  "Your Shopify store. Built by AI. Live in Minutes." · How it works · Winning products ·
  High converting & customizable theme · Ready to sell pages · Receive .store domain for FREE ·
  What customers say · What do entrepreneurs say about Build Your Store? · Created with us ·
  FAQ · Get your FREE AI store now.
- No new copy, numbers or prices.

## Partner branding → Part 2 (funnel)
- Acceptance criterion: "Partner branding (logo and colors, as with EZStore) keeps working on
  top of the new design." Most likely concerns the funnel, not the main landing.
  **Moved to Part 2**; Olena is waiting for the manager's answer (2026-11-18). Landing work
  goes on meanwhile.

## Funnel (Part 2, later)
Prod order: claim → niche → banners → Shopify activation → store type ($97/$47) →
"Make your store unique" + loader → AutoDS → store ready → "How did you hear about us" →
domain → course; CreateUGC still live.

## Not an A/B test
A redesign, no control or metric. (AD-6246 showed the look alone is not a conversion lever.)

## Devices
Desktop ≥1144 first; 768 and 390 after the desktop is approved.

## Who sees it
Manager: artifact with a device switch. Developers: Figma from the library + dev notes.

## Open
- Q1: The Figma hero has the eyebrow "LIOR POZIN Invites you to" and Lior's photo. Main
  landing: keep them or drop them? (Proposed: drop the eyebrow; image to decide in Phase 2.)
- Q2 (manager, Part 2): does partner branding apply to the landing at all; EZStore screenshot /
  which elements a partner recolours.
- Q3: Domain in the knowledge base says storebuild.ai; the task says buildyourstore.ai —
  update the knowledge to buildyourstore.ai.
- Q4 (Part 2): is prod on the old or the new mobile UI (unresolved in DECISIONS)?
