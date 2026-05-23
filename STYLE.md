# STYLE.md — Design Tokens & Rules

Read `CLAUDE.md` first.

## Color system (Tailwind + CSS custom properties)

```css
:root {
  --indigo: #2A2354;
  --indigo-deep: #1B1638;
  --indigo-night: #0E0B22;
  --indigo-ink: #07051A;
  --indigo-soft: #3A3370;

  --gold: #C0A11E;
  --gold-soft: #D4B84A;
  --gold-deep: #8F7615;
  --gold-line: rgba(192, 161, 30, 0.22);
  --gold-faint: rgba(192, 161, 30, 0.08);

  --paper: #F8F5EF;
  --paper-warm: #EFE9DD;
  --off-white: #F5F2EC;

  --ink: #15131F;
  --ink-soft: #3A3548;
  --ink-faint: #6B6478;
}
```

Tailwind config should expose these as `colors.indigo.{shade}`, `colors.gold.{shade}`, `colors.paper.{shade}`, `colors.ink.{shade}`.

## Typography system

### Families

```css
--font-serif: 'Cormorant Garamond', 'Garamond', Georgia, serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, Monaco, monospace;
```

### Type scale (mobile-first, scales up via clamp)

| Token | Size | Family | Weight | Line-height | Letter-spacing | Use |
|-------|------|--------|--------|-------------|----------------|-----|
| `display-xl` | clamp(56px, 9vw, 140px) | serif | 300 | 1.0 | -0.035em | hero motto |
| `display-lg` | clamp(48px, 7vw, 100px) | serif | 300 | 1.02 | -0.025em | section headlines |
| `display-md` | clamp(36px, 5vw, 64px) | serif | 300 | 1.05 | -0.02em | sub-headlines |
| `h2` | clamp(20px, 2.4vw, 28px) | serif | 500 | 1.3 | -0.005em | content h2 |
| `h3` | clamp(18px, 2vw, 22px) | serif | 500 | 1.4 | 0 | content h3, card titles |
| `lede` | clamp(18px, 2vw, 22px) | serif italic | 400 | 1.5 | -0.005em | lede paragraphs |
| `body` | clamp(17px, 1.5vw, 19px) | serif | 400 | 1.6 | 0 | body text |
| `caption` | clamp(13px, 1.2vw, 14px) | serif italic | 400 | 1.4 | 0 | captions |
| `label-mono` | 11px–13px | mono | 400 | 1.1 | 0.32em–0.5em uppercase | article labels, overlines |
| `label-sans` | 11px–13px | sans | 500 | 1.4 | 0.18em–0.22em uppercase | buttons, UI labels |

Italic in display sizes is the brand's emphasis mechanism. Bold in body is rare and only for inline label-style emphasis ("**Tier I**...").

### Font-feature-settings

Apply globally:
```css
body {
  font-feature-settings: 'kern' 1, 'liga' 1;
}
.serif-italic {
  font-feature-settings: 'kern' 1, 'liga' 1, 'ss01' 1;
}
```

Cormorant Garamond has gorgeous swash italics in stylistic set 01. Use them.

## Spacing system

Based on a 4px base unit, with named tokens:

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | hairline gaps |
| `space-2` | 8px | tight gaps |
| `space-3` | 12px | label-to-content |
| `space-4` | 16px | small block separation |
| `space-5` | 24px | block separation |
| `space-6` | 32px | item separation |
| `space-7` | 48px | major content gap |
| `space-8` | 64px | section sub-gap |
| `space-9` | 96px | section gap on mobile |
| `space-10` | 128px | section gap on desktop |
| `space-11` | 160px | hero breathing room |

Section vertical padding:
- Mobile: `space-9` top, `space-8` bottom
- Tablet: `space-10` top, `space-9` bottom
- Desktop: `space-11` top, `space-10` bottom

Horizontal page padding:
- Mobile: 20px
- Tablet: 28px
- Desktop: 36px
- Container max-width: 1280px (1180px content + 50px gutters either side)

## Easing curves

| Token | Value | Use |
|-------|-------|-----|
| `ease-out-strong` | `cubic-bezier(0.19, 1, 0.22, 1)` | section reveals, scroll animations |
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | hero entrance, large elements |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | sustained motion |
| `ease-elastic` | `cubic-bezier(0.34, 1.36, 0.64, 1)` | small bounces (use sparingly) |

Default to `ease-out-strong` for almost everything.

## Animation durations

| Token | Value | Use |
|-------|-------|-----|
| `dur-quick` | 450ms | hover transitions, button states |
| `dur-base` | 800ms | section reveals, rules drawing |
| `dur-mid` | 1000ms | display headline mask-reveals |
| `dur-slow` | 1200ms | hero entrance, large transforms |

Nothing animates faster than 300ms in this register. Sub-300ms reads as anxious.

## Border radii

Almost zero. This is a sharp-edged brand.

- Buttons: 0 (sharp corners)
- Form inputs: 0 (sharp edges, underlined fields not boxed)
- Panels: 0 (corner brackets instead of rounded corners)
- Images: 0
- Avatars: never used

## Shadows

None. No drop shadows, no glows, no elevation. The brand exists on a flat plane.

The only "depth" cue is the dark overlay on the contact section (linear-gradient from indigo-deep to indigo-ink), which simulates the bottom of a printed page fading to black.

## Borders and rules

- Hairline rules: `1px solid var(--gold-line)`, used between sections in the model panel
- Decorative rules: `1px solid var(--gold)` at 0.5–0.7 opacity, short widths (40–100px), used to mark transitions
- Form field underlines: `1px solid rgba(245, 242, 236, 0.16)` resting, scales to gold on focus via `::after` with `transform: scaleX(0→1)`
- Corner brackets on panels: 1.2px stroke, gold, 22px arms

## Buttons

Two variants:

### Primary (Gold filled)
```
bg: var(--gold)
color: var(--indigo)
padding: 18px 28px
font: 13px Inter 500, letter-spacing 0.22em, uppercase
border: 1px solid var(--gold)
hover: bg shifts to var(--gold-soft), arrow translates right 6px
```

### Secondary (Gold outline)
```
bg: transparent
color: var(--gold)
padding: 18px 28px
font: 13px Inter 500, letter-spacing 0.22em, uppercase
border: 1px solid var(--gold)
hover: ::before pseudo-element with bg var(--gold) translates from translateY(101%) to translateY(0), color becomes var(--indigo)
```

Both have an `→` arrow at the end (em-dash space + arrow character, not an icon).

Large size variant: `22px 38px` padding, `14px` font.

## Form fields

- No boxes around inputs — only a hairline underline
- Label above the field, mono caps gold, with a small numeric prefix (01, 02, 03…)
- Field: transparent background, 8px top / 12px bottom padding, 19px Cormorant
- Focus state: underline animates from transparent-grey to gold, scaleX from 0 to 1, 600ms ease-out-strong
- Placeholder: italic, opacity 0.3, never used in place of labels

## Hidden in plain sight (small touches)

- Reference numbers: `Reference: NP-9XKQRT` (mono, 10px, gold) appearing in the form
- Article labels: `§I` italic gold serif, then `—` then mono caps name
- Page-corner stamps: "CONFIDENTIAL · PRIVATE CIRCULATION" mono 11px top-right of hero
- Footer colophon line, mono 10px

## Mobile-specific notes

- Touch targets minimum 44×44px (Apple HIG)
- Buttons stretch to full width with `max-width: 320px` and center-align on small screens
- Fee panel tiers stack vertically instead of side-by-side
- Comparison columns in §II stack
- Capability cards become single column
- Don't hide secondary information on mobile — let it scroll
- Form is full-width, no side gutters on phones

## What to never do

- Don't use Tailwind's default font stack (`font-sans` defaults) — always specify
- Don't use Tailwind's default colors (`gray-500`, `blue-600`) — only the brand tokens
- Don't use `shadow-*` utilities
- Don't use `rounded-*` beyond `rounded-sm` (2px), and even then rarely
- Don't use `gradient-*` for decorative purposes — only for the two intentional uses (hero radial behind motto, contact section vertical fade)
- Don't add Tailwind plugins that introduce visual elements (forms, typography) — we want full control
- Don't use `animate-pulse`, `animate-spin`, `animate-bounce` — write custom keyframes
- Don't `hover:scale-105` — buttons don't scale, that's a SaaS gesture
