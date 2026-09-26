/**
 * Single source of truth for all 6 projects.
 * Both ProjectGrid (the /projects page) and ProjectDetail (/projects/:slug)
 * read from this array — never hardcode project text inside page components.
 *
 * Shape is consistent plain JS objects — no TypeScript types.
 * See content.md §7 for all copy.
 */

const projects = [
  {
    slug: 'nexus',
    name: 'NEXUS',
    tagline: 'Online Reselling Platform',
    blurb:
      'Full-stack reselling marketplace with role-based access, real-time chat, and server-authoritative checkout.',
    summary:
      'A full-stack marketplace for buying and selling pre-owned goods, with role-based access, real-time chat, and a server-authoritative checkout system.',
    overview:
      'NEXUS is a full-stack online reselling marketplace built for a complete buy/sell workflow rather than a simple listings page. It supports Buyers, Sellers, and Admins through role-based access control, with 24+ frontend pages routed according to each role.',
    features: [
      'Role-based access control for Buyer, Seller, and Admin',
      'Real-time buyer–seller chat',
      'Wishlist functionality',
      'JWT-based authentication integrated with role permissions',
      'Server-authoritative checkout with database-backed transactions',
      'Automated platform fee calculation at checkout',
      'Multi-image uploads via Cloudinary',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
    highlights: [
      'Backend-controlled transaction processing (not client-trusted)',
      'Database-backed checkout workflow',
      'Real-time communication between users',
      'Frontend route protection by role',
    ],
    liveUrl: 'https://nexus-beige-chi.vercel.app/',
    githubUrl: null,
    image: '/images/projects/nexus.jpg',
  },
  {
    slug: 'trustledger',
    name: 'TrustLedger',
    tagline: 'Milestone-Based Escrow Platform',
    blurb:
      'Milestone-based escrow platform with AI-assisted dispute resolution and automated invoicing.',
    summary:
      'An escrow platform that locks client funds in digital wallets and releases them only after mutual approval — with AI-assisted milestone generation and dispute resolution.',
    overview:
      "TrustLedger manages client funds through a milestone-based escrow workflow: funds stay locked while a milestone's work is in progress and are released only after both parties approve. AI (Gemini 1.5 Flash) assists with generating milestones and supporting dispute resolution, alongside real-time mediation chat and automated invoicing.",
    features: [
      'Milestone-based fund release (not single lump-sum transactions)',
      'Digital wallets holding client funds in escrow',
      'AI-assisted milestone generation (Gemini 1.5 Flash)',
      'AI-assisted dispute resolution support',
      'Real-time mediation chat between parties',
      'Automated invoice generation',
    ],
    techStack: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Gemini 1.5 Flash',
      'Docker',
    ],
    highlights: [
      'Escrow-based transaction workflow design',
      'AI integrated directly into the milestone/dispute workflow, not bolted on',
      'Dockerized deployment',
      'PostgreSQL + Prisma data layer',
    ],
    liveUrl: 'https://trust-ledger-frontend-blond.vercel.app/',
    githubUrl: null,
    image: '/images/projects/trustledger.jpg',
  },
  {
    slug: 'industriguard-ai',
    name: 'Industriguard-AI',
    tagline: 'AI-Powered Industrial Safety Surveillance',
    blurb:
      'Real-time PPE compliance monitoring using computer vision and live safety analytics.',
    summary:
      'Real-time PPE compliance detection for industrial workplaces, using computer vision, QR-based employee identification, and live safety analytics.',
    overview:
      'Industriguard-AI monitors workplace safety and detects PPE (helmet, vest, gloves, glasses, boots) compliance in real time using YOLOv8 computer vision, paired with QR-based employee identification so observations are tied to a specific worker. Results are stored, reported, and streamed live to a dashboard via WebSockets.',
    features: [
      'Real-time PPE compliance detection (YOLOv8)',
      'QR-based employee identification',
      'Live employee safety status dashboard',
      'Compliance trend tracking over time',
      'Exportable safety reports',
    ],
    techStack: ['YOLOv8', 'React', 'Flask', 'SQLite', 'WebSockets'],
    highlights: [
      'End-to-end pipeline: detection → storage → reporting → live analytics',
      'Computer-vision model in a real production-style monitoring app',
      'Real-time updates via WebSockets',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/SUJALVAIDYA05/Industriguard-AI',
    image: '/images/projects/industriguard.jpg',
  },
  {
    slug: 'docsage',
    name: 'DocSage',
    tagline: 'RAG-Based PDF Question-Answering Chatbot',
    blurb:
      'RAG-based chatbot that answers questions strictly from your uploaded PDFs.',
    summary:
      "Upload any PDF and ask it questions — answers are generated strictly from the document's own content using retrieval-augmented generation.",
    overview:
      "DocSage answers questions using only the content of documents a user uploads, rather than relying on the language model's general knowledge. It extracts text from PDFs, converts it into embeddings, retrieves the most relevant passages with a vector search, and uses an LLM to generate a grounded, context-aware answer.",
    features: [
      'PDF upload and text extraction (PyMuPDF)',
      'Semantic embeddings (Sentence Transformers)',
      'Fast vector search over document content (FAISS)',
      'Context-aware answer generation (Groq LLM — LLaMA 3.3)',
      'Interactive chat interface (Gradio)',
    ],
    techStack: ['PyMuPDF', 'Sentence Transformers', 'FAISS', 'Groq / LLaMA 3.3', 'Gradio'],
    highlights: [
      'Full RAG pipeline: extraction → embeddings → retrieval → generation',
      'Document-grounded answers instead of general-purpose chat',
      'Deployed and usable via Hugging Face Spaces',
    ],
    liveUrl: 'https://huggingface.co/spaces/sujalvaidya/DocSage',
    githubUrl: null,
    image: '/images/projects/docsage.jpg',
  },
  {
    slug: 'fasalrakshak',
    name: 'FasalRakshak',
    tagline: 'Hyper-Local Crop Failure Predictor',
    blurb:
      'AI-powered crop failure predictor for Indian farmers, with multi-language voice support.',
    summary:
      'A mobile-first web app that predicts crop failure risk at the district level in India, combining satellite NDVI data, weather forecasts, and AI-generated recommendations for small and marginal farmers.',
    overview:
      'FasalRakshak helps small and marginal farmers anticipate crop risk before it becomes crop loss. Given a district, crop type, and growth stage, it produces a 0–100 crop health score split across three risk channels — drought stress, pest pressure, and nutrient deficiency — plus a 7-day weather-correlated forecast. Recommendations are generated by the Gemini API and delivered in English, Hindi, or Kannada, with voice readout in Kannada for low-literacy users on basic smartphones over 3G.',
    features: [
      'District-level crop health score (0–100)',
      'Three-channel risk scoring: drought, pest, nutrient deficiency',
      '7-day weather-correlated risk forecast',
      'Multi-language, quantity-aware recommendations (English, Hindi, Kannada)',
      'Voice readout via Web Speech API for low-literacy users',
      'Mobile-first design built for basic smartphones on 3G',
    ],
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js / FastAPI',
      'Open-Meteo API',
      'Sentinel-2 / MODIS NDVI',
      'Gemini API',
      'Web Speech API',
    ],
    highlights: [
      'Real satellite NDVI + weather data combined into a single risk score',
      'Designed for accessibility: low-literacy, low-bandwidth users',
      'Supports 10 major crops including Paddy, Wheat, Maize, Ragi, and Cotton',
    ],
    liveUrl: 'https://hyper-local-crop-failure-predictor-sigma.vercel.app/',
    githubUrl: null,
    image: '/images/projects/fasalrakshak.jpg',
  },
  {
    slug: 'portfolio',
    name: 'This Portfolio',
    tagline: 'Personal Developer Portfolio',
    blurb:
      'The site you\u2019re on right now \u2014 designed and built from scratch, end to end.',
    summary:
      'The site you\u2019re currently on \u2014 designed to match a set of visual references pixel-for-pixel and built as a real React application, not a template.',
    overview:
      "This portfolio was built to present Sujal's work with the same craft and attention to detail as the projects it showcases: a custom design system, a scroll-driven Intro/About/My Projects/Certifications experience, a dynamic project-template architecture, and a working Express-backed contact form.",
    features: [
      'Custom design system (color, type, spacing tokens)',
      'Scroll-revealed Intro → About → My Projects → Certifications experience on a single page',
      'Data-driven project, certification, and achievement templates',
      'Working contact form with a standalone Express backend for email delivery',
    ],
    techStack: [
      'React',
      'Vite',
      'React Router',
      'Tailwind CSS',
      'Framer Motion',
      'Node.js',
      'Express',
    ],
    highlights: [
      'Built from image references into a fully custom, non-templated design',
      'Reusable component architecture (see folder-structure.md)',
    ],
    liveUrl: null,
    githubUrl: null,
    image: '/images/projects/portfolio.jpg',
  },
];

export default projects;
