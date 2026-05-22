# NINTH PROTOCOL  ·  Microsite v5

*"For those who answer to no one."*

A focused, four-section microsite designed for QR-code distribution from business cards. Adaptive responsive — auto-detects device.

---

## Sections

| § | Title | Job |
|---|-------|-----|
| I | Identity | Logo, motto, immediate Email + WhatsApp CTAs |
| II | The Model | Side-by-side comparison: Ninth Protocol vs commission concierges |
| III | Capabilities | The four disciplines |
| IV | Contact | Email + WhatsApp channels, optional form behind a toggle |

Each section is full-viewport. Designed to be scanned in 30 seconds or read in 3 minutes.

---

## What changed in v5

- **New motto:** *"For those who answer to no one."* — replaces the "Time is money" motto
- **Cut from 7 sections → 4** — focused on credibility + contact, the QR-card use case
- **Contact buttons in the hero** — Email + WhatsApp visible without scrolling
- **Larger body type** — 17 → 19px serif, easier to read on desktop
- **Bidirectional scroll animations** — elements animate in when scrolled into view AND animate out when scrolled past in either direction
- **Real logo** — transparent SVG monogram (with PNG fallback) throughout
- **No UTC clock** — removed
- **Background NP watermarks** — subtle, monumental, with subtle parallax on scroll

---

## File structure

```
ninth-protocol-site/
├── .nojekyll              ← Tells GitHub Pages to serve files as-is
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── np-mark.svg         ← Real logo vectorized (1KB, scales infinitely)
    ├── np-mark.png         ← Transparent PNG fallback
    ├── np-monogram.png     ← Original with indigo background
    ├── np-lockup-square.png
    ├── np-lockup-wide.png
    └── np-black.png
```

---

## Brand colours

- **Deep Indigo:** `#2A2354`
- **Indigo Night:** `#0E0B22`
- **Muted Gold:** `#C0A11E`
- **Paper:** `#F8F5EF`
- **Off-white:** `#F5F2EC`

## Typography

- **Cormorant Garamond** — Headlines, body, motto
- **Inter** — UI labels, buttons, navigation
- **JetBrains Mono** — Metadata, reference numbers

---

## Deployment

### Upload to GitHub Pages

Critical: drag the **contents** of the `ninth-protocol-site/` folder into the repo root, NOT the folder itself. Repo should look like:

```
Ninth-Protocol/             ← repo root
├── .nojekyll
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
```

### Enable Pages

Settings → Pages → Source: `main` branch, `/ (root)` → Save.

### Custom subdomain (optional)

Add a CNAME record on `qr.ninthprotocol.eu` pointing to `<username>.github.io`. Then in Settings → Pages set the custom domain and enforce HTTPS.

### Make the form send emails automatically

1. Go to [web3forms.com](https://web3forms.com)
2. Enter `JRughooputh@ninthprotocol.eu` to get an access key
3. Open `index.html`, find `YOUR_WEB3FORMS_ACCESS_KEY`, replace with your key
4. Commit

Until then, the form falls back to `mailto:` — opens the user's email client pre-filled.

---

## QR code for business cards

Once live, generate a QR with:

- **Foreground:** `#2A2354` (Deep Indigo)
- **Background:** white or `#F8F5EF` (Paper)
- **Centre logo:** `assets/np-mark.svg`

Recommended generator: [qrcode-monkey.com](https://www.qrcode-monkey.com/)

---

**Ninth Protocol OÜ**
Estonia · International Holding Entity
JRughooputh@ninthprotocol.eu
WhatsApp: +1 437 249 0909
