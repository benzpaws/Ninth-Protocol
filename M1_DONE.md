# Milestone 1 — Done

**Date:** 2026-05-23
**Live URL:** https://ninthprotocol.eu

## Commits

| SHA | Message |
|---|---|
| `14dfbc8` | chore: archive V1 site files |
| `f17b530` | chore: scaffold Astro project with TypeScript strict |
| `8464dfa` | chore: add Tailwind v4 and GSAP, wire into Astro |
| `117171a` | chore: configure GitHub Pages deploy with custom domain |

## Stack confirmed working

| Package | Pinned |
|---|---|
| `astro` | `^6.3.7` |
| `tailwindcss` | `^4.3.0` |
| `@tailwindcss/vite` | `^4.3.0` |
| `gsap` | `^3.15.0` |

TypeScript config: `astro/tsconfigs/strict`.
Node engine: `>=22.12.0` (CI runs on Node 22).

## Deploy

- Workflow: `.github/workflows/deploy.yml` — `withastro/action@v3` + `actions/deploy-pages@v4`
- First successful run on push to `main`: **32 seconds** (build + deploy)
- GitHub Run ID: `26343088480`
- Verified `HTTP 200` from `https://ninthprotocol.eu/`, served by GitHub.com, 1788 bytes (matches local build byte-for-byte)

## Open follow-ups

- **Tick "Enforce HTTPS"** in repo Settings → Pages roughly an hour after the first deploy, once GitHub finishes provisioning the Let's Encrypt cert for `ninthprotocol.eu`. Until then the option is greyed out.
