# Milestone 3-B — Done

**Date:** 2026-05-25
**Live URL:** https://ninthprotocol.eu

Two scoped wire-ups shipped together: the inquiry form is now a real channel, and the preloader leads with the firm's positioning line instead of the wordmark alone.

## Commits

Range: `9d30580..40fa5e6` (3 commits)

| SHA | Message |
|---|---|
| `e5c1d1b` | docs: add .env.example for PUBLIC_WEB3FORMS_KEY |
| `9a75290` | feat(inquiry): wire Web3Forms via env var, verified end-to-end |
| `40fa5e6` | feat(preloader): add Private Procurement tagline with block fade |

## Tasks

### Task 1 — Web3Forms wire-up via env var

`src/components/sections/InquiryForm.astro` reads the access key from `import.meta.env.PUBLIC_WEB3FORMS_KEY` (Astro frontmatter, baked into the hidden input at build time). Falls back to the original placeholder string if the env var is missing — which preserves the existing mailto-fallback path in the inline submit handler. The real key lives in `.env` (gitignored) locally and in GitHub repo secret `PUBLIC_WEB3FORMS_KEY` for CI. `.env.example` documents the variable name for future contributors. The Pages workflow injects the secret as a build-time env var via a single `env:` block on the `withastro/action@v3` step.

Verified end-to-end:
- Test submission from local preview → email arrived at `jrughooputh@ninthprotocol.eu` within 2 minutes, correct subject line.
- Final submission from live `ninthprotocol.eu` → email received in inbox shortly after submission.

### Task 2 — Preloader tagline "PRIVATE PROCUREMENT"

Adds the tagline below the existing wordmark in `src/components/chrome/Preloader.astro`. Block-fade animation matching the wordmark's `prFade` keyframe — no per-letter stagger. Cormorant Garamond 300 (confirmed loaded), 13px / 0.3em tracking, gold at 70% alpha, 8px above tagline (achieved with `margin-top: -20px` against the wordmark's existing 28px `margin-bottom`).

Constraint waiver: dismiss timeout in `src/layouts/Base.astro` bumped from 1900ms → 2700ms (single-line edit, both branches plus the 4000ms safety fallback) to let the tagline finish its 0.8s fade-in at 2.45s and hold for 250ms before the preloader's 0.9s fade-out begins.

Final preloader timeline:
- `0.55–1.35s` — wordmark fades in
- `1.65–2.45s` — tagline fades in
- `2.45–2.70s` — both held at full opacity (250ms settle)
- `2.70–3.60s` — preloader fades out

Verified live in Chrome on `ninthprotocol.eu` — sequence renders cleanly, no jank.

## Deploy

- Workflow: `.github/workflows/deploy.yml` — `withastro/action@v3` + `actions/deploy-pages@v4`, with `PUBLIC_WEB3FORMS_KEY` injected from repo secrets
- Triggering push: `9d30580..40fa5e6 main -> main`
- GitHub Run ID: `26391387539` — https://github.com/benzpaws/Ninth-Protocol/actions/runs/26391387539
- Conclusion: **success**

Live verification (post-deploy curl of `ninthprotocol.eu`):
- `<div class="preloader__tagline">PRIVATE PROCUREMENT</div>` present
- `setTimeout(dismiss, 2700)` in inline script (both branches)
- `name="access_key" value="8565132e-2fdc-4bd2-b046-d17d9ef0e099"` — real key, not placeholder
- Final live inquiry submission delivered to inbox

## Open follow-ups

- **Node 20 deprecation in GitHub Actions runner (non-blocking).** The Pages build warned that `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/upload-artifact@v4` still run on Node 20. GitHub will force Node 24 by default on 2026-06-02 and remove Node 20 on 2026-09-16. Action: bump the three action versions before September 2026 — or sooner if any of them ship a Node-24-native release that simplifies the upgrade path.

## Deferred to M3-C / M3-D (tomorrow)

- **M3-C — Mandate Process page.** Scope to be defined; intended as a new top-level page documenting how an engagement actually works end-to-end (intake → diligence → execution → handover), in the same register as the existing four sections.
- **M3-D — Case Vignettes.** Anonymised, narrative-style sketches of past acquisitions. No client names, no identifying details — register of *Sotheby's editorial*, not a portfolio grid. Format and surfacing (separate page vs. embedded in §III Capabilities) TBD.
