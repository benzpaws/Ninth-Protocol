# NINTH PROTOCOL — "The Dossier"

A single-page premium microsite for QR-code distribution. Designed to feel like opening a confidential document, not browsing a website. Built for GitHub Pages hosting.

---

## The design concept

This site does not look like a marketing page — it looks like a confidential dossier being carefully presented. Every choice reinforces the brand DNA:

| Brand DNA | How it shows up in the design |
|-----------|-------------------------------|
| **Private banking register** | Mono-spaced metadata, reference numbers, classification stamps |
| **Discretion as discipline** | No screaming CTAs, no testimonials, no social proof — quiet authority |
| **Fiduciary, conflict-free** | The Four Tenets are the centrepiece of the page, not service descriptions |
| **One principal** | Every visitor gets a unique session reference (NP-9XXXXX) — singular by design |
| **The number "9"** | Reference numbers always begin with 9. The brand mark anchors every section. |
| **Protocol = procedure** | Seven articles, numbered §I through §VII, like a legal document |
| **Time as the asset** | Live UTC clock in the header. Timestamps everywhere. |

---

## What's included

```
ninth-protocol-site/
├── index.html         ← Full page markup
├── styles.css         ← The Dossier design system
├── script.js          ← Animations, cursor, form, clock, references
├── README.md          ← This file
└── assets/
    ├── np-monogram.png       ← NP monogram (indigo)
    ├── np-lockup-square.png  ← Full lockup on indigo
    ├── np-lockup-wide.png    ← Wide banner version
    └── np-black.png          ← Lockup on black
```

---

## Animation & interaction highlights

### Page load
- **Preloader sequence** (1.8s): The NP monogram fades up, three lines of mono-spaced "system text" cascade in showing `SYS: INITIALISING PROTOCOL`, `REF: NP-9XXXXX`, `STAT: VERIFYING → READY`. A gold rule completes underneath. Feels like a private terminal connecting.
- **Hero reveal**: The "NINTH PROTOCOL" wordmark assembles letter-by-letter. Headlines slide up in masked containers (each line reveals from a clean horizontal cut). Subhead and CTAs fade in with stagger.

### Scroll experience
- **Scroll progress bar** — A 1px gold rule across the top fills as you scroll.
- **Top bar auto-hides** on scroll down, reappears on scroll up.
- **Live UTC clock** in the header updates every second.
- **Session reference** (e.g. `NP-9K7XQR`) — unique per visitor, generated client-side, displayed in header, footer, and embedded in form submissions.
- **Side index** (desktop, ≥1280px) — Roman-numeral chapter list on the right edge. Active chapter highlights with an expanding gold rule as you scroll.
- **Article stamps** — Large faded §I, §II, §III watermarks in the corner of each section.
- **Parallax** — The hero's NP monogram drifts at 0.25x scroll speed.
- **Reveal-on-scroll** — Tenets, capabilities, definitions all fade and rise in as they enter the viewport.

### Hover & cursor (desktop)
- **Custom cursor** — A 4px gold dot with a trailing 28px ring. On interactive elements, the dot dissolves and the ring expands to 56px.
- **Magnetic elements** — Buttons, brand mark, key links physically lean toward your cursor when you approach them. Subtle, ~0.18x offset.
- **Capability cards** — On hover, indigo sweeps up from the bottom and text inverts to gold/white. The accent rule turns gold. The icon stroke turns gold.
- **Form fields** — The gold rule under each field draws from left to right when focused (and stays subtly lit if filled).

### Form
- Each field is numbered (01, 02, 03…) like a document section.
- Form header shows live `Reference` (NP-9XXXXX), `Form` ID (§VII.01), and pulsing `Status: Awaiting`.
- Submit button hover sweeps gold from below.
- On success, status confirms with the reference number.

---

## Brand colours (verified)

- **Deep Indigo:** `#2A2354` — primary
- **Indigo Deep:** `#1B1638` — section backgrounds
- **Indigo Night:** `#0E0B22` — hero, closing, preloader
- **Muted Gold:** `#C0A11E` — accents, rules, type
- **Gold Soft:** `#D4B84A` — hover states, pull quotes
- **Paper:** `#F8F5EF` — light section backgrounds
- **Off-white:** `#F5F2EC` — body text on dark

## Typography

- **Cormorant Garamond** — Serif headlines, body, quotes, hero
- **Inter** — Sans-serif UI labels, buttons, navigation
- **JetBrains Mono** — Metadata, reference numbers, timestamps, classification stamps

---

## Step 1 — Deploy to GitHub Pages

### Option A: GitHub web interface (easiest)

1. Go to [github.com/new](https://github.com/new) — create a public repository named `ninth-protocol`.
2. Click **Add file → Upload files**. Drag the entire contents of `ninth-protocol-site/` into the upload area.
3. Commit the upload.
4. Go to **Settings → Pages**. Under **Source**, select branch `main` and folder `/ (root)`. Save.
5. Wait 1–2 minutes. Your site will be live at:
   ```
   https://<your-username>.github.io/ninth-protocol/
   ```

### Option B: Git CLI

```bash
cd ninth-protocol-site
git init && git add . && git commit -m "Ninth Protocol — initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ninth-protocol.git
git push -u origin main
```

---

## Step 2 — Connect a custom subdomain (recommended)

Use a subdomain of your existing domain, e.g. `qr.ninthprotocol.eu`:

1. In your GitHub repo: **Settings → Pages → Custom domain** — enter `qr.ninthprotocol.eu` and Save.
2. In your domain DNS settings, add a CNAME record:
   - **Name:** `qr`
   - **Value:** `<your-username>.github.io`
3. Wait 10–30 minutes for DNS propagation.
4. Return to GitHub Pages settings and tick **Enforce HTTPS**.

---

## Step 3 — Make the form actually send emails

The form has two modes built in.

### Mode 1 — mailto fallback (works immediately)

No setup. When someone submits the form, their default email client opens with a pre-filled email to `JRughooputh@ninthprotocol.eu` — fully formatted with reference number, category, contact details, and context.

### Mode 2 — Web3Forms (fully automatic — recommended)

1. Go to [web3forms.com](https://web3forms.com) — no signup required.
2. Enter `JRughooputh@ninthprotocol.eu` in the access-key generator on their homepage.
3. Check your inbox for the access key (a long string of letters/numbers).
4. Open `index.html`. Find:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
5. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key.
6. Save and re-upload to GitHub.

Now every form submission arrives in your inbox automatically, with the unique reference number, complete contact details, category, and context — fully formatted.

**Free tier:** 250 submissions/month.

---

## Step 4 — Generate the QR code for your business card

1. Go to [qrcode-monkey.com](https://www.qrcode-monkey.com/) or similar.
2. Paste your live URL (either `<username>.github.io/ninth-protocol/` or `qr.ninthprotocol.eu`).
3. **Recommended styling:**
   - Foreground colour: `#2A2354` (Deep Indigo)
   - Background: white or `#F8F5EF` (Paper)
   - Centre logo: upload `assets/np-monogram.png`
   - Dot style: rounded for refinement, or square for severity — both work
4. Download as PNG and SVG. Send the SVG to your card printer for crisp output.

---

## Customising

### Change colours
Edit the `:root` variables at the top of `styles.css`.

### Change copy
All copy lives in `index.html` — each section is bracketed with comments like:
```html
<!-- §III — ETHOS  ·  THE FOUR TENETS -->
```

### Add or remove sections
Each section follows a pattern: section ID, article stamp, container, reveal classes. Copy any existing block and modify.

### Adjust animation speeds
Speed up or slow down via the CSS custom properties:
```css
--dur-fast: 0.28s;
--dur-base: 0.5s;
--dur-slow: 0.9s;
```

### Disable the preloader
Comment out the `<div class="preloader">` block in `index.html`. The page will load instantly.

---

## Performance & accessibility

- **Lighthouse-ready** — Lazy assets, hardware-accelerated animations, no blocking scripts.
- **Reduced motion** — Visitors with `prefers-reduced-motion: reduce` skip the preloader and all transitions.
- **Mobile-first** — Optimised for QR-scan viewing on phones. All hover effects gracefully disable on touch devices.
- **Keyboard accessible** — Tab navigation, focus states, ARIA labels throughout.
- **No tracking, no cookies** — privacy-respecting by default.

---

## Browser support

Tested on:
- Safari 15+ (iOS, macOS)
- Chrome 100+
- Firefox 100+
- Edge 100+
- Mobile browsers (iOS Safari, Chrome Android)

---

**Ninth Protocol OÜ**
Estonia · International Holding Entity
JRughooputh@ninthprotocol.eu
