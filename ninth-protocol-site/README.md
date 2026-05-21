# NINTH PROTOCOL — Microsite

A single-page premium site for QR-code distribution. Designed to be hosted free on GitHub Pages.

---

## What's included

```
ninth-protocol-site/
├── index.html        ← The page itself
├── styles.css        ← All styling (brand colours, typography, responsive layout)
├── script.js         ← Form handling + smooth scrolling
├── README.md         ← This file
└── assets/
    ├── np-monogram.png       ← NP monogram (indigo background)
    ├── np-lockup-square.png  ← Full lockup on indigo
    ├── np-lockup-wide.png    ← Wide banner version
    └── np-black.png          ← Full lockup on black
```

---

## Brand specifications used

- **Deep Indigo:** `#2A2354` (primary background)
- **Deep Indigo Variant:** `#1E1A3E` (darker accent backgrounds)
- **Muted Gold:** `#C0A11E` (accents, type, rules)
- **Soft Gold:** `#D4B84A` (hover states, highlights)
- **Paper:** `#FAF8F3` (light section background)
- **Off-white:** `#F5F2EC` (body text on dark)
- **Typography:** Cormorant Garamond (serif headlines/body) + Inter (sans-serif labels/UI)

---

## Step 1 — Deploy to GitHub Pages

### Option A: Via the GitHub web interface (easiest)

1. Go to [github.com/new](https://github.com/new) and create a new repository.
   - Name suggestion: `ninth-protocol`
   - Set it to **Public** (required for free GitHub Pages)
2. Click **Add file → Upload files**.
3. Drag the entire contents of `ninth-protocol-site/` into the upload area (the `index.html`, `styles.css`, `script.js`, and the `assets/` folder).
4. Commit the upload (green button at the bottom).
5. Go to **Settings → Pages** in your new repo.
6. Under **Source**, select branch `main` and folder `/ (root)`.
7. Click **Save**.
8. Wait 1-2 minutes. Your site will be live at:
   ```
   https://<your-github-username>.github.io/ninth-protocol/
   ```

### Option B: Via Git CLI (if you have it)

```bash
cd ninth-protocol-site
git init
git add .
git commit -m "Initial commit — Ninth Protocol microsite"
git branch -M main
git remote add origin https://github.com/<your-username>/ninth-protocol.git
git push -u origin main
```
Then enable Pages in Settings as above.

---

## Step 2 — Connect a custom domain (optional but recommended)

You already own `ninthprotocol.eu`. To point a subdomain (e.g. `qr.ninthprotocol.eu`) at the GitHub-hosted page:

1. In your GitHub repo, go to **Settings → Pages**.
2. Under **Custom domain**, enter your subdomain (e.g. `qr.ninthprotocol.eu`) and click **Save**.
3. Go to your domain registrar's DNS panel and add a **CNAME record**:
   - **Name:** `qr`
   - **Value:** `<your-username>.github.io`
4. Wait 10-30 minutes for DNS propagation.
5. Back in GitHub Pages settings, tick **Enforce HTTPS** once available.

---

## Step 3 — Make the form actually send emails

The form has two modes built in. **Mode 1 (mailto fallback)** works immediately with zero setup but requires the visitor to send the email themselves through their email app. **Mode 2 (Web3Forms)** is fully automatic — they hit submit and you get an email instantly.

### Mode 1 — `mailto:` fallback (works out of the box)

No setup. When someone submits the form, their default email client opens with a pre-filled email to `JRughooputh@ninthprotocol.eu`. They press send.

**Pros:** Zero configuration. Works immediately.
**Cons:** Requires the visitor to have an email client configured. On some mobile devices, this is seamless. On desktop without a default email app, it fails silently.

### Mode 2 — Web3Forms (fully automatic, recommended)

1. Go to [web3forms.com](https://web3forms.com) — no signup needed.
2. Enter `JRughooputh@ninthprotocol.eu` in the access key generator.
3. Check your inbox for the access key (a long string like `abc123-def456-...`).
4. Open `index.html` in any text editor.
5. Find this line (around line 188):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
6. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key Web3Forms sent you.
7. Save the file.
8. Re-upload `index.html` to your GitHub repo (or commit and push via Git).

That's it. Every form submission now arrives in your inbox automatically, formatted, and tagged with category, contact info, and the inquiry context.

**Free tier:** 250 submissions/month — far more than needed for QR-code traffic.

---

## Step 4 — Generate the QR code

Once your site is live (either at `<username>.github.io/ninth-protocol/` or `qr.ninthprotocol.eu`), generate a QR code:

1. Go to [qrcode-monkey.com](https://www.qrcode-monkey.com/) or any QR generator.
2. Paste your URL.
3. **Recommended styling:**
   - Foreground colour: `#2A2354` (Deep Indigo)
   - Background: white or `#F5F2EC` (Off-white)
   - Add the NP monogram in the centre (most generators support a custom logo overlay)
   - Use the **rounded** dot style for a more refined look
4. Download as PNG or SVG.
5. Send to your business card printer.

---

## Customising the content

All copy lives in `index.html`. Each section is clearly marked with comments like:
```html
<!-- ──────────────  HERO  ────────────── -->
```

To change colours, edit the variables at the top of `styles.css`:
```css
:root {
  --indigo: #2A2354;
  --gold: #C0A11E;
  ...
}
```

---

## Testing locally before deploying

If you want to preview the site on your laptop before uploading:

1. Open the folder in your file browser.
2. Double-click `index.html`. It will open in your browser.

The site is fully functional from a file:// URL. The form's mailto fallback will work; the Web3Forms submission requires the site to be served over http(s), so test that after deployment.

---

## Maintenance

- **Update the year in the footer:** Happens automatically (JavaScript-driven).
- **Change copy:** Edit `index.html` directly, commit, push. Live within 60 seconds.
- **Add a new section:** Copy any existing `<section>` block and modify.
- **Change brand colours globally:** Edit the `:root` variables in `styles.css`.

---

## Browser support

Tested and working on:
- Safari 15+ (iOS and macOS)
- Chrome 100+ (all platforms)
- Firefox 100+
- Edge 100+

Graceful degradation on older browsers — content remains readable, animations are skipped.

---

## Privacy & compliance notes

- The form does not use cookies.
- No tracking or analytics included by default. If you want to add Plausible (privacy-friendly) or Google Analytics, drop the snippet into `<head>` in `index.html`.
- Web3Forms processes form data and forwards it to your email. Their privacy policy: web3forms.com/privacy

---

**Ninth Protocol OÜ**
Estonia
JRughooputh@ninthprotocol.eu
