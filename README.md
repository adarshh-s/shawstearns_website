# Shaw Stearns — website redesign

A five-page React site (Vite + Tailwind CSS v4) for Shaw Stearns, independent client-side advisors. Content is taken from the current shawstearns.com; layout and motion are new. Motion uses GSAP ScrollTrigger (scroll-synced effects) and Framer Motion (component and page transitions), with Lenis for smooth scrolling.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Pages

| Route       | Sections |
|-------------|----------|
| `/`         | Video hero that, on scroll (desktop, pinned), glides into a "What we protect" panel — capital, programme and reputation light up in turn, each with its own footage and a link to the relevant service; stacked version on phones · "Why clients choose" Origin-style dark bento · three services with live dotted-wave artwork · practice intro with a Refine-style beam panel · sectors mosaic · promise marquee · closing CTA |
| `/about`    | Video header · "We are not contractors / designers / suppliers" (struck through on scroll) · principles · five core values · pinned "We protect your capital / programme / reputation" sequence · CTA |
| `/services` | Video header · three disciplines as stacking cards · interactive 8-step RIBA-aligned methodology (keyboard accessible tabs) · CTA |
| `/careers`  | Image header · join the practice · what we offer · application form with CV upload |
| `/contact`  | Image header · office, email and discretion details · map · enquiry form with RFP upload |

Navigation follows scale.com: a dismissible navy announcement strip, then a full-width header with the wordmark and links on the left and *Careers* / *Request a discussion* on the right. About and Services open full-width frosted panels (grouped links + a feature card) on hover or click; the other items dim while one is open. The header switches to white text automatically over dark sections. On phones, a square menu button opens a full-screen sheet with large items that slide into sub-menus. Menu contents live in `nav` and `announcement` in `site.js`.

## Content and media

- **All copy:** `src/content/site.js` (wrap words in `*asterisks*` for the gold serif-italic accent).
- **Brand:** navy `#22355B`, gold `#9A8254` (deeper `#7A6540` for small text and buttons, for contrast), slate `#5A6C8C`, light `#F2F3F5` — set in the `@theme` block of `src/styles/globals.css`. Logo and mark are in `src/assets/` (inlined, so they take the text colour).
- **Video:** `public/media/` — Mixkit free-licence clips chosen to match the current site's subjects (Dubai skyline, offices). Replace with the client's own footage using the same file names.
- **Photos:** Unsplash IDs in `site.js` and a few components (`Difference.jsx`, `SectorsMosaic.jsx`, `CtaBand.jsx`). Swap for the client's photography before launch.
- **Brand textures:** the dotted waves (`ui/DotWave.jsx`) and marble (`ui/Marble.jsx`) are generated in code, so there are no image files to manage.

## Forms

The careers and enquiry forms validate in the browser and support file uploads. Set `forms.careersEndpoint` and `forms.enquiryEndpoint` in `site.js` to a form service or API that accepts multipart POSTs (e.g. Formspree, a CRM webhook) and submissions — including the CV / RFP file — are sent there. Until then, the forms open a pre-filled email and ask the sender to attach their file.

## Motion and accessibility

- Lenis smooth scrolling is driven by GSAP's ticker so scrubbed animations stay in sync.
- One pinned showpiece per page (home hero, About "We protect", Services stacking cards); everything else is a gentle reveal.
- With `prefers-reduced-motion`, Lenis is off, pinned sections render static versions, and videos show a still frame. Every video has a pause control.

## Deploying

Client-side routes need the host to serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.
