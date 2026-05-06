# Operation Profit Asset Recovery — Template Demo & Sales Site

A Next.js 16 App Router application that lets asset recovery professionals preview, customize, and order a professionally designed website. Clients pick a template, tweak colors and fonts in real time, fill out a one-page order form, and submit — triggering transactional emails to both the client and the operator.

---

## How It Works

### 1. Picker Homepage (`/`)

The root page presents three cards:

- **Authority Template** — dark, gold-accented, military-inspired design
- **Trust Template** — light, navy/blue, professional serif design
- **Custom Design** — opens the order modal in custom-inquiry mode

Each card routes to the corresponding live preview.

---

### 2. Live Template Preview (`/templates/authority`, `/templates/trust`)

Each template page renders a full single-page website preview using 8 shared section components:

| Section | Description |
|---|---|
| `Hero` | Full-viewport headline + CTA |
| `ImpactNumbers` | 4 animated stat counters |
| `HowItWorks` | 3-step process (Identify → Handle → Get Paid) |
| `StatesWeServe` | Badge grid of all 45 states |
| `FAQ` | Animated accordion (7 questions) |
| `About` | Company blurb |
| `ContactForm` | Name / Email / Phone / Message form |
| `Footer` | Legal attribution |

All section components are **theme-agnostic** — they consume CSS custom properties (`--color-primary`, `--color-accent`, `--color-bg`, `--color-text`, `--font-heading`, `--font-body`) instead of hardcoded values. The template page injects these variables as inline styles on the wrapper `<div>`, so changing a color or font in the customizer re-renders the entire preview instantly.

---

### 3. Customizer Panel

A collapsible panel fixed to the right edge of the screen. Click the settings tab to open it.

- **4 Color Pickers** — Primary, Accent, Background, Text; each has a clickable color swatch synced with a hex text input
- **Font Selector** — 4 radio cards (Authority, Professional, Modern, Clean) with live font preview
- **Reset to Defaults** — restores the template's original color and font settings
- All changes are applied to the live preview immediately with no page reload

#### Font Pairings

| Pairing | Heading Font | Body Font |
|---|---|---|
| Authority | Black Ops One | Barlow Condensed |
| Professional | Playfair Display | DM Sans |
| Modern | Syne | Inter |
| Clean | DM Serif Display | Nunito |

---

### 4. Order Modal

Clicking **"Choose This Template"** (sticky button, fixed bottom center) opens a full-screen modal.

#### Draft Persistence
Form data is saved to `localStorage` under the key `op_order_draft` on every keystroke. If the client returns later with a saved draft, a banner appears offering **Continue** (use saved data) or **Start Fresh** (clear localStorage and begin again).

#### Start Over
The **Start Over** button in the modal header shows a confirmation dialog:
> "This will reset your template, colors, fonts, and add-on selections. Your business info and content will be saved."

On confirm, the design config resets, the modal closes, and the user is sent back to the picker. `localStorage` is **not** cleared — only the design customizations reset.

#### Form Sections (in order)

1. **Design Summary** — read-only display of template, color swatches, and font pairing
2. **Business Info** — Company/DBA name, LLC legal name, city/state, email, phone
3. **Domain Preference** — Toggle: existing domain (with registrar dropdown) or 3 preferences
4. **Website Content** — Headline, subheadline, about blurb, states served (checkbox grid)
5. **Add-Ons** — GHL integration (None / Basic +$97 / Advanced +$197), Multi-Page +$47, Bilingual +$97, Logo Design +$75, Monthly Retainer +$50/mo
6. **Custom Inquiry** — Optional textarea for custom design requests (auto-expands when `?custom=true` is in the URL)
7. **Order Summary** — Live pricing, delivery estimate, Submit button

#### Pricing Logic

| Base | Price |
|---|---|
| Single-page template | $250 |
| Multi-page template (add-on selected) | $297 |
| Custom design | $497 |

The Submit button is disabled until the following required fields are filled: company name, email, and at least one domain field.

---

### 5. Email API (`POST /api/order`)

On submit, the modal POSTs the full order payload to `/api/order`. The route handler:

1. **Operator email** — sent to `NEXT_PUBLIC_NOTIFY_EMAIL`; subject: `"New Website Order — [Company] — [Template]"`; body: structured copy-paste-ready spec (design, business info, domain, content, add-ons, totals)
2. **Client confirmation email** — sent to the client's email; subject: `"Your Order Has Been Received…"`; body: thank-you message + full order summary

Emails are sent via [Resend](https://resend.com).

On success, localStorage is cleared and a success screen is shown. On failure, an error banner appears and localStorage is preserved so the client can retry.

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout — loads all Google Fonts
│   ├── page.tsx                # Picker homepage
│   ├── globals.css
│   ├── api/order/route.ts      # Email submission API route
│   └── templates/
│       ├── authority/page.tsx  # Authority template demo page
│       └── trust/page.tsx      # Trust template demo page
├── components/
│   ├── customizer/
│   │   ├── ColorPicker.tsx
│   │   ├── FontSelector.tsx
│   │   └── CustomizerPanel.tsx
│   ├── modal/
│   │   ├── OrderModal.tsx
│   │   └── sections/
│   │       ├── DesignSummary.tsx
│   │       ├── BusinessInfo.tsx
│   │       ├── DomainPreference.tsx
│   │       ├── ContentSection.tsx
│   │       ├── AddOns.tsx
│   │       ├── CustomInquiry.tsx
│   │       └── OrderSummary.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── ImpactNumbers.tsx
│       ├── HowItWorks.tsx
│       ├── StatesWeServe.tsx
│       ├── FAQ.tsx
│       ├── About.tsx
│       ├── ContactForm.tsx
│       └── Footer.tsx
├── lib/
│   ├── templateDefaults.ts     # Authority/Trust defaults + fontPairings map
│   ├── statesData.ts           # Array of 45 states
│   ├── usePersistedForm.ts     # localStorage persistence hook
│   └── sendOrder.ts            # Email body formatter + types
├── types/
│   └── template.ts             # TemplateConfig, TemplateColors, FontPairing types
├── .env.local.example
└── .claude/
    ├── SPRINTS.md
    └── SUMMARY.md
```

---

## Local Development

```bash
# Install dependencies
npm install

# Copy and fill in env vars
cp .env.local.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key for sending emails |
| `NEXT_PUBLIC_NOTIFY_EMAIL` | Email address to receive new order notifications |

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import to Vercel as a new project
3. Add environment variables: `RESEND_API_KEY`, `NEXT_PUBLIC_NOTIFY_EMAIL`
4. Add domain in Vercel: `operationprofitllc.info` (or `.store`)
5. Add a CNAME record in Cloudflare pointing to `cname.vercel-dns.com` (DNS only, gray cloud)
6. Vercel provisions SSL automatically

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework + API routes |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations (counters, accordions, modals) |
| Resend | Transactional email delivery |
| Google Fonts (next/font) | 8 fonts loaded optimally via Next.js font subsetting |
| localStorage | Draft persistence across sessions |
