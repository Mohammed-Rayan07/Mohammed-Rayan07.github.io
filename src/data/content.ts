// Every fact in the archive lives here. Edit this file to update the portfolio.

export const survivor = {
  name: 'Mohammad Rayan',
  firstName: 'Mohammad',
  lastName: 'Rayan',
  callsign: 'RAYAN',
  recordId: 'MR-07',
  designation: 'AI engineer and builder',
  role: 'B.Tech AI Engineering, 2nd year',
  base: 'NITK Surathkal, India',
  origin: 'Riyadh, Saudi Arabia',
  photo: '/img/rayan.jpg',
  primaryFunction: 'Turning messy problems into working AI systems',
  principle: 'Don’t just make the model smarter. Build the system around it.',
  intro:
    'I spend far more time building things than talking about building them. Voice agents, multi-agent systems, business automation, dashboards and digital products, usually starting from a real problem, a rough idea and an unreasonable amount of debugging.',
  interests: ['AI agents', 'Automation', 'Applied AI', 'Systems', 'Product building'],
  knownFor: ['AI agents', 'Automation', 'Voice AI', 'Product building', 'System design'],
  status: ['Online', 'Building', 'Iterating'],
}

export const links = {
  github: 'https://github.com/Mohammed-Rayan07',
  linkedin: 'https://www.linkedin.com/in/mohammed-rayan-835118389/',
  email: 'rayan2017mmr@gmail.com',
}

/* ───────────── Survivor's log ───────────── */

export type LogEntry = {
  id: string
  stamp: string
  title: string
  body: string
  kind: 'origin' | 'build' | 'hackathon' | 'now'
  project?: string
}

export const log: LogEntry[] = [
  {
    id: 'riyadh',
    stamp: 'Origin',
    kind: 'origin',
    title: 'Grew up in Riyadh',
    body: 'Raised in Riyadh, Saudi Arabia. Somewhere along the way, learning about technology stopped being enough. I wanted to build things with it.',
  },
  {
    id: 'nitk',
    stamp: '2025',
    kind: 'origin',
    title: 'Moved to India for AI engineering',
    body: 'Joined B.Tech AI Engineering at NITK Surathkal, carrying one question: what can this technology actually do outside a notebook or a classroom?',
  },
  {
    id: 'linreg',
    stamp: 'Apr 2026',
    kind: 'build',
    title: 'Took the black box apart',
    body: 'Rebuilt linear regression three ways to see what the libraries hide, including the learning rate that sends everything to NaN.',
    project: 'linreg',
  },
  {
    id: 'raynix',
    stamp: 'Jul 2026',
    kind: 'build',
    title: 'Interviewed an operator, then built eight agents',
    body: 'Mapped where a Saudi medical-logistics operation was losing time and money before writing a line of code, then turned it into an eight-agent suite.',
    project: 'raynix',
  },
  {
    id: 'rcie',
    stamp: 'Sep 2026',
    kind: 'hackathon',
    title: 'Razorpay AI Buildathon',
    body: 'Track 02, AI Risk Manager. Built an engine that asks whether the evidence supports this claim, rather than guessing whether a photo is AI-made.',
    project: 'rcie',
  },
  {
    id: 'stockpilot',
    stamp: 'Sep 2026',
    kind: 'build',
    title: 'Spec first, then code',
    body: 'StockPilot for a technical interview: wrote the specification before any code and closed the double-sale race with one row lock.',
    project: 'stockpilot',
  },
  {
    id: 'bfb',
    stamp: '26–27 Sep 2026',
    kind: 'hackathon',
    title: 'Build for Billions, NITK',
    body: 'Lead engineer and system architect for Team AlgoHunters. Conceived Advocall, an AI that calls customer care for you in Kannada, Hindi or English.',
    project: 'advocall',
  },
  {
    id: 'sm',
    stamp: '3–4 Oct 2026',
    kind: 'now',
    title: 'Silicon Maze: Doomsday Edition',
    body: 'Twenty-four hours. Built J.A.R.V.I.S., a voice command centre that runs a real calendar, drive and Telegram, then wrote this archive before the network went dark.',
    project: 'jarvis',
  },
]

/** Things on the record that don't sit on a single date. */
export const fieldRecord: { title: string; body: string; badge?: string; project?: string }[] = [
  {
    badge: 'Winner',
    title: 'L&T Finance × Incub8 NITK Farmer Income Prediction Challenge',
    body: 'Best score in the predictive-modelling challenge and a ₹10,000 prize.',
  },
  {
    badge: 'Founder',
    title: 'Raynix AI',
    body: 'An AI automation studio: receptionists, lead response, appointment booking, WhatsApp automation and review reactivation for clinics, real estate, automotive and other service businesses.',
  },
  {
    badge: 'Shipped',
    title: 'A voice dispatcher I broke on purpose',
    body: 'Ran call after call against a UK roadside-recovery voice agent until every failure had a name, then re-architected it to finish calls with a dispatch-ready ticket.',
    project: 'dispatch',
  },
  {
    badge: 'Live',
    title: 'Ayah Archive',
    body: 'Built and monetised a digital-product business around Quran memorisation, and learned that building the product is only half the problem.',
    project: 'ayah',
  },
]

export const layers = [
  {
    name: 'Intelligence',
    items: 'LLMs, AI agents, conversational systems, classification, extraction, reasoning, multimodal workflows.',
  },
  {
    name: 'Systems',
    items: 'APIs, webhooks, CRM integrations, automation, databases, adapters, dashboards, observability, validation, fallbacks, deployment.',
  },
  {
    name: 'Outcomes',
    items: 'Lead qualification, booking, customer support, operations, logistics, retention, sales, digital products.',
    note: 'The layer I care about most.',
  },
]

export const dossier = {
  education: {
    degree: 'B.Tech, Artificial Intelligence Engineering',
    school: 'NITK Surathkal',
    year: '2nd year',
    coursework: ['Algorithms', 'Probability and statistics', 'Discrete mathematics', 'Computer networks', 'Machine intelligence'],
  },
  crews: ['IET NITK', 'Team AlgoHunters', 'Raynix AI (founder)', 'NITK’s AI and entrepreneurship ecosystem'],
  offDuty: ['Fitness and powerlifting', 'Entrepreneurship', 'Trying every new AI tool', 'Turning random ideas into working products'],
  objective: 'Build systems that are technically solid enough to work in the real world, and useful enough that someone would actually pay for them.',
  mission: 'Keep building until the experiments stop being experiments and start becoming companies.',
  lesson: [
    'The difficult part usually isn’t making an LLM produce text.',
    'It’s designing a system that knows when to use AI, when not to, how to validate what it produced, what happens when an API fails, and when a human should take over.',
  ],
}

export const stats = [
  { value: '8', label: 'records in this archive' },
  { value: '₹10k', label: 'prize, Farmer Income Prediction Challenge' },
  { value: '8', label: 'agents in one medical-logistics suite' },
  { value: '3', label: 'languages my voice agent speaks' },
]

/* ───────────── Arsenal ───────────── */

export type Skill = {
  id: string
  name: string
  icon?: string // simple-icons export name
  glyph?: string // lucide fallback key (see SkillIcon)
  note: string
  projects: string[]
}

export type SkillCategory = {
  id: string
  name: string
  blurb: string
  skills: Skill[]
}

export const arsenal: SkillCategory[] = [
  {
    id: 'lang',
    name: 'Languages',
    blurb: 'What I think in.',
    skills: [
      { id: 'ts', name: 'TypeScript', icon: 'siTypescript', note: 'Strict mode, everywhere I can.', projects: ['jarvis', 'advocall', 'raynix', 'rcie', 'stockpilot', 'ayah'] },
      { id: 'py', name: 'Python', icon: 'siPython', note: 'ML experiments and prediction work.', projects: ['linreg'] },
      { id: 'js', name: 'JavaScript', icon: 'siJavascript', note: 'The runtime underneath it all.', projects: ['jarvis', 'advocall', 'stockpilot', 'raynix'] },
      { id: 'sql', name: 'SQL', glyph: 'database', note: 'Row locks, ledgers, reconciliation.', projects: ['stockpilot'] },
    ],
  },
  {
    id: 'ai',
    name: 'AI and ML',
    blurb: 'Models that plan, code that decides.',
    skills: [
      { id: 'llm', name: 'LLM APIs', glyph: 'brain', note: 'Gemini, Claude, OpenAI, with fallback chains.', projects: ['jarvis', 'advocall', 'rcie', 'stockpilot', 'raynix', 'dispatch'] },
      { id: 'agents', name: 'Tool-calling agents', glyph: 'bot', note: 'Allowlisted tools, approval gates.', projects: ['jarvis', 'advocall', 'raynix', 'stockpilot', 'dispatch'] },
      { id: 'aisdk', name: 'Vercel AI SDK', icon: 'siVercel', note: 'Structured output, model fallback.', projects: ['jarvis'] },
      { id: 'validation', name: 'Output validation', glyph: 'check', note: 'Zod schemas, confirm-back, repair paths.', projects: ['jarvis', 'advocall', 'stockpilot', 'dispatch'] },
      { id: 'injection', name: 'Prompt-injection defence', glyph: 'shield', note: 'Fence untrusted text as data.', projects: ['rcie', 'stockpilot'] },
      { id: 'ml', name: 'Predictive modelling', glyph: 'trend', note: 'Won the Farmer Income Prediction Challenge.', projects: ['linreg'] },
      { id: 'numpy', name: 'NumPy and Matplotlib', icon: 'siNumpy', note: 'Optimisation from first principles.', projects: ['linreg'] },
    ],
  },
  {
    id: 'voice',
    name: 'Voice AI',
    blurb: 'Agents that survive a noisy phone line.',
    skills: [
      { id: 'vapi', name: 'Vapi', glyph: 'phone', note: 'Assistants, transfers, DTMF menus.', projects: ['advocall', 'dispatch'] },
      { id: 'eleven', name: 'ElevenLabs', icon: 'siElevenlabs', note: 'Neural voices, cached lines.', projects: ['jarvis', 'advocall'] },
      { id: 'twilio', name: 'Twilio', glyph: 'phoneCall', note: 'PSTN numbers and SMS.', projects: ['advocall'] },
      { id: 'turns', name: 'Turn-taking and slot capture', glyph: 'audio', note: 'Endpointing, postcodes, registrations.', projects: ['dispatch', 'advocall', 'jarvis'] },
      { id: 'webaudio', name: 'Web Speech and Web Audio', glyph: 'mic', note: 'Hands-free listening, live spectrum.', projects: ['jarvis'] },
    ],
  },
  {
    id: 'auto',
    name: 'Automation and integrations',
    blurb: 'Where AI meets real operations.',
    skills: [
      { id: 'n8n', name: 'n8n', icon: 'siN8n', note: 'Workflows for client automations.', projects: [] },
      { id: 'make', name: 'Make', icon: 'siMake', note: 'No-code glue between services.', projects: [] },
      { id: 'webhooks', name: 'APIs and webhooks', glyph: 'webhook', note: 'Event-driven, idempotent handlers.', projects: ['advocall', 'jarvis', 'dispatch'] },
      { id: 'crm', name: 'CRM integrations', glyph: 'contacts', note: 'Leads, bookings, follow-ups.', projects: [] },
      { id: 'whatsapp', name: 'WhatsApp automation', icon: 'siWhatsapp', note: 'Lead response and reactivation.', projects: ['raynix'] },
      { id: 'gapi', name: 'Google Calendar and Drive', icon: 'siGooglecalendar', note: 'OAuth, timezone-safe events.', projects: ['jarvis'] },
      { id: 'tg', name: 'Telegram Bot API', icon: 'siTelegram', note: 'Contacts, groups, reminders.', projects: ['jarvis'] },
    ],
  },
  {
    id: 'web',
    name: 'Web and data',
    blurb: 'Interfaces and storage that hold up.',
    skills: [
      { id: 'next', name: 'Next.js', icon: 'siNextdotjs', note: 'App Router, route handlers, SSE.', projects: ['jarvis', 'advocall', 'stockpilot', 'raynix', 'ayah'] },
      { id: 'react', name: 'React', icon: 'siReact', note: 'React 19, hooks, composition.', projects: ['jarvis', 'advocall', 'stockpilot', 'raynix', 'ayah'] },
      { id: 'node', name: 'Node.js', icon: 'siNodedotjs', note: 'APIs, adapters, agent bridges.', projects: ['jarvis', 'advocall', 'rcie', 'stockpilot', 'raynix'] },
      { id: 'tw', name: 'Tailwind CSS', icon: 'siTailwindcss', note: 'v4, tokens, dense dashboards.', projects: ['jarvis', 'advocall', 'stockpilot', 'ayah'] },
      { id: 'pg', name: 'PostgreSQL', icon: 'siPostgresql', note: 'FOR UPDATE locks, append-only ledgers.', projects: ['stockpilot'] },
      { id: 'drizzle', name: 'Drizzle ORM', icon: 'siDrizzle', note: 'Typed schema and migrations.', projects: ['stockpilot'] },
    ],
  },
  {
    id: 'ship',
    name: 'Shipping and product',
    blurb: 'How the work leaves my machine and earns its keep.',
    skills: [
      { id: 'git', name: 'Git and GitHub', icon: 'siGithub', note: 'Small commits, readable history.', projects: ['jarvis', 'advocall', 'rcie', 'stockpilot', 'raynix', 'linreg'] },
      { id: 'vercel', name: 'Vercel', icon: 'siVercel', note: 'Preview and production deploys.', projects: ['stockpilot'] },
      { id: 'vitest', name: 'Vitest', icon: 'siVitest', note: 'Tests against a real database.', projects: ['advocall', 'stockpilot'] },
      { id: 'adapters', name: 'Mock and live adapters', glyph: 'plug', note: 'Every service swappable by one flag.', projects: ['advocall', 'raynix', 'rcie'] },
      { id: 'funnels', name: 'Funnels and payments', glyph: 'funnel', note: 'Positioning, checkout, upsells, email.', projects: ['ayah'] },
      { id: 'aicode', name: 'AI coding agents', icon: 'siClaude', note: 'Spec-first, agent-assisted builds.', projects: ['jarvis', 'stockpilot', 'raynix'] },
    ],
  },
]

/* ───────────── Archives ───────────── */

export type Project = {
  id: string
  code: string
  name: string
  tagline: string
  event: string
  year: string
  role?: string
  oneLiner: string
  problem: string
  does: string[]
  how: string[]
  failures?: string[]
  fixes?: string[]
  proof: { value: string; label: string }[]
  stack: string[] // skill ids
  extraStack?: string[] // shown as plain tags, not in the arsenal
  images: { src: string; alt: string; caption: string; tone?: 'invert' }[]
  repo?: string
  live?: string
  sealed?: string // why there is no public source
  status: 'Operational' | 'Archived' | 'Field-tested' | 'Live'
}

export const projects: Project[] = [
  {
    id: 'jarvis',
    code: 'JRV-01',
    name: 'J.A.R.V.I.S. × Doomsday',
    tagline: 'Tony Stark’s AI command centre',
    event: 'Silicon Maze 2026',
    year: 'Oct 2026',
    oneLiner:
      'Talk to it and it runs your real Google Calendar, Google Drive and Telegram, and shows every action as it happens.',
    problem:
      'Voice assistants answer questions. Very few can safely carry out a chain of real actions, like booking a meeting, setting a reminder before it and messaging the attendee, without doing something you did not mean.',
    does: [
      'Schedules, finds and reschedules calendar events, timezone-safe',
      'Uploads and searches Drive files with a live progress card',
      'Messages contacts and team groups on Telegram',
      'Hands-free LIVE voice mode with a neural voice and about two seconds per turn',
      'Chains multi-step orders: “schedule it, remind me 30 minutes before, tell Bruce”',
    ],
    how: [
      'The language model only plans. It returns fully resolved arguments and never touches an API.',
      'A deterministic executor runs the plan, so confirm, cancel and retry are simple.',
      'Gemini fallback chain with timeouts and cool-downs, plus a rule-based backup brain when every model is down.',
      'Google tokens live in an encrypted httpOnly cookie.',
    ],
    proof: [
      { value: '~2s', label: 'voice turn-around' },
      { value: '3', label: 'live integrations' },
      { value: '4', label: 'fallback layers' },
    ],
    stack: ['ts', 'next', 'react', 'tw', 'aisdk', 'llm', 'agents', 'validation', 'eleven', 'webaudio', 'gapi', 'tg'],
    images: [
      {
        src: '/projects/jarvis-order.jpg',
        alt: 'JARVIS has planned a Telegram message to Bruce and is waiting for authorisation before sending it',
        caption: 'An order in flight: the model planned it, and nothing is sent until Tony authorises. (Contact redacted.)',
      },
      {
        src: '/projects/jarvis-console.png',
        alt: 'JARVIS console: a comms panel with suggested orders on the left and a live preview pane on the right',
        caption: 'The command console. Orders on the left, a live preview of every action on the right.',
      },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/jarvis-doomsday',
    status: 'Operational',
  },
  {
    id: 'advocall',
    code: 'ADV-02',
    name: 'Advocall',
    tagline: 'Your AI advocate on every customer-care call',
    event: 'Build for Billions 2026, NITK',
    year: 'Sep 2026',
    role: 'Lead engineer and system architect, Team AlgoHunters',
    oneLiner:
      'An AI voice agent that calls your bank or telecom company for you, waits on hold, argues using the exact rule they are bound by, and calls you back in your own language.',
    problem:
      'A failed UPI payment must be reversed by T+1, with ₹100 a day compensation after that. The rule exists, but it only helps people who know it, can wait on hold and can argue fluently in English.',
    does: [
      'Takes the complaint by voice from any phone, in Kannada, Hindi or English',
      'Matches the case to a source-linked rule and computes the deadline and compensation',
      'Calls the company, says it is an AI, gets through the phone menu and waits on hold',
      'Brings you in only for OTP or KYC, and never hears your credentials',
      'Calls back with the ticket number, then drafts an ombudsman complaint if the deadline is missed',
    ],
    how: [
      'Two voice legs, intake and advocate call, share one reasoning core.',
      'The model extracts, plans and phrases. Deadlines, compensation and escalation are plain code.',
      'Every external service sits behind a mock-or-live adapter, so the whole flow runs on test data.',
      'Every action is an event on the case timeline, which doubles as the audit trail.',
    ],
    proof: [
      { value: '3', label: 'Indian languages' },
      { value: '2', label: 'push-backs, then escalate' },
      { value: '0', label: 'credentials ever heard' },
    ],
    stack: ['ts', 'next', 'react', 'tw', 'vapi', 'twilio', 'eleven', 'turns', 'agents', 'validation', 'webhooks', 'adapters', 'vitest'],
    images: [
      {
        src: '/projects/advocall-dashboard.png',
        alt: 'Advocall dashboard: a failed ₹4,500 UPI case against HDFC Bank, the RBI rule applied, and a live Hindi transcript',
        caption: 'A full demo case: ₹4,500 failed UPI, the RBI rule, ₹5,500 committed, transcript in Hindi.',
      },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/advocall',
    status: 'Field-tested',
  },
  {
    id: 'raynix',
    code: 'RAY-03',
    name: 'Raynix MedLog Agent Suite',
    tagline: 'Eight agents for medical logistics',
    event: 'Raynix AI',
    year: 'Jul 2026',
    oneLiner:
      'Eight plug-and-play AI agents for a medical-supplies distributor in Saudi Arabia: complaints, invoices, reports, driver check-ins, stock-outs, live status, audits and recalls, in Arabic and English.',
    problem:
      'I didn’t start with “let’s build an agent”. I interviewed an experienced operator and mapped where time and money were being lost: bilingual complaints, invoice mismatches, cold-chain incidents, recalls nobody acknowledged.',
    does: [
      'Triages bilingual complaints and escalates cold-chain issues to a human',
      'Matches invoice, purchase order and goods receipt and explains the variance',
      'Forecasts days of cover and raises tiered stock-out alerts',
      'Dispatches recalls, tracks acknowledgements and escalates missed deadlines',
      'An operations cockpit that drives all eight agents from a browser',
    ],
    how: [
      'Every external connection sits behind an adapter with a mock branch. Going live is a config change.',
      'Without a known answer, the agent takes its human hand-off path instead of inventing one.',
      'The cockpit is a skin over the real agent functions. Nothing on screen is scripted.',
      'Full right-to-left Arabic, including the agents’ own output.',
    ],
    proof: [
      { value: '8', label: 'agents' },
      { value: '9/9', label: 'end-to-end demos green' },
      { value: 'AR+EN', label: 'with real RTL' },
    ],
    stack: ['ts', 'node', 'next', 'react', 'agents', 'llm', 'adapters', 'whatsapp'],
    images: [
      { src: '/projects/raynix-cockpit-p1-desk.jpg', alt: 'An Arabic cold-chain complaint escalated to a human in the Raynix cockpit', caption: 'Complaint desk: an Arabic cold-chain complaint, escalated to a human.' },
      { src: '/projects/raynix-cockpit-p2-three-way-match.jpg', alt: 'Invoice, purchase order and goods receipt compared side by side', caption: 'Invoice desk: the three-way match and its exact variance.' },
      { src: '/projects/raynix-cockpit-p8-recall-rtl.jpg', alt: 'The recall tracker in Arabic with a deadline countdown', caption: 'Recall tracker, right to left.' },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/raynix-medlog-suite',
    status: 'Field-tested',
  },
  {
    id: 'dispatch',
    code: 'VXD-04',
    name: 'Roadside Recovery Voice Dispatcher',
    tagline: 'A voice agent I broke on purpose',
    event: 'Raynix AI',
    year: '2026',
    oneLiner:
      'An AI voice dispatcher for UK roadside recovery that takes a breakdown call and finishes with an accurate, dispatch-ready ticket.',
    problem:
      'A naive voice agent sounds impressive for thirty seconds, then falls apart the moment it has to capture a postcode or a registration number over a noisy phone line.',
    does: [
      'Answers breakdown calls and gathers location, vehicle and situation',
      'Captures postcodes and registration numbers, and confirms them against a lookup',
      'Recovers from mishearing through retry and repair paths',
      'Produces a structured ticket a recovery driver can act on',
    ],
    how: [
      'Repeated test calls, each failure logged and named.',
      'The fix wasn’t a cleverer prompt. It became an architecture problem.',
      'Validation and lookup-based confirmation for critical alphanumeric details.',
      'Retry and repair paths, fallback mechanisms, tighter tool boundaries and better turn-taking.',
    ],
    failures: [
      'Hallucinated registrations',
      'Mangled postcodes',
      'Endpointing failures',
      'Slot confusion',
      'Dead air',
      'Repetitive responses',
      'Incorrect data extraction',
    ],
    fixes: [
      'Validation',
      'Lookup-based confirmation',
      'Retry and repair paths',
      'Fallback mechanisms',
      'Tighter tool boundaries',
      'Better turn-taking',
    ],
    proof: [
      { value: '7', label: 'failure modes named on test calls' },
      { value: '6', label: 'architectural fixes' },
      { value: '1', label: 'dispatch-ready ticket per call' },
    ],
    stack: ['vapi', 'turns', 'llm', 'agents', 'validation', 'webhooks'],
    images: [
      {
        src: '/projects/dispatch-incidents.svg',
        alt: 'Incident board: seven failure modes logged on test calls beside the six architectural fixes that replaced the naive design',
        caption: 'The incident board: every way the first version failed, and what the architecture added.',
      },
    ],
    sealed: 'Client-style build. Source is private.',
    status: 'Field-tested',
  },
  {
    id: 'rcie',
    code: 'RCI-05',
    name: 'Refund Claim Integrity Engine',
    tagline: 'Does the evidence support this claim?',
    event: 'Razorpay AI Buildathon 2026',
    year: 'Sep 2026',
    oneLiner:
      'Checks whether a refund claim is actually supported by its evidence before the merchant’s money leaves, without trying to guess whether a photo is AI-generated.',
    problem:
      'Generative AI makes fake damage photos free. AI-image detectors are unreliable, and they also flag genuinely damaged goods, which punishes honest customers.',
    does: [
      'Runs every claim through five layers, cheapest first',
      'Rejects impossible claims (wrong amount, wrong SKU, outside window) with no model call',
      'Catches reused photos with perceptual hashing',
      'Asks a multimodal model whether the photo shows this item with this damage, and lets it abstain',
      'Recommends approve, review or deny to a human. It never moves money',
    ],
    how: [
      'L0 sanitiser fences claim text as data and flags injection attempts.',
      'L1 deterministic gate, L2 reuse check, L3 claim-conditioned verifier, L4 cost-weighted decision.',
      'A circuit breaker sends anything uncertain to human review.',
      'Every decision is logged and can be replayed.',
    ],
    proof: [
      { value: '1.0', label: 'confidence on the wrong-product case' },
      { value: '102', label: 'real FraudBench images' },
      { value: '42.5%', label: 'resolved without a model call' },
    ],
    stack: ['ts', 'node', 'llm', 'injection', 'validation', 'adapters'],
    images: [
      {
        src: '/projects/rcie-dashboard.png',
        alt: 'RCIE dashboard: claims processed, money held and released, review queue depth',
        caption: '113 claims processed, 48 resolved before any model was called.',
      },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/refund-claim-integrity',
    status: 'Archived',
  },
  {
    id: 'stockpilot',
    code: 'STK-06',
    name: 'StockPilot',
    tagline: 'Inventory where the last unit can’t sell twice',
    event: 'Technical interview build',
    year: 'Sep 2026',
    oneLiner:
      'Multi-tenant inventory, sales and reorder planning for small businesses, with an AI assistant that can read and propose but never write without approval.',
    problem:
      'Two cashiers sell the last unit at the same moment and both sales succeed. An AI assistant with write access makes the same mistake faster.',
    does: [
      'Tracks products, suppliers and sales per business',
      'Decrements stock atomically and proves every change against a ledger',
      'Analytics, and a reorder advisor that drafts purchase orders',
      'An AI assistant whose every write becomes a proposal waiting for a human',
    ],
    how: [
      'recordSale takes a SELECT … FOR UPDATE row lock before checking stock.',
      'An append-only movements ledger and one query prove stock is right.',
      'Approving a proposal is one conditional UPDATE, closing the double-approval race.',
      'Cross-tenant lookups return 404, never 403, so ids can’t be probed.',
    ],
    proof: [
      { value: '24', label: 'tests on a real database' },
      { value: '0', label: 'AI paths straight to a write' },
      { value: '404', label: 'for every cross-tenant id' },
    ],
    stack: ['ts', 'next', 'react', 'tw', 'pg', 'drizzle', 'sql', 'llm', 'agents', 'validation', 'injection', 'vitest', 'vercel'],
    images: [
      {
        src: '/projects/stockpilot-schematic.svg',
        alt: 'Two checkouts race for the last unit: one takes the row lock and sells, the other waits and is told it is out of stock',
        caption: 'The race StockPilot closes: one row lock, one sale, one honest “out of stock”.',
      },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/stockpilot',
    live: 'https://stockpilot-ten-beryl.vercel.app',
    status: 'Operational',
  },
  {
    id: 'ayah',
    code: 'AYA-07',
    name: 'Ayah Archive',
    tagline: 'A digital-product business, end to end',
    event: 'Product build',
    year: '2026',
    oneLiner:
      'A Quran-memorisation guide bundled with a habit tracker and a Ramadan guide, sold from a live storefront. I built and monetised it, and I’m now rebuilding the funnel from scratch in Next.js.',
    problem:
      'Engineers tend to stop at “it works”. A product also needs attention, positioning, conversion, pricing and retention, and a system that connects them. Ayah Archive was where I learned that distribution is half the problem.',
    does: [
      'Live storefront at ayaharchive.shop with a clear offer and positioning',
      'A three-part bundle: the Mastery Guide, a habit tracker and a Ramadan guide',
      'Launch pricing at $12.99 against a $69 anchor',
      'In the rebuild: a free 7-day blueprint as a lead magnet, geo-priced checkout, upsells and automated delivery',
    ],
    how: [
      'The live store was built fast with Lovable to test the offer with real buyers.',
      'The rebuild is a Next.js funnel, built one approved phase at a time.',
      'Rebuild stack: Dodo Payments for checkout, Supabase, Cloudflare R2 for files, Resend for email.',
      'Every decision starts from distribution, not from the product.',
    ],
    proof: [
      { value: '3', label: 'products in the bundle' },
      { value: '$12.99', label: 'launch price, from $69' },
      { value: 'Live', label: 'storefront, monetised' },
    ],
    stack: ['funnels', 'ts', 'next', 'react', 'tw'],
    extraStack: ['Lovable (live store)', 'Dodo Payments (rebuild)', 'Supabase (rebuild)', 'Cloudflare R2 (rebuild)', 'Resend (rebuild)'],
    images: [
      {
        src: '/projects/ayah-archive.jpg',
        alt: 'Ayah Archive landing page showing the Quran Memorization Mastery Guide with two bonus products',
        caption: 'The live storefront at ayaharchive.shop.',
      },
    ],
    live: 'https://ayaharchive.shop',
    sealed: 'Commercial product. The rebuild’s source is private.',
    status: 'Live',
  },
  {
    id: 'linreg',
    code: 'LIN-08',
    name: 'Linear Regression from Scratch',
    tagline: 'No libraries, three methods',
    event: 'Self-study',
    year: 'Apr 2026',
    oneLiner:
      'Linear regression three ways, closed form, normal equation and gradient descent, with an analysis of convergence and learning rates.',
    problem: 'Calling model.fit() teaches nothing about why a model converges, or why it suddenly returns NaN.',
    does: [
      'Fits the same data with a direct formula, the normal equation and gradient descent',
      'Plots the loss curve and the regression fit',
      'Shows exactly where high learning rates blow up',
    ],
    how: [
      'β = (XᵀX)⁻¹Xᵀy for the exact matrix solution.',
      'Gradient descent on mean squared error, checked against the exact answer.',
      'Only NumPy and Matplotlib.',
    ],
    proof: [
      { value: '3', label: 'methods, one answer' },
      { value: '0', label: 'ML libraries' },
    ],
    stack: ['py', 'numpy', 'ml'],
    images: [
      { src: '/projects/linreg-loss.png', alt: 'Loss curve dropping as gradient descent converges', caption: 'Loss falling as gradient descent converges.', tone: 'invert' },
      { src: '/projects/linreg-fit.png', alt: 'Regression line fitted through the data points', caption: 'The fitted line.', tone: 'invert' },
    ],
    repo: 'https://github.com/Mohammed-Rayan07/linear-regression-from-scratch',
    status: 'Archived',
  },
]

/** End of Silicon Maze. The archive's countdown runs to this. */
export const DOOMSDAY = new Date('2026-10-04T18:00:00+05:30')

export const sectors = [
  { id: 'identity', label: 'Identity', short: 'Identity' },
  { id: 'log', label: 'Survivor’s log', short: 'Log' },
  { id: 'arsenal', label: 'Arsenal', short: 'Arsenal' },
  { id: 'archives', label: 'Archives', short: 'Projects' },
  { id: 'transmission', label: 'Transmission', short: 'Contact' },
] as const

export type SectorId = (typeof sectors)[number]['id']

export const skillById: Record<string, Skill> = Object.fromEntries(
  arsenal.flatMap((c) => c.skills.map((s) => [s.id, s] as const)),
)

export const projectById: Record<string, Project> = Object.fromEntries(projects.map((p) => [p.id, p]))
