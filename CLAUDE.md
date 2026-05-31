# Ninth Protocol — Project Brief for Claude Code

> This file is read automatically by Claude Code at the start of every session.
> Read it in full before making any change.

---

## 1. What this project is

**Ninth Protocol** is a fee-only private procurement firm registered as Ninth Protocol OÜ in Estonia. It sources rare and ordinary luxury items — cars, watches, aircraft, experiences, art — for UHNW individuals and family offices. The founder is Jihan Rughooputh (26, Mauritian).

This codebase is the firm's **public-facing microsite**, distributed via QR codes printed on Jihan's business cards. The site's single job: convert a 10-second QR scan from someone at a private dinner, members' club, or family-office boardroom into either an email or a WhatsApp message to Jihan.

It is **not** a marketplace, e-commerce site, or lead funnel. It is a credentialing document in web form.

## 2. The audience

- Ultra-high-net-worth principals (private wealth, family-office heads, founders post-exit)
- Family-office chiefs of staff, private bankers, T&E lawyers — people who refer clients to firms like this
- Existing clients returning to the site for the contact details

Assume the visitor: opened the site on a phone, has 8–15 seconds before they decide whether to keep reading, judges credibility from typography and restraint, and will close the tab the instant something feels cheap, salesy, or templated.

## 3. The brand

### Voice and register

Private-banking, not luxury-retail. The reference is **Coutts**, not Harrods. **Edmond de Rothschild**, not Vistajet's homepage. **Sotheby's editorial**, not Sotheby's checkout.

- Prose, never marketing copy
- Refined English, full sentences, no jargon, no "leverage / synergy / ecosystem / curated / bespoke / world-class / seamless / solutions / offerings"
- No exclamation marks
- No emojis anywhere
- No hashtags, no calls to "follow us"
- No social media icons
- No testimonials with photos of smiling clients
- No "trusted by" logo strips
- Where uncertainty exists, prefer understatement

### Colors

```
Deep Indigo:    #2A2354     (primary brand)
Indigo Deep:    #1B1638
Indigo Night:   #0E0B22     (hero background, deepest)
Indigo Ink:     #07051A
Indigo Soft:    #3A3370

Muted Gold:     #C0A11E     (accent — used sparingly)
Gold Soft:      #D4B84A
Gold Deep:      #8F7615
Gold Line:      rgba(192, 161, 30, 0.22)

Paper:          #F8F5EF     (light section bg)
Paper Warm:     #EFE9DD
Off-white:      #F5F2EC

Ink:            #15131F
Ink Soft:       #3A3548
Ink Faint:      #6B6478
```

Gold is the accent — never the dominant color. Indigo carries the visual weight. White space carries the rest. If gold appears more than three times in a viewport, it's already too much.

### Typography

- **Cormorant Garamond** — display, body, motto. The personality of the brand.
- **Inter** — UI labels, buttons, navigation. Geometric, modest.
- **JetBrains Mono** — metadata, reference numbers, article labels (§I, §II…). Communicates "this is a document, not marketing."

All three are Google Fonts. Use `display=swap` and preconnect.

### Logo

The NP monogram exists in three forms:
- `assets/np-mark.svg` (vectorized from the real logo, ~1KB, fill is `#C0A11E`)
- `assets/np-mark.png` (transparent PNG fallback, 400×340)
- Other formats for icons/social are in `assets/`

Always use the SVG with PNG fallback via `<img onerror>`. Never recreate the logo in CSS.

### Motto

**"For those who answer to no one."**

Display sized. The italic "answer to no one" appears in gold; the rest in off-white. This is the brand's central line — it appears in the hero of the site and on the cover of all internal documents.

## 4. The fee structure (canonical, do not modify)

The site publishes the fee structure transparently — this is the firm's central differentiator versus commission-based concierge firms.

| Tier | Acquisition value | Fee |
|------|-------------------|-----|
| **Tier I** | $10,000 – $250,000 | USD 500 flat, per acquisition |
| **Tier II** | Above $250,000 | 0.5%–1.0% of acquisition value, agreed in advance |

Below the tiers, always: *No commissions · No markups · No third-party kickbacks*

Minimum acquisition value: $10,000 USD.

The §II Model section uses a transparency intro statement above the fee panel:
> *Most procurement firms hide their margins inside supplier commissions. We publish ours — in full, before any mandate begins.*

## 5. Site structure (4 sections)

| § | Title | Purpose |
|---|-------|---------|
| I | Identity | Hero with motto, NP monogram, immediate Email + WhatsApp CTAs |
| II | The Model | Comparison (Ninth Protocol vs commission concierges), transparency statement, fee panel |
| III | Capabilities | The four disciplines: Automotive & Aviation, Horology & Collectibles, Experiences & Access, Logistics & Project Direction |
| IV | Contact | Email + WhatsApp channels, optional inquiry form behind a toggle |

Each section is full-viewport on desktop. Hero is contact-forward — Email and WhatsApp buttons visible without scrolling.

## 6. Contact details

- **Email:** JRughooputh@ninthprotocol.eu
- **WhatsApp:** +1 437 249 0909 (international format `14372490909` for `wa.me` links)
- **Pre-filled WhatsApp message:** `Hello Ninth Protocol — I'd like to discuss a private mandate.`
- **Form fallback:** Web3Forms with `mailto:` fallback if the access key isn't configured

## 7. Tech stack (the revamp)

- **Astro** 6.x (currently `^6.3`) — static-only build, zero JS by default, opt-in islands
- **TypeScript** strict (`astro/tsconfigs/strict`) for all components and scripts
- **Tailwind CSS** v4 (`^4.3`) via `@tailwindcss/vite`, with brand tokens declared in a `@theme` block inside `src/styles/global.css` (no `tailwind.config.{js,ts}`)
- **GSAP** 3.x (`^3.15`) for the scroll-driven animations (replaces the IntersectionObserver hand-rolled version)
- **Lenis** for smooth scrolling — optional, only if it improves the feel
- **GitHub Actions** for build and deploy to GitHub Pages via `withastro/action` + `actions/deploy-pages` (Pages artifact, no `gh-pages` branch)
- **No** analytics, **no** cookie banner (no cookies set), **no** tracking pixels, **no** chat widgets

### Performance budget

- LCP under 2.0s on 4G
- First Contentful Paint under 1.0s
- Total page weight under 400KB (excluding fonts) for the entire hero viewport
- Lighthouse: 100 / 100 / 100 / 100 on mobile

## 8. What "elevation" means here (read before touching design)

The current site is already restrained. Elevation does not mean *adding more*. It means **removing what isn't earning its place**, and replacing functional elements with ones that feel like they cost more than they did.

The five marks of expensive-feeling sites in this register:

1. **Typography that breathes.** Generous line-height (1.5–1.7 for body, 1.0–1.1 for display), more letter-spacing on caps than feels comfortable, never letter-tracking on serif body, larger sizes than feel "safe" (display from 80–140px on desktop).

2. **One controlled accent color, used three times maximum per viewport.** Gold appears on: (a) the motto's italic, (b) one rule or corner detail, (c) one CTA or icon. Anywhere else, it pollutes. Indigo carries everything else.

3. **Whitespace that feels confident.** A button surrounded by 80px of nothing reads as more expensive than the same button hemmed in. The instinct to "fill the space" is the instinct that makes sites look cheap.

4. **Motion that's slow.** Premium UI moves at 600–1200ms with deep easing curves. Sub-300ms transitions feel anxious. Easing curves are cubic-bezier(0.19, 1, 0.22, 1) or similar — never `ease-in-out` defaults.

5. **Details signal care without announcing themselves.** Reference numbers in mono, article labels (§I, §II), corner brackets on key panels, hairline rules in gold-line opacity, italic-on-serif for emphasis instead of bold. The kind of thing that makes a private bank's annual report look like a private bank's annual report.

What makes sites cheap, in this register:

- Drop shadows on cards
- Animated gradients that move on hover
- Stock photography of "diverse business people"
- Hero videos of skylines, watches being unboxed, sports cars in slow motion
- Emojis in section headers
- Sparkle / shimmer / glow effects
- Bouncy spring animations
- Round-cornered buttons over ~6px radius
- "Trusted by" logo carousels
- Big "BOOK NOW" or "GET STARTED" CTAs
- Pricing tables with check marks in green
- Live chat bubbles in the corner

If you find yourself reaching for any of those, stop. They are the visual language of growth-hacked SaaS, not private wealth.

## 9. Animation principles

Scroll-driven, bidirectional, restrained.

- Section openers: text reveals from beneath a horizontal mask (mask-image clip), staggered by ~120ms per line
- Gold rules: draw from left to right with `scaleX` transform, 800ms, deep ease-out
- Hero motto: split by line, each line rises with a mask-clip reveal
- Cards and lists: minimal — opacity + 16px translateY, that's it
- Background NP watermarks: subtle parallax, 0.15× scroll speed, no rotation, no scaling

When scrolling back up, elements animate **out** the way they came in, mirrored. The page feels alive in both directions, not just on first scroll. The current vanilla-JS site does this with `is-in / is-out-up / is-out-down` classes — preserve this behavior in GSAP, since it's a real signature of the brand experience.

Respect `prefers-reduced-motion` everywhere. Reduced motion = no animations, no parallax, instant transitions.

## 10. Accessibility (non-negotiable)

- Color contrast: WCAG AAA for body text, AA minimum for UI
- All interactive elements keyboard-reachable, with visible focus states (gold ring, 2px offset)
- All images have meaningful `alt` text or `alt=""` if decorative
- Skip link to main content at top of page
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- No `<div onclick>` — only real buttons and links
- Form fields have explicit `<label>` elements, not placeholders-as-labels
- aria-labels on icon-only buttons
- Test with keyboard only: every action reachable

## 11. SEO / metadata

The site does NOT want to rank for "luxury procurement" or generic searches. It wants to be findable only when someone Googles "Ninth Protocol" by name (after meeting Jihan).

But: when the URL is shared via WhatsApp, iMessage, or email, the preview card matters.

- Open Graph title: "Ninth Protocol — Private Procurement"
- Open Graph description: "For those who answer to no one."
- Open Graph image: 1200×630 indigo card with the NP monogram in gold, the motto in italic gold, and "NINTH PROTOCOL" in mono caps — see `/assets/og-image.png` (generate if missing)
- No robots.txt blocking — let it be indexed, just don't optimize for it
- No structured data markup (no Schema.org for "LocalBusiness" — wrong register)

## 12. PWA configuration

The site is installable to home screen:
- `manifest.json` with name "Ninth Protocol", theme color `#0E0B22`, standalone display, gold NP on indigo icons (192/512/maskable)
- Apple meta: `apple-mobile-web-app-capable=yes`, `apple-mobile-web-app-status-bar-style=black-translucent`, `apple-mobile-web-app-title=Ninth Protocol`
- Safe-area insets respected: `env(safe-area-inset-top)` on topbar and sections, so content doesn't run under the iPhone notch in PWA mode

## 13. Deployment

```bash
# Build to ./dist
npm run build

# GitHub Actions workflow at .github/workflows/deploy.yml:
# - on: push to main
# - uses withastro/action@v3 (npm ci + astro build + uploads Pages artifact)
# - uses actions/deploy-pages@v4 to publish the artifact
# - no gh-pages branch involved; Pages source must be set to "GitHub Actions"
```

GitHub repo: `benzpaws/Ninth-Protocol`
Live URL: `https://ninthprotocol.eu`

Custom domain is the apex `ninthprotocol.eu`, pinned via `public/CNAME`. Site is served from the domain root — no project base path.

Astro config sets:
```js
export default defineConfig({
  site: 'https://ninthprotocol.eu',
  // no `base` — defaults to '/'
})
```

## 14. Files in the existing site (before revamp)

The existing GitHub Pages site is a vanilla HTML/CSS/JS implementation at the root of the repo:
- `index.html` — single file containing all four sections
- `styles.css` — the full stylesheet
- `script.js` — IntersectionObserver-based bidirectional animations + form handler
- `manifest.json` — PWA manifest
- `assets/` — logo SVG/PNG, app icons, lockups
- `.nojekyll` — tells GitHub Pages to serve files as-is

When migrating to Astro: **preserve the visual output exactly first**, then improve. Do not redesign during the migration. Redesign in a second pass once the Astro structure is proven equivalent.

## 15. What to never change without asking

- The motto: "For those who answer to no one."
- The fee structure: Tier I $500 flat / Tier II 0.5–1%
- The minimum: $10,000 USD
- The four capability headers
- The transparency statement (§II intro)
- The contact details (email, WhatsApp)
- The brand colors and font stack
- The site voice is first-person singular "I" throughout. "We", "our", and "us" used in first-person voice are not permitted anywhere on the site.
- Vignettes at /vignettes are explicitly framed as illustrative composites, not accounts of real transactions. This framing must be preserved in any future edits.

Everything else — animations, layout details, micro-copy, component structure — is open for improvement.

---

## Working with Claude Code: rules of engagement

1. Read this file in full before any session starts.
2. Read `BRIEF.md` for the specific elevation goals for this revamp.
3. Read `STYLE.md` for typography and spacing tokens in detail.
4. Read `CONTENT.md` for the exact published copy.
5. Ask before making changes that affect items in §15.
6. Prefer fewer, larger commits over many small ones — one commit per feature/section.
7. Run `npm run build && npm run preview` before committing.
8. Test on real mobile (or DevTools mobile emulation at 390×844) before declaring complete.
9. If a design instinct says "let's add more" — pause and revisit §8.
