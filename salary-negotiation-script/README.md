# Salary Negotiation Script — Landing Page

A premium, conversion-focused landing page for the free resource
**"Salary Negotiation Script for Freshers"**. Pure HTML/CSS/JS — no
frameworks, no build step, zero external requests (fonts are self-hosted
as data URIs).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve salary-negotiation-script
```

## Structure

```
index.html            # semantic markup, every section commented
assets/css/fonts.css  # Bricolage Grotesque, Instrument Sans, Instrument Serif (inlined latin subsets)
assets/css/style.css  # design tokens + all component styles (light & dark themes)
assets/js/main.js     # scroll reveals, FAQ accordion, sticky mobile CTA, header state
```

## Before going live — replace the placeholders

1. **PDF link** — set `PDF_URL` at the top of `assets/js/main.js`.
   Until it's set, every download button scrolls to the final CTA.
2. **Photo** — swap the `.portrait` placeholder block in `index.html`
   with a real `<img>`.
3. **Stats** — replace the `XX,XXX+` values in the "Why listen to me" section.
4. **Logos** — replace the `.logo-slot` placeholders with real logo images.
5. **Testimonials** — swap the three placeholder quotes/avatars with real ones.

## Design system ("The offer letter, upgraded")

| Token | Light | Dark |
|---|---|---|
| `--paper` (ground) | `#FAFBF9` | `#0C1310` |
| `--ink` (text) | `#14231D` | `#E9F0EB` |
| `--accent` (money green) | `#0E8A5F` | `#3DD68C` |

Type: **Bricolage Grotesque** (display) · **Instrument Sans** (body) ·
**Instrument Serif italic** (emphasis words). All tokens live at the top
of `style.css` — reuse them for future pages in this family.
