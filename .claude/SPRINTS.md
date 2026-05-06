# op-templates — Sprint Plan

**Project:** Operation Profit Asset Recovery — Template Demo & Sales Site  
**Hosted at:** `operationprofitllc.info` (or `.store`)  
**Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Resend

---

## Phase 1 — Templates & Customizer

---

### Sprint 1 — Project Foundation & Picker Homepage

**Goal:** Repo scaffolded, dependencies installed, picker homepage live.

Tasks:

- Initialize Next.js 14 App Router project with TypeScript and Tailwind
- Install Framer Motion
- Load all Google Fonts in `layout.tsx` (Black Ops One, Barlow Condensed, Playfair Display, DM Sans, Syne, Inter, DM Serif Display, Nunito)
- Create `/types/template.ts` — `TemplateConfig`, `TemplateColors`, `FontPairing` types
- Create `/lib/templateDefaults.ts` — Authority and Trust defaults, `fontPairings` map
- Build `/app/page.tsx` — Picker homepage
  - Dark background `#0A0A0A`
  - Header with service description
  - Two template preview cards (Authority, Trust) with "Preview & Customize" buttons
  - Custom Design card with dashed border and "Start Custom Inquiry" button
  - Cards route to `/templates/authority`, `/templates/trust`, `/templates/authority?custom=true`
- Create `.env.local.example` with `RESEND_API_KEY` and `NEXT_PUBLIC_NOTIFY_EMAIL`

**Deliverable:** Picker homepage live at `/` with routing to template pages (404 for now).

---

### Sprint 2 — Shared Section Components

**Goal:** All 8 reusable section components built with placeholder content, accepting `config` as props and consuming CSS variables.

Tasks:

- Create `/components/sections/Hero.tsx`
  - Headline, subheadline, CTA button scrolling to contact section
- Create `/components/sections/ImpactNumbers.tsx`
  - 4 animated counter tiles (Framer Motion + Intersection Observer)
  - `$2.3B+`, `45+`, `120`, `0` with labels
- Create `/components/sections/HowItWorks.tsx`
  - 3 steps: Identify, Handle, Get Paid
  - Horizontal desktop, stacked mobile
- Create `/components/sections/StatesWeServe.tsx`
  - Badge/pill grid — 45 states
  - Section heading: "Serving Claimants Across the Nation"
- Create `/components/sections/FAQ.tsx`
  - Accordion with Framer Motion expand/collapse
  - Gold chevron toggles on open/close
  - 7 questions wired in
- Create `/components/sections/About.tsx`
  - Short paragraph, Operation Profit LLC attribution
- Create `/components/sections/ContactForm.tsx`
  - Name, Email, Phone (optional), Message
  - Submit is a placeholder (TODO comment for Phase 2)
- Create `/components/sections/Footer.tsx`
  - "Operation Profit Asset Recovery is a division of Operation Profit LLC | El Paso, TX | © 2025"

All sections use `var(--color-primary)`, `var(--color-bg)`, `var(--color-text)`, `var(--color-accent)`, `var(--font-heading)`, `var(--font-body)` for all colors and typography.

**Deliverable:** All 8 section components built and isolated. Not yet wired into pages.

---

### Sprint 3 — Customizer Panel

**Goal:** Floating customizer panel built and functional as a standalone component.

Tasks:

- Create `/components/customizer/ColorPicker.tsx`
  - Color swatch (clickable) + hex text input that stay in sync
  - Native color input under the hood
- Create `/components/customizer/FontSelector.tsx`
  - 4 radio cards: Authority, Professional, Modern, Clean
  - Each card previews the heading font name in that font
- Create `/components/customizer/CustomizerPanel.tsx`
  - Fixed position, right side of screen, vertically centered
  - Collapsed by default — settings icon tab to toggle open
  - Contains ColorPicker (x4: Primary, Accent, Background, Text) and FontSelector
  - Reset to Defaults button — resets config to passed `defaults` prop
  - Props: `config`, `setConfig`, `defaults`
  - All changes call `setConfig` immediately

**Deliverable:** Customizer panel fully functional in isolation.

---

### Sprint 4 — Template Pages & Integration

**Goal:** Both live template demos fully wired with customizer and real-time CSS variable injection.

Tasks:

- Build `/app/templates/authority/page.tsx`
  - `useState` initialized from `authorityDefaults`
  - CSS variables injected into wrapper div
  - All 8 section components rendered in order
  - `CustomizerPanel` rendered with correct props and defaults
  - Sticky "Choose This Template" button — gold, fixed bottom center — `onClick={() => {}}` placeholder with TODO comment
- Build `/app/templates/trust/page.tsx`
  - Same structure, initialized from `trustDefaults`
- Verify real-time re-render on color and font changes (no page reload)
- Mobile responsive pass on both templates
- Smoke test all sections on both templates

**Deliverable:** Phase 1 complete. Both template demos live with working customizer. Sticky button renders but does nothing.

---

## Phase 2 — Order Modal, Form & Email

---

### Sprint 5 — localStorage Hook & Form Types

**Goal:** Persistence layer built before any form UI is created.

Tasks:

- Create `/lib/statesData.ts` — export array of all 45 states
- Create `/lib/usePersistedForm.ts`
  - Storage key: `op_order_draft`
  - Manages `PersistedFormData` type:
    - `businessInfo` — companyName, llcName, cityState, email, phone
    - `domainPreference` — hasOwnDomain, existingDomain, registrar, registrarOther, preferred1, preferred2, preferred3
    - `content` — headline, subheadline, about, states[]
  - On mount: reads localStorage, prefills state if key exists, initializes empty if not
  - On every change: writes full object to localStorage via `useEffect`
  - Exports: `{ formData, setFormData, clearDraft }`
- Create `/lib/sendOrder.ts` — email body formatter, accepts full order payload, returns structured plain text string

**Deliverable:** Persistence hook and email formatter ready. No UI yet.

---

### Sprint 6 — Order Modal Shell & Design Summary

**Goal:** Modal opens and closes correctly. Start Over flow works. Design Summary renders.

Tasks:

- Create `/components/modal/OrderModal.tsx`
  - Full screen overlay
  - On open: checks localStorage for `op_order_draft`
    - If found: shows banner "We saved your progress" with `[Continue]` and `[Start Fresh]` buttons
    - "Start Fresh" clears localStorage and resets persisted form state to empty defaults
  - "Start Over" button (top right of modal)
    - Confirmation prompt: "This will reset your template, colors, fonts, and add-on selections. Your business info and content will be saved."
    - `[Cancel]` `[Reset Design]` buttons
    - On confirm: clears config state, closes modal, navigates to `/`
    - localStorage is NOT cleared
  - Props: `config`, `isOpen`, `onClose`
- Create `/components/modal/sections/DesignSummary.tsx`
  - Read only — displays template name, 4 color swatches with hex labels, font pairing name and font names
  - No inputs, no localStorage, pure display from `config` prop
- Wire modal into both template pages
  - Add `isModalOpen` to `useState`
  - Connect sticky "Choose This Template" button to `setIsModalOpen(true)`
  - Pass `config`, `isModalOpen`, `setIsModalOpen` to `OrderModal`

**Deliverable:** Modal opens, Start Over works, Design Summary displays correctly.

---

### Sprint 7 — Order Form Sections

**Goal:** All form sections built and connected to `usePersistedForm`.

Tasks:

- Create `/components/modal/sections/BusinessInfo.tsx`
  - Company/DBA Name, LLC Legal Name, City/State, Contact Email, Contact Phone (optional)
  - All connected to `usePersistedForm`
- Create `/components/modal/sections/DomainPreference.tsx`
  - Radio: "Do you have a domain already?" — No (default) / Yes
  - IF NO: 3 URL preference text inputs + helper text
  - IF YES: existing domain input + registrar dropdown (GoDaddy, Namecheap, Ionos, Cloudflare, Google Domains, Squarespace, Other) + conditional "specify registrar" text input when Other selected
  - All connected to `usePersistedForm`
- Create `/components/modal/sections/ContentSection.tsx`
  - Hero Headline (text input)
  - Hero Subheadline (textarea)
  - About Blurb (textarea)
  - States Served — checkbox grid from `statesData.ts`, 4 columns desktop / 2 columns mobile
  - All connected to `usePersistedForm`
- Create `/components/modal/sections/CustomInquiry.tsx`
  - Toggle: "Prefer a custom design not shown? Inquire below"
  - Expands textarea on toggle
  - Auto-expands and sets textarea as required if `?custom=true` query param is present
  - Connected to `usePersistedForm`

**Deliverable:** All content form sections built, wired to localStorage persistence.

---

### Sprint 8 — Add-Ons, Order Summary & Validation

**Goal:** Add-ons selection, live pricing calculator, and form validation complete.

Tasks:

- Create `/components/modal/sections/AddOns.tsx`
  - GHL Integration — radio group: None (default) / Basic +$97 / Advanced +$197
  - Checkboxes: Multi-Page +$47, Bilingual +$97, Logo Design +$75, Monthly Retainer +$50/mo
  - Value breakdown display showing included features and their values
  - Surfaces subtotal upward via `onChange` prop
  - Local component state only (not persisted)
- Create `/components/modal/sections/OrderSummary.tsx`
  - Live calculated base price (Authority/Trust single $250, multi $297, Custom $497)
  - Add-ons line items
  - One-time total
  - Monthly total (if retainer selected)
  - Estimated delivery timeframe (conditional based on selections)
  - Submit Order button — gold, full width, bold
  - Disabled until required fields filled: company name, email, at least one domain field
- Wire all sections into `OrderModal.tsx` in correct order:
  1. DesignSummary
  2. BusinessInfo
  3. DomainPreference
  4. ContentSection
  5. AddOns
  6. CustomInquiry
  7. OrderSummary

**Deliverable:** Full order form rendered, add-ons calculate live, submit button enables correctly.

---

### Sprint 9 — Email Handler & Submit Flow

**Goal:** Order submits, both emails send, localStorage clears on success.

Tasks:

- Create `/app/api/order/route.ts`
  - POST handler accepting full order payload
  - Client confirmation email via Resend
    - To: `formData.businessInfo.email`
    - Subject: "Your Order Has Been Received — Operation Profit Asset Recovery"
    - Body: Thank you message, full order summary, note that you'll follow up within 1 business day
  - Operator notification email via Resend
    - To: `process.env.NEXT_PUBLIC_NOTIFY_EMAIL`
    - Subject: "New Website Order — [Company Name] — [Template]"
    - Body: Structured copy-paste-ready spec covering Design, Business Info, Domain, Content, Add-Ons, Order Total, Custom Inquiry
  - Returns `{ success: true }` on success, `{ success: false, error }` on failure
- Wire submit in `OrderModal.tsx`
  - POST to `/api/order` with full payload
  - On success: call `clearDraft()`, show success message, close modal
  - On error: show error message, do not clear localStorage
- Final QA pass
  - Both template pages end-to-end
  - Custom inquiry path (`?custom=true`)
  - localStorage save and restore across refresh
  - Start Over clears state not localStorage
  - Start Fresh clears localStorage not state
  - Both emails arrive correctly formatted
  - Mobile responsive final check

**Deliverable:** Phase 2 complete. Full order flow live end-to-end.

---

## Deployment

- Push to GitHub repo: `op-templates`
- Import to Vercel as new project
- Add environment variables: `RESEND_API_KEY`, `NEXT_PUBLIC_NOTIFY_EMAIL`
- Add domain in Vercel: `operationprofitllc.info` (or `.store`)
- Add CNAME in Cloudflare pointing to `cname.vercel-dns.com` (DNS only, gray cloud)
- Verify in Vercel — SSL provisions automatically

---

## Sprint Summary

| Sprint | Phase | Focus               | Deliverable                                  |
| ------ | ----- | ------------------- | -------------------------------------------- |
| 1      | 1     | Foundation & Picker | Homepage live, routing wired                 |
| 2      | 1     | Section Components  | All 8 sections built                         |
| 3      | 1     | Customizer Panel    | Color + font picker working                  |
| 4      | 1     | Template Pages      | Both demos live, real-time customizer        |
| 5      | 2     | Persistence Layer   | localStorage hook + email formatter          |
| 6      | 2     | Modal Shell         | Modal open/close, Start Over, Design Summary |
| 7      | 2     | Form Sections       | All content sections, localStorage wired     |
| 8      | 2     | Add-Ons & Summary   | Live pricing, validation, submit enabled     |
| 9      | 2     | Email & Submit      | Full order flow, both emails, QA pass        |
