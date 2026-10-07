// Shaw Stearns — site content.
// Copy is taken from the current shawstearns.com (Home, About, Services, Careers, Contact).
// Imagery/video are licensed stock chosen to match the existing site's subjects
// (calm city skyline, premium offices, skyline at work); swap in the client's own
// media by replacing the files in /public/media or the Unsplash IDs below.
// Videos: Mixkit free licence (https://mixkit.co/license/).

export const site = {
  name: 'Shaw Stearns',
  tagline: 'Independent client-side advisors',
  email: 'enquiries@shawstearns.com',
  office: ['Office S05-104, Trade Centre First', 'Dubai, United Arab Emirates'],
  timezone: 'Asia/Dubai',
  mapQuery: 'Trade Centre First, Dubai, United Arab Emirates',
  promise: ['Independent', 'Client-Side', 'Uncompromising'],
  footerBlurb:
    'Independent client-side advisors delivering Project Management, Cost Management and Development Advisory across the UAE.',
}

// Form submission: set an endpoint (e.g. Formspree, a CRM webhook or your own API) to POST
// form data, including uploaded files. Left empty, forms fall back to opening an email draft.
export const forms = {
  enquiryEndpoint: '',
  careersEndpoint: '',
}

export const services = [
  {
    num: '01',
    slug: 'project-management',
    video: 'home',
    title: 'Project Management',
    summary: 'End-to-end owner’s representation from strategy through to handover.',
    body: 'End-to-end owner’s representation across the full project lifecycle. We develop the client brief, manage feasibility and strategy, establish budgets and control benchmarks, identify and manage risk, coordinate regulatory consents, advise on team selection, integrate design information, prepare programmes and Critical Path networks, advise on procurement strategies, conduct tender evaluation, administer contracts, and control progress through to final handover.',
    points: [
      'Client brief, feasibility & strategy',
      'Budgets, benchmarks & risk',
      'Regulatory consents & team selection',
      'Programmes & Critical Path networks',
      'Procurement, tender evaluation & contracts',
      'Progress control to final handover',
    ],
    wave: 'navy',
  },
  {
    num: '02',
    slug: 'cost-management',
    video: 'cost',
    title: 'Cost Management & Quantity Surveying',
    summary: 'Independent commercial control and final account certainty.',
    body: 'Independent commercial management grounded in RICS standards. We provide design economics and cost planning, quantification and costing, production of pricing documents, value engineering, whole-life costing, cash flow forecasting, interim valuations, cost reporting, cost-value reconciliation, and final account settlement.',
    points: [
      'Design economics & cost planning',
      'Quantification & pricing documents',
      'Value engineering & whole-life costing',
      'Cash flow forecasting',
      'Interim valuations & cost reporting',
      'Final account settlement',
    ],
    wave: 'slate',
  },
  {
    num: '03',
    slug: 'development-advisory',
    video: 'advisory',
    title: 'Development Advisory',
    summary: 'Feasibility, financial modelling and strategic advice from the earliest stages through to handover.',
    body: 'Clear, commercially robust advice from the earliest stages. Feasibility studies, development appraisals, financial modelling, option analysis and strategic guidance that protect capital and maximise value before major commitments are made.',
    points: ['Feasibility studies', 'Development appraisals', 'Financial modelling', 'Option analysis', 'Strategic guidance'],
    wave: 'gold',
  },
]

// Primary navigation (Scale-style header). Items with `menu` open a full-width panel:
// grouped links on the left, a feature card on the right. `key` matches the lazy page
// loaders (hover prefetch).
export const nav = [
  {
    to: '/about',
    key: 'about',
    label: 'About',
    menu: {
      groups: [
        {
          title: 'The practice',
          links: [
            { to: '/about', label: 'Our story' },
            { to: '/about#principles', label: 'Why pure client-side matters' },
            { to: '/about#values', label: 'Core values' },
          ],
        },
        { title: 'Join us', links: [{ to: '/careers', label: 'Careers' }] },
      ],
      feature: { image: '/media/window-poster.jpg', caption: 'Independent. Client-Side. Uncompromising.', to: '/about' },
    },
  },
  {
    to: '/services',
    key: 'services',
    label: 'Services',
    menu: {
      groups: [
        { title: 'Disciplines', links: services.map((s) => ({ to: `/services#${s.slug}`, label: s.title })) },
        {
          title: 'How we work',
          links: [
            { to: '/services#methodology', label: '8-step methodology' },
            { to: '/#sectors', label: 'Sectors' },
          ],
        },
      ],
      feature: { image: '/media/businessbay-poster.jpg', caption: 'Discipline over cost, programme and risk.', to: '/services' },
    },
  },
  { to: '/careers', key: 'careers', label: 'Careers' },
  { to: '/contact', key: 'contact', label: 'Contact' },
]

export const announcement = { label: 'We work with a limited number of clients', action: 'Request a discussion', to: '/contact' }

// Footage: a mix of work-relevant clips (skylines, construction, cost reporting, planning,
// signing, client discussions) and a few calm nature-meets-city moments that echo the
// client's own hero. The home hero IS the client's video (trees and grasses before the Dubai
// skyline, lightly enhanced and looped); the handshake is Pexels; the rest are Mixkit.
export const videos = {
  home: { src1080: '/media/home-1080.mp4', src720: '/media/home-720.mp4', poster: '/media/home-poster.jpg' },
  // relevant
  handshake: { src720: '/media/handshake-720.mp4', poster: '/media/handshake-poster.jpg' },
  cost: { src720: '/media/cost-720.mp4', poster: '/media/cost-poster.jpg' },
  advisory: { src720: '/media/advisory-720.mp4', poster: '/media/advisory-poster.jpg' },
  signing: { src720: '/media/signing-720.mp4', poster: '/media/signing-poster.jpg' },
  window: { src720: '/media/window-720.mp4', poster: '/media/window-poster.jpg' },
  skyline: { src720: '/media/skyline-720.mp4', poster: '/media/skyline-poster.jpg' },
  businessbay: { src720: '/media/businessbay-720.mp4', poster: '/media/businessbay-poster.jpg' },
  cranes: { src720: '/media/cranes-720.mp4', poster: '/media/cranes-poster.jpg' },
  // calm
  dune: { src720: '/media/dune-720.mp4', poster: '/media/dune-poster.jpg' },
  meadow: { src720: '/media/meadow-720.mp4', poster: '/media/meadow-poster.jpg' },
  clouds: { src720: '/media/clouds-720.mp4', poster: '/media/clouds-poster.jpg' },
}

// The client's own photography (from the current site).
export const photos = {
  lobby: '/media/images/About__Pic_1.jpg',
  careers: '/media/images/Careers-Page-photo.jpg',
  contact: '/media/images/contact-us-option-2.jpg',
}

export const images = {
  lobby: 'photo-1497366811353-6870744d04b2', // premium office interior (practice intro)
  boardroom: 'photo-1462826303086-329426d1aef5', // calm boardroom with skyline (contact)
  team: 'photo-1522071820081-009f0129c71c', // people at work (careers)
  skyline: 'photo-1512453979798-5ea266f8880c', // Dubai skyline (protect: capital)
  site: 'photo-1541888946425-d81bb19240f5', // site team (protect: programme)
  meeting: 'photo-1600880292203-757bb62b4baf', // client meeting (protect: reputation)
}

/* ───────────────────────────── Home ───────────────────────────── */

export const home = {
  hero: {
    label: 'Independent client-side advisors',
    title: 'Peace of mind, *delivered*.',
    sub: 'When Shaw Stearns is engaged, you gain certainty to protect your capital, your programme and your reputation.',
    primary: { label: 'Schedule a confidential discussion', to: '/contact' },
    secondary: { label: 'Explore our services', to: '/services' },
  },
  // Hero scroll sequence: the three things the practice protects (copy from the Services
  // methodology outcomes and the "Why clients choose" pillars).
  protect: {
    label: 'What we protect',
    title: 'Certainty for the three things that *matter* most.',
    items: [
      {
        name: 'Capital',
        title: 'We protect your *capital*.',
        body: 'Budgets locked with precision. Cost certainty achieved at every critical stage.',
        points: [
          'Formal Cost Plans 1, 2 and 3 at Concept, Developed and Technical Design',
          'Live cost monitoring, risk allowance management and gateway reporting',
          'Final Account prepared, negotiated and certified',
        ],
        link: { label: 'Cost Management & Quantity Surveying', to: '/services#cost-management' },
        media: 'video',
      },
      {
        name: 'Programme',
        title: 'We protect your *programme*.',
        body: 'Realistic timelines. Optimised value. Full commercial visibility for informed and confident decisions.',
        points: [
          'Master programme with key milestones agreed up front',
          'Programmes and Critical Path networks maintained throughout',
          'Proactive value engineering embedded at every gateway',
        ],
        link: { label: 'Project Management', to: '/services#project-management' },
        media: 'photo-1541888946425-d81bb19240f5',
      },
      {
        name: 'Reputation',
        title: 'We protect your *reputation*.',
        body: 'Disciplined governance and senior oversight that eliminate overruns and disputes.',
        points: [
          'Governance structure, approval gateways and communication protocols agreed',
          'Regulatory consents and stakeholder requirements coordinated',
          'Stringent change control from tender award onwards',
        ],
        link: { label: 'Why clients choose us', to: '/#difference' },
        media: 'photo-1600880292203-757bb62b4baf',
      },
    ],
  },
  intro: {
    quote: 'Independent. Client-Side. Uncompromising.',
    label: 'Shaw Stearns',
    lead: 'At Shaw Stearns we bring seasoned judgment and forward-looking strategy to development advisory, cost management and project delivery across every sector of the built environment. As an independent, people-driven consultancy we fuse rigorous technical capability with practical innovation and clear commercial insight to protect and grow value for our clients.',
    body: 'We work side-by-side with clients to synthesise solutions that perform in today’s market while positioning projects for long-term success — in the UAE and internationally, from focused schemes to large-scale programmes.',
    cta: { label: 'About the practice', to: '/about' },
  },
  difference: {
    label: 'The difference',
    title: 'Why clients choose *Shaw Stearns*',
    items: [
      {
        title: 'Certainty where it matters most',
        video: 'dune',
        body: 'Disciplined governance and senior oversight that eliminate overruns and disputes.',
      },
      {
        title: 'True independence',
        video: 'window',
        body: 'We work exclusively for you. No competing interests in the delivery supply chain.',
      },
      {
        title: 'Regulatory clarity',
        video: 'signing',
        body: 'Precise navigation of authority and stakeholder requirements to protect your programme, reputation and capital.',
      },
      {
        title: 'Chartered leadership',
        video: 'cranes',
        body: 'Led by Chartered Surveyors and Chartered Construction Managers applying rigorous British professional standards.',
      },
    ],
  },
  services: { label: 'Our services', title: 'Three disciplines. *One* point of accountability.' },
  sectors: {
    label: 'Sectors',
    title: 'Sectors we *serve*.',
    items: ['Corporate Real Estate', 'Retail', 'Hospitality', 'Mixed-Use', 'Healthcare', 'Defence'],
  },
}

// Refine-style full-width video banner (copy from the Contact page).
export const discretion = {
  label: 'Confidential by default',
  title: 'Every enquiry is treated with full *discretion*.',
  action: { label: 'Start a conversation', to: '/contact' },
}

export const cta = {
  label: 'A limited number of clients',
  title: 'Let’s discuss whether Shaw Stearns is the right fit for your *project*.',
  body: 'We work with a limited number of clients. Let’s discuss whether Shaw Stearns is the right fit for your project.',
  action: { label: 'Request a confidential discussion', to: '/contact' },
}

/* ───────────────────────────── About ───────────────────────────── */

export const about = {
  hero: {
    label: 'About',
    title: ['Independent. Client-Side.', '*Uncompromising.*'],
    sub: 'Shaw Stearns is a pure client-side boutique. We exist solely to protect the interests of owners and developers.',
  },
  notList: ['We are not contractors.', 'We are not designers.', 'We are not suppliers.'],
  exclusive: 'We work exclusively for you — with zero competing interests.',
  leadership:
    'Our practice is led by Chartered Surveyors and Chartered Construction Managers with proven experience on complex projects across the UAE. We bring senior oversight, commercial discipline and clear governance to every assignment.',
  principles: [
    {
      title: 'Why pure client-side matters',
      video: 'handshake',
      body: 'When advisors have relationships with contractors, suppliers or design firms, their advice can become compromised. Shaw Stearns has none. Our only interest is yours — protecting capital, programme and reputation without conflict.',
    },
    {
      title: 'Professional standards',
      video: 'signing',
      body: 'All work is conducted in accordance with the standards of the Royal Institution of Chartered Surveyors (RICS) and the Chartered Institute of Building (CIOB). Integrity, independence and professional conduct are non-negotiable.',
    },
    {
      title: 'Our mission',
      video: 'skyline',
      body: 'To protect the capital, programme and reputation of owners and developers through pure independent client-side advice — and to build a practice of lasting international standing.',
    },
    {
      title: 'Our ethos',
      video: 'window',
      body: 'We exist solely for the client. Independence is our mandate. Standards are never compromised. We are ambitious for the practice, but never at the expense of quality or independence.',
    },
  ],
  values: {
    label: 'Core values',
    title: 'Five principles that govern *every* assignment.',
    items: [
      { title: 'Independence', body: 'Exclusive loyalty to the client. No supply-chain conflicts.' },
      { title: 'Rigour', body: 'Disciplined commercial control and senior oversight on every project.' },
      { title: 'Integrity', body: 'Honesty and transparency in all dealings.' },
      { title: 'Excellence', body: 'The highest professional standards, continuously raised.' },
      { title: 'Progress', body: 'Building people and practice with the ambition to operate at international level.' },
    ],
  },
  // Pinned sequence (components/Protect.jsx)
  protect: {
    label: 'Expertise',
    intro:
      'Pure client-side project and cost management for complex developments across the UAE. Independent commercial control and senior leadership on high-value schemes.',
    items: [
      { text: 'We protect your *capital*.', image: 'photo-1512453979798-5ea266f8880c' },
      { text: 'We protect your *programme*.', image: 'photo-1541888946425-d81bb19240f5' },
      { text: 'We protect your *reputation*.', image: 'photo-1600880292203-757bb62b4baf' },
    ],
    cta: { label: 'Our services', to: '/services' },
  },
}

/* ───────────────────────────── Services ───────────────────────────── */

export const servicesPage = {
  hero: {
    label: 'Services',
    title: ['Discipline over cost,', 'programme and *risk*.'],
    sub: 'Complex projects demand rigorous control of cost, programme, risk and stakeholders. We deliver that control with clarity, discipline and complete independence.',
  },
  howWeWork: { label: 'How we work', title: 'Clarity, discipline and *complete* independence.' },
  method: {
    label: 'Our proven 8-step integrated methodology',
    title: 'One continuous line of *accountability*.',
    intro:
      'We work within the RIBA Plan of Work and apply our proven, industry-tested methodology — select any stage to see how we protect your project at each point in its lifecycle.',
    steps: [
      {
        name: 'Initiation',
        riba: 'RIBA Stage 0 — Strategic Definition',
        points: [
          'Establish project objectives, success criteria and stakeholder alignment',
          'Undertake initial feasibility appraisal, risk identification and high-level cost advice',
          'Agree governance structure, approval gateways and communication protocols',
        ],
        outcome: 'Investment protected and strategic direction locked before significant expenditure.',
      },
      {
        name: 'Communication',
        riba: 'RIBA Stage 1 — Preparation & Briefing',
        points: [
          'Develop robust project workflows, site investigation strategy and procurement route',
          'Establish formal communication channels and staged approval gateways',
          'Deliver initial cost plan and budget framework aligned to RICS standards',
        ],
        outcome: 'Ambiguity eliminated. Early cost intelligence secured. Decision-making accelerated.',
      },
      {
        name: 'Programme',
        riba: 'RIBA Stages 1–2 — Programme & Value Optimisation',
        points: [
          'Produce master programme with key milestones to be agreed and incorporated',
          'Embed proactive value engineering opportunities',
          'Prepare and update formal cost plans at key project gateways',
        ],
        outcome: 'Realistic timelines. Optimised value. Full commercial visibility for informed and confident decisions.',
      },
      {
        name: 'Cost',
        riba: 'RIBA Stages 2–4 — Cost Planning & Budget Certainty',
        points: [
          'Define and sign off scope with rigorous cost validation',
          'Develop formal Cost Plans (1, 2 and 3) at Concept, Developed and Technical Design',
          'Maintain live cost monitoring, risk allowance management and gateway reporting',
        ],
        outcome: 'Budgets locked with precision. Cost certainty achieved at every critical stage.',
      },
      {
        name: 'Design',
        riba: 'RIBA Stages 2–4 — Design Development & Cost Integration',
        points: [
          'Conduct continuous cost review and benchmarking against formal cost plans',
          'Enforce design-to-cost discipline with price negotiation support',
          'Coordinate design information to procurement-ready standard',
        ],
        outcome: 'Designs remain affordable and value-maximised. Budget integrity protected throughout.',
      },
      {
        name: 'Procurement',
        riba: 'RIBA Stages 4–5 — Procurement Strategy & Tendering',
        points: [
          'Develop optimal procurement strategy and prepare comprehensive tender documentation, including form of contract and risk allocation matrix',
          'Prepare pre-tender estimate and cost check prior to issue of tenders',
          'Manage tender process, submittals, technical and commercial evaluations and recommendations',
          'Administer stringent change control procedures from tender award onwards',
        ],
        outcome:
          'Competitive, fully documented tenders. Clear risk allocation locked into the contract. Variations minimised from day one.',
      },
      {
        name: 'Construction',
        riba: 'RIBA Stage 5 — Construction Phase Control',
        points: [
          'Deliver real-time cost monitoring, interim valuations and progress reporting',
          'Apply strict change request protocols and variation management',
          'Provide regular cost reports and risk reviews',
        ],
        outcome: 'Construction phase rendered predictable. Budgets safeguarded. Full client visibility maintained.',
      },
      {
        name: 'Handover',
        riba: 'RIBA Stages 6–7 — Completion & Final Account',
        points: [
          'Prepare, negotiate and certify the Final Account with full supporting documentation',
          'Ensure the contractor submits all contractually required handover documentation, as-built records and manuals',
          'Conduct project close-out review and capture lessons learned',
        ],
        outcome:
          'Clean, certified final account. Full contractual documentation secured. Project commercially closed with zero outstanding liabilities.',
      },
    ],
  },
}

/* ───────────────────────────── Careers ───────────────────────────── */

export const careers = {
  hero: {
    label: 'Careers',
    title: ['Grow with', '*purpose*.'],
    sub: 'We welcome both experienced Chartered professionals and motivated graduates who want to build a career in project and cost management.',
  },
  join: {
    label: 'Join the practice',
    body: 'Shaw Stearns is a pure client-side practice. We work exclusively for owners and developers on complex projects across the UAE. We believe in developing talent. We welcome both experienced Chartered professionals and motivated graduates who want to build a career in project and cost management.',
  },
  offer: {
    label: 'What we offer',
    items: [
      'Direct exposure to high-value projects',
      'Mentorship from Chartered Surveyors and Chartered Construction Managers',
      'A clear focus on professional standards and commercial discipline',
      'The opportunity to grow within a focused, independent practice',
      'Access to external training and professional certifications',
      'The opportunity for international exchanges as the practice grows globally',
    ],
  },
  closing:
    'Whether you are already Chartered or at the start of your career, we are interested in hearing from people who take pride in their work and want to develop to the highest standard.',
  apply: {
    label: 'Start the conversation',
    title: 'Interested in joining *Shaw Stearns*?',
    body: 'Send your CV and a short note about what you’re looking for — we review every application personally.',
  },
}

/* ───────────────────────────── Contact ───────────────────────────── */

export const contact = {
  hero: {
    label: 'Contact',
    title: ['Start a', '*conversation*.'],
    sub: 'We offer private discussions to explore whether Shaw Stearns is the right partner for your project.',
  },
  details: [
    { label: 'Office', lines: site.office, icon: 'pin' },
    { label: 'Email', lines: [site.email], href: `mailto:${site.email}`, icon: 'mail' },
    { label: 'Discretion', lines: ['Confidential by default', 'Every enquiry is treated with full discretion'], icon: 'lock' },
  ],
}
