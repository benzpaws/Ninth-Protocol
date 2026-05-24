# Milestone 2 — Done

**Date:** 2026-05-24
**Live URL:** https://ninthprotocol.eu

V1 ported to Astro at visual parity. All four sections (Identity, Model, Capabilities, Contact) plus chrome (Preloader, TopBar, MobileDrawer, Footer) render byte-equivalent to the archived V1, sourced from `src/content/site.ts` with V1 CSS lifted verbatim and remapped to the `@theme` `--color-*` tokens.

## Commits

Range: `0090b63..38fa14f` (6 commits)

| SHA | Message |
|---|---|
| `0090b63` | chore(m2): scaffold layout, content source, global tokens |
| `98c4ffa` | feat(m2): port HeroIdentity section + migrate to @tailwindcss/postcss |
| `abd2bc0` | feat(m2): port §II Model + FeePanel, wire IO reveal engine |
| `6502ab2` | feat(m2): port §III Capabilities + CapabilityCard |
| `9f8f157` | feat(m2): port §IV Contact + InquiryForm (Web3Forms + mailto fallback) |
| `38fa14f` | feat(m2): port chrome (Preloader, TopBar, MobileDrawer, Footer) + scroll engine |

## Stack confirmed working

| Package | Pinned |
|---|---|
| `astro` | `^6.3.7` |
| `tailwindcss` | `^4.3.0` |
| `@tailwindcss/postcss` | `^4.3.0` |
| `gsap` | `^3.15.0` (installed, unused — M4) |

Tailwind v4 wired via PostCSS (`postcss.config.mjs`) instead of `@tailwindcss/vite` — the Vite plugin was incompatible with Astro 6 + rolldown-vite and produced confusing "SITE not exported" rolldown errors. PostCSS swap fixed it. `@theme` tokens declared in `src/styles/global.css`; no `tailwind.config.{js,ts}`.

Bidirectional reveal engine reproduces V1 `[data-anim] / .is-in / .is-out-up / .is-out-down` behavior via `IntersectionObserver` in `Base.astro`. Scroll handler is a single rAF-throttled callback (progress bar + topbar hide-on-scroll + parallax for `.hero__bg-mark` / `.contact__bg-mark`). No GSAP yet — that's M4.

§15-protected strings (motto, fee tiers, capability headers, transparency statement, contact details) live in `src/content/site.ts` and are imported by every section that needs them. The `--color-*` palette in `global.css` is the only source of brand colors.

## Deploy

- Workflow: `.github/workflows/deploy.yml` — `withastro/action@v3` + `actions/deploy-pages@v4`
- Triggering push: `b4f50d3..38fa14f main -> main`
- GitHub Run ID: `26374721191` — https://github.com/benzpaws/Ninth-Protocol/actions/runs/26374721191
- Conclusion: **success**
- Verified visually in Chrome against the local Astro dev server at parity

## Deferred to later milestones

- **Tailwind utility rewrites (M3).** Components currently hold V1 CSS verbatim inside `<style is:global>` blocks. M3 will rewrite the layout and spacing primitives as Tailwind utility classes and trim the scoped CSS to the parts that truly need it (animations, pseudo-elements, hairline rules). Tokens stay in `@theme`.
- **Em-dash copy cleanup.** `—` is used inline in several body lines (e.g. Capabilities cards, transparency statement). Audit punctuation against the editorial register before M3 ships; some are right, some should be commas or periods.
- **GSAP scroll engine (M4).** Replace the vanilla `IntersectionObserver` reveal engine and the rAF scroll handler with a single GSAP + ScrollTrigger implementation. Goal is the same V1 bidirectional feel (`is-in / is-out-up / is-out-down` semantics) but with finer timeline control and `prefers-reduced-motion` honored everywhere.
- **Web3Forms end-to-end test.** Inquiry form ships with `access_key="YOUR_WEB3FORMS_ACCESS_KEY"` placeholder, which currently triggers the mailto fallback (correct behavior until a real key is wired). Once the production access key is provisioned, do a live submission and confirm: (a) inbound email lands with the `NP-9XXXXX` reference and the formatted block; (b) the form resets and regenerates a new reference on success; (c) the failure path shows the gold-soft error message and re-enables the submit button.
