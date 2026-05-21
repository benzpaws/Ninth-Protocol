# NINTH PROTOCOL  ·  Microsite v3

**Time is money. Money cannot buy time. We deal in both.**

A type-driven, information-led microsite designed at private-bank scale. Adaptive responsive — auto-detects device, no toggle needed.

---

## The concept

This site treats the brand's motto as its conceptual spine. Every design decision flows from it:

- The live UTC clock is not decoration — it is the **subject** of the site
- Each section is numbered (§I through §VII) like a legal document
- Each visitor receives a unique session reference (`NP-9XXXXX`) — the leading `9` is the brand motif
- The motto opens and closes the site — once in the hero, once in the standard, once in the footer
- The §V Comparison Table is the credibility moment: a structural, factual comparison versus commission-based concierges

This is closer to a private-bank report than a marketing page. No imagery. No video. Just typography, structure, and information.

---

## Structure

| § | Section | Purpose |
|---|---------|---------|
| I | Hero | The motto, massive |
| II | The Firm | One paragraph + three numbered facts |
| III | The Difference | Four numbered differentiators |
| IV | The Mandate | The four disciplines, with detailed scope |
| V | The Comparison | Side-by-side table: Ninth Protocol vs commission concierges |
| VI | The Standard | Closing statement that loops back to the motto |
| VII | Initiate | The inquiry form |

---

## What changed in v3

| Issue | Fixed by |
|-------|----------|
| Cursor misalignment | Custom cursor removed entirely — system cursor restored |
| Logo background mismatch | New inline SVG monogram with transparent background. No more PNG colour-edge issue. |
| Too dense / too fast | Animation durations doubled. Type scale increased 40%. Whitespace doubled. |
| No real "difference" content | New §V Comparison section — direct structural comparison with commission concierges |
| Motto buried | Motto is now the hero, the closing line, and the footer signature |
| Mobile toggle requested | Removed in favour of adaptive responsive (best practice) |
| Jekyll processing issue | Added `.nojekyll` file to prevent GitHub from running Jekyll on the HTML |

---

## File structure

```
ninth-protocol-site/
├── .nojekyll              ← Tells GitHub Pages to serve files as-is
├── index.html             ← Full page markup
├── styles.css             ← Design system
├── script.js              ← Animations, clock, form, references
├── README.md              ← This file
└── assets/
    ├── np-mark.svg            ← NEW: transparent SVG monogram (use this)
    ├── np-monogram.png        ← Original PNG (still used for favicon fallback)
    ├── np-lockup-square.png   ← Social sharing image
    ├── np-lockup-wide.png     ← Banner version
    └── np-black.png           ← Logo on black
```

---

## Brand colours (verified)

- **Deep Indigo:** `#2A2354` — primary
- **Indigo Deep:** `#1B1638` — section backgrounds
- **Indigo Night:** `#0E0B22` — hero, closing
- **Indigo Ink:** `#07051A` — footer
- **Muted Gold:** `#C0A11E` — accents, rules, type
- **Gold Soft:** `#D4B84A` — italic emphasis, pull quotes
- **Paper:** `#F8F5EF` — light section backgrounds
- **Off-white:** `#F5F2EC` — body text on dark backgrounds

## Typography

- **Cormorant Garamond** — All display, headlines, body, quotes
- **Inter** — UI labels, buttons, navigation
- **JetBrains Mono** — Metadata, reference numbers, timestamps

---

## Deployment

### Step 1 — Upload to GitHub Pages

Critical: when uploading, drag the **contents** of the `ninth-protocol-site/` folder into the repo root — not the folder itself. Your repo should look like:

```
Ninth-Protocol/             ← repo root
├── .nojekyll
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
```

If you see `Ninth-Protocol/ninth-protocol-site/index.html`, that's wrong — move the files up one level.

### Step 2 — Enable GitHub Pages

Settings → Pages → Source: `main` branch, `/ (root)` folder → Save.
Wait 1–2 minutes. Live at `https://<username>.github.io/Ninth-Protocol/`

### Step 3 — Connect a subdomain (optional)

Add a CNAME record on `qr.ninthprotocol.eu` pointing to `<username>.github.io`. Then in Settings → Pages, enter the custom domain and enforce HTTPS.

### Step 4 — Make the form send emails

1. Go to [web3forms.com](https://web3forms.com)
2. Enter `JRughooputh@ninthprotocol.eu` to get your access key
3. Open `index.html`, find `YOUR_WEB3FORMS_ACCESS_KEY`, replace with your key
4. Commit. Done.

Until you do this, the form falls back to a `mailto:` link that opens the user's email client pre-filled.

---

## QR code for business cards

Once live, generate a QR with:

- **Foreground:** `#2A2354` (Deep Indigo)
- **Background:** white or `#F8F5EF` (Paper)
- **Centre logo:** `assets/np-mark.svg` (or `np-monogram.png`)

Recommended generator: [qrcode-monkey.com](https://www.qrcode-monkey.com/)

---

## Adaptive responsive behaviour

One codebase, three behaviours:

- **Desktop (>1024px):** Full Pagani-scale typography, side-by-side grids, comparison table in columns
- **Tablet (720–1024px):** Single column layouts, smaller scale, still rich
- **Mobile (<720px):** Stacked everything, comparison table becomes labelled cards, drawer menu, larger touch targets

No device detection in JavaScript. Pure CSS media queries. Loads instantly on every device.

---

## Browser support

- Safari 15+ (iOS, macOS)
- Chrome 100+
- Firefox 100+
- Edge 100+

Reduced-motion: respected — preloader and animations skipped for users who prefer no motion.

---

**Ninth Protocol OÜ**
Estonia · International Holding Entity
JRughooputh@ninthprotocol.eu
