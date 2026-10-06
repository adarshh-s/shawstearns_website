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
| `/`         | Dubai skyline hero video that, on scroll (desktop, pinned), shrinks into the first of three service cards while the other two slide in with their own footage · Origin-style dark statement (words fill in on scroll) with RICS / CIOB / Chartered marks · "Why clients choose" as large footage cards · frosted promise card over a handshake video · sectors strip · lush full-bleed closing invitation |
| `/about`    | Video header · "We are not contractors / designers / suppliers" (struck through on scroll) · principles · five core values · frosted "Professional standards" card over a full-bleed image · CTA |
| `/services` | Video header · three disciplines as stacking cards, each with its own footage · interactive 8-step RIBA-aligned methodology (keyboard accessible tabs) · CTA |
| `/careers`  | Image header · join the practice · what we offer · application form with CV upload |
| `/contact`  | Image header · office, email and discretion details · map · enquiry form with RFP upload |

Navigation follows scale.com: a dismissible navy announcement strip, then a full-width header with the wordmark and links on the left and *Careers* / *Request a discussion* on the right. About and Services open full-width frosted panels (grouped links + a feature card) on hover or click; the other items dim while one is open. The header switches to white text automatically over dark sections. On phones, a square menu button opens a full-screen sheet with large items that slide into sub-menus. Menu contents live in `nav` and `announcement` in `site.js`.

## Content and media

- **All copy:** `src/content/site.js` (wrap words in `*asterisks*` for the gold serif-italic accent).
- **Typography:** Loretta Display Light for headings and display (with its italic for accent words), Poppins for everything else. Poppins loads from Google Fonts. Loretta Display is licensed — enable it by pasting your Adobe Fonts kit link where marked in `index.html`, or by adding `LorettaDisplay-Light.woff2` / `LorettaDisplay-LightItalic.woff2` to `public/fonts/` (see `public/fonts/README.txt`). Until then headings fall back to Newsreader Light.
- **Brand:** navy `#22355B`, gold `#9A8254` (deeper `#7A6540` for small text and buttons, for contrast), slate `#5A6C8C`, light `#F2F3F5` — set in the `@theme` block of `src/styles/globals.css`. Logo and mark are in `src/assets/` (inlined, so they take the text colour).
- **Video & photos:** `public/media/`. The home hero is a day-to-dusk time-lapse of the Dubai skyline (Pexels, 1080p, looped forward-and-back so it never jumps), and the home frosted card plays a handshake (Pexels). Other footage is mostly work-relevant — Dubai skylines, cranes, cost spreadsheets, an overhead planning meeting, signing a document, people at a window — with a few calm moments (dune, meadow, clouds) from Mixkit. Careers / Contact headers and the About card use the client's own photos (`public/media/images/`). Swap any file by keeping the same name.
- **Photos:** Unsplash IDs in `site.js` and a few components (`Difference.jsx`, `SectorsMosaic.jsx`, `CtaBand.jsx`). Swap for the client's photography before launch.
- **Brand textures:** the dotted waves (`ui/DotWave.jsx`) and marble (`ui/Marble.jsx`) are generated in code, so there are no image files to manage.

## Forms

The careers and enquiry forms validate in the browser and support file uploads. Set `forms.careersEndpoint` and `forms.enquiryEndpoint` in `site.js` to a form service or API that accepts multipart POSTs (e.g. Formspree, a CRM webhook) and submissions — including the CV / RFP file — are sent there. Until then, the forms open a pre-filled email and ask the sender to attach their file.

## Motion and accessibility

- Lenis smooth scrolling is driven by GSAP's ticker so scrubbed animations stay in sync.
- Restraint by design: generous whitespace, light serif headlines, one palette. Scroll effects are few and deliberate (pinned home hero, statement word-fill, image opening out behind the frosted card, Services stacking cards); everything else is a gentle reveal.
- With `prefers-reduced-motion`, Lenis is off, pinned sections render static versions, and videos show a still frame. Every video has a pause control.

## Deploying

Client-side routes need the host to serve `index.html` for every path. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.
