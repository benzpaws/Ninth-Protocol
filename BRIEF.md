# BRIEF — The Revamp

Read `CLAUDE.md` first.

## What we're building

We are migrating the existing vanilla HTML/CSS/JS Ninth Protocol microsite to **Astro + TypeScript + Tailwind**, deploying to **GitHub Pages**, and elevating the design execution to match the level of a private bank's digital touchpoint.

The current site is good. The revamp is not because it's bad — it's because the firm charges $500 minimum and serves people who fly Falcons. The site needs to feel like it was built by someone who has been in those rooms.

---

## Sequenced milestones

Build this in five distinct sessions, each one a clean commit. Do not start the next milestone until the previous is reviewed and committed.

### Milestone 1 — Astro foundation ✓ shipped 2026-05-23

Scaffold the project. Make it deploy. No design work yet.

- `npm create astro@latest` with TypeScript strict (`astro/tsconfigs/strict`) — landed on Astro `^6.3`
- Configure `astro.config.mjs` for the apex custom domain `ninthprotocol.eu` (`site` only, no `base`)
- Set up Tailwind v4 via `@tailwindcss/vite` with brand color tokens, font families, and a typography scale declared in a `@theme` block in `src/styles/global.css` (no JS config file)
- Add Cormorant Garamond, Inter, JetBrains Mono via `<link>` tags with preconnect
- Create `.github/workflows/deploy.yml` using `withastro/action@v3` + `actions/deploy-pages@v4` (modern Pages artifact path; no `gh-pages` branch). Requires GitHub Pages "Source" set to **GitHub Actions**.
- Add `public/CNAME` containing `ninthprotocol.eu`
- Add `public/.nojekyll`
- Verify the placeholder Astro site is reachable at `https://ninthprotocol.eu`
- Commits: see `M1_DONE.md`

### Milestone 2 — Component port (visual parity, not improvement)

Translate the existing site to Astro components, preserving visual output exactly.

- Read existing `index.html`, `styles.css`, `script.js` carefully — understand every detail before refactoring
- Break into Astro components:
  - `Layout.astro` — `<head>`, fonts, PWA meta, body shell, top bar, footer
  - `TopBar.astro` — fixed top bar with NP mark, brand name, nav, mobile menu trigger
  - `Drawer.astro` — mobile menu slide-out
  - `Hero.astro` — §I Identity section (motto, mark, CTAs)
  - `Model.astro` — §II Model section (comparison, transparency, fee panel)
  - `FeePanel.astro` — the two-tier fee callout (reusable)
  - `Capabilities.astro` — §III Capabilities (four cards)
  - `Contact.astro` — §IV Contact section (channels + form toggle)
  - `Form.astro` — the inquiry form behind the toggle
  - `Footer.astro` — closing band
- Move all CSS into Tailwind utilities, with custom CSS only where Tailwind isn't expressive enough (background SVGs, custom keyframes)
- Use CSS custom properties for brand colors so they're swappable from one place
- Use TypeScript everywhere, no `any` types
- Preserve all the IntersectionObserver-based bidirectional animations exactly (it's an island that needs `client:load`)
- Verify side-by-side: open the old site and the new one in two browser windows, scroll both — should look identical
- Commit: "feat: port site to Astro components with visual parity"

### Milestone 3 — Typography and spacing pass

The first design improvement. No new features. Just refinement.

- Bump body type from current `15–17px` to `19–20px` on desktop, `17–18px` on mobile
- Bump display headlines: hero motto to `clamp(56px, 9vw, 140px)`, section headlines to `clamp(48px, 7vw, 100px)`
- Generous line-heights: `1.55–1.65` for body, `0.95–1.05` for display
- Use `font-feature-settings: 'kern', 'liga', 'ss01'` for Cormorant ligatures (true italics, swash variants where the font supports them)
- Replace any bold weights in display copy with italic — bold is for UI labels only
- Letter-spacing: `-0.025em` to `-0.035em` on display sizes, `0.005em` on body, `0.2em–0.5em` on mono caps
- Open up vertical rhythm: each section's top padding should be at least `120px` desktop, `80px` mobile
- Audit every viewport for "feels cramped" moments — anywhere two elements are within 24px of each other on desktop, ask if they should be further apart
- Commit: "refactor: elevate typography and vertical rhythm"

### Milestone 4 — Motion rebuild

Replace the hand-rolled IntersectionObserver animations with GSAP. Keep the bidirectional behavior but make it feel cinematic.

- Install GSAP and ScrollTrigger
- Build a single animation module: `src/scripts/motion.ts`
- Animations to implement:
  - **Hero entrance**: NP mark scales from 0.85 to 1.0 with cubic-bezier(0.16, 1, 0.3, 1), 1200ms, then wordmark letters stagger in 50ms apart, then gold rule draws from 0 to 100px width, then motto lines mask-reveal from bottom one at a time with 200ms stagger
  - **Section reveals (bidirectional)**: each `[data-anim]` element rises 32px and fades from 0 to 1 when entering, mirrors out the way it came when leaving in either direction
  - **Reveal lines for headlines**: mask-clip from below, line-by-line, 200ms stagger
  - **Gold rules**: scaleX from 0 to 1, transform-origin left, 1000ms
  - **Background NP marks**: subtle parallax via `gsap.to(mark, { y: -100, scrollTrigger: { scrub: 1 }})`, 0.15× scroll speed
  - **Capability cards**: indent slightly on hover (12px left padding), gold rule grows in width, 600ms ease-out
- All durations 600–1200ms range, no exceptions
- Respect `prefers-reduced-motion` — if user prefers reduced motion, no animations run, no parallax, elements appear in their final state instantly
- Commit: "feat: rebuild motion with GSAP"

### Milestone 5 — The elevation pass

Now the real upgrade. Once the foundation is solid, add the details that lift it.

#### Visual additions

- **Custom cursor on desktop only**: a small gold dot, 8px, that becomes a 32px gold-outline circle when hovering interactive elements. Smooth follow with lerp 0.15. Hide on touch devices entirely.
- **Subtle gold particle field in the hero**: 8–12 gold dots, opacity 0.1–0.3, slowly drifting (3–8px movement over 8s, easing in and out). Not floating "sparkles" — more like specks of dust caught in a private library's window light. Use canvas, not DOM elements.
- **Ambient page transitions**: when scrolling from one section to the next, the next section subtly previews — a gradient bleed at the join, not a hard line. Use ::after pseudo-elements with gradient backgrounds.
- **Cinematic section openers**: each section's title block (article label + display headline + gold rule) appears in this order: article label fades up (200ms), short pause (150ms), headline mask-reveals line by line (300ms each), pause (200ms), gold rule draws (800ms). The total opening sequence lasts ~2 seconds and feels deliberate, not eager.
- **Corner brackets on key panels** (fee panel, comparison cells): already present in current design — refine to 1.2px stroke, 22px length, slightly darker gold at the corners.
- **A serif numerator/article system**: every section's number (§I, §II) is rendered as italic Cormorant in gold, with a hairline mono caps label beside it ("IDENTITY", "THE MODEL", etc.) — current implementation is good, audit for spacing consistency across all four sections.

#### Trust signals (non-cheesy)

- **A "Mandate Reference" number** generated client-side per session, displayed discreetly in the contact form area — e.g. `Reference: NP-9XKQRT`. Mono caps, 10px, gold. Communicates "this is a serialized inquiry" not "we have a CRM."
- **Footer detail**: instead of "© 2025 Ninth Protocol", expand to: `© 2025—2026  ·  Ninth Protocol OÜ  ·  Estonia  ·  International Holding Entity  ·  Classification: Private`. Mono caps. Reads as a colophon.
- **Tiny "Held in confidence" stamp** on the form: italic Cormorant, gold-line color, with a hairline rule above. Not a trust badge, just a quiet sentence.

#### Performance pass

- Audit and crush every kilobyte. The site should be under 400KB on first viewport (excluding fonts).
- Inline critical CSS, defer the rest.
- Lazy-load anything below the fold.
- Use `loading="lazy"` on every image below the fold.
- Compress the NP background watermarks aggressively — they're at 4% opacity, the source doesn't need to be high-res.
- Run Lighthouse on mobile and desktop. Anything below 95 in Performance is a failure; anything below 100 in Accessibility, Best Practices, or SEO is a failure.

#### Accessibility audit

- Run axe-core on every page
- Tab through the entire site with keyboard only — every focusable element should be reachable, every focus state should be visible (2px gold ring, 2px offset, 1px transition)
- VoiceOver test on macOS: read the entire page top to bottom, verify it makes narrative sense aurally
- Color contrast: every text-on-background combination is AAA for body, AA minimum for UI labels

#### Final polish

- Open Graph image: 1200×630 indigo card with the gold NP monogram centered, motto in italic gold, "NINTH PROTOCOL" mono caps at the top, generated as a static PNG at `public/og-image.png`. The card preview when the URL is shared anywhere.
- Favicon set: 16, 32, 48, 180 (apple-touch), 192, 512 — all gold NP on indigo
- Site title in tabs: "Ninth Protocol — Private Procurement"
- Lang attribute on `<html>`: "en"
- Skip-to-content link, visually hidden until focused

Commit: "feat: elevation pass — motion, trust signals, performance, a11y"

---

## What to ship at the end

- A live site at `https://ninthprotocol.eu`
- Lighthouse mobile: 100 / 100 / 100 / 100
- Full keyboard navigability
- Installable to home screen on iOS and Android
- Open Graph preview that looks like a private bank's
- Source code clean, typed, commented where needed
- A single `README.md` explaining how to develop locally and how deployment works

## What we are NOT doing

- Multi-page expansion (Insights/About/Cases) — single page only
- Blog
- Newsletter signup
- Live chat
- Cookie banner (no cookies set, so none needed)
- Analytics (privacy positioning > analytics)
- A "Book a Consultation" flow
- Pricing tiers with feature comparison
- Testimonials
- Press logos
- A "Our Team" section
- Anything beyond the four sections

Stay disciplined.
