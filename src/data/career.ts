import type { CareerPosition } from '@/types';

export const CAREER_START_YEAR = 2017;

export const CAREER_DATA: CareerPosition[] = [
  {
    id: 'trackwell',
    title: 'Senior Software Engineer',
    company: 'Trackwell Inc',
    companyUrl: 'https://trackwell.io',
    location: 'Remote, USA',
    startDate: '2024',
    description:
      "Joined Trackwell, a US-based platform for tracking legal cannabis products with personalized recommendations, as a Senior Software Engineer owning the backend end-to-end. I architect fault-tolerant TypeScript/Node.js services with GraphQL APIs, authentication and authorization, MySQL/Prisma, Redis, and BullMQ on AWS. A flagship contribution is the AI product label scanner that turns a photo into structured data through AWS Textract OCR and OpenAI extraction, then fuzzy-matches it against a 5,000+ SKU Elasticsearch catalog at the core of consumer onboarding. I also engineered automated catalog ingestion from third-party scrapers and producer-submitted lab-test PDFs, optimized slow N+1 GraphQL resolvers, and stood up the company's CI/CD and AWS infrastructure from scratch with CDK, monitoring, and alerting while mentoring a junior engineer.",
  },
  {
    id: 'shopup',
    title: 'Senior Software Engineer',
    company: 'ShopUp',
    companyUrl: 'https://shopup.org',
    location: 'Dhaka, Bangladesh',
    startDate: '2020',
    endDate: '2023',
    description:
      "As a Senior Software Engineer at ShopUp, Bangladesh's largest B2B commerce platform, I worked primarily on RedX, its logistics arm that handles over half of all e-commerce deliveries in the country across 7,000+ riders. As tech lead for the Issue Resolution Platform, I re-architected the support escalation system to handle 50,000+ tickets per month, designing an SLA-driven engine that closed roughly 60% of issues without human intervention. I led a targeted performance sprint that diagnosed 50+ slow endpoints and cut p99 API response time by 80%, designed the distributed, idempotent accounting and reporting engine behind RedX's financial reports, and built a bulk operations platform for courier-side product ingestion via Excel, CSV, and partner APIs. Along the way I authored internal SDKs and tests, mentored 5-6 junior engineers, and interviewed 50+ candidates.",
  },
  {
    id: 'shorol-limited',
    title: 'Tech Lead',
    company: 'Shorol Limited',
    companyUrl: 'https://shorol.io',
    location: 'Dhaka, Bangladesh',
    startDate: '2019',
    endDate: '2020',
    description:
      'As Tech Lead at Shorol Limited, I led a team of four engineers building streamlined tech and government solutions in Bangladesh. I architected a micro-loan platform and a B2B cash-on-delivery integration, built the B2B integration layer for the YC-backed Backpack Inc., and shipped an offline-first health directory for the Ministry of Health Bangladesh. I also established the team\'s CI/CD culture, working across a stack of TypeScript, NestJS, GraphQL, React, PostgreSQL, Nx, Docker, GitLab CI, and GCP.',
  },
  {
    id: 'backpack',
    title: 'Software Engineer',
    company: 'Backpack Technologies',
    companyUrl: 'https://backpackbang.com',
    location: 'Remote, USA',
    startDate: '2018',
    endDate: '2019',
    description:
      'Worked as a Software Engineer at Backpack Technologies, a Y Combinator-backed startup building a peer-to-peer platform connecting global travelers with shoppers. I shipped data-driven features that grew GMV by 32% in six months, built an automated product request system that reduced manual customer support by 95%, and delivered a real-time support dashboard that improved ticket resolution by 40%. My stack spanned React, Redux, Node.js (Express), MySQL, and AWS.',
  },
  {
    id: 'durbin-labs',
    title: 'Junior Software Engineer',
    company: 'Durbin Labs Limited',
    companyUrl: 'https://durbinlabs.com',
    location: 'Dhaka, Bangladesh',
    startDate: '2017',
    endDate: '2018',
    description:
      'Started my career as a Junior Software Engineer at Durbin Labs Limited, working as a full-stack JavaScript developer on client projects and SaaS products. I built an automated AWS server orchestration system, delivered an ERP and workflow platform for International Trade Management, and co-built DuMedico, a hospital management system. My day-to-day stack included React, Node.js (Meteor), AWS, and MongoDB.',
  },
  {
    id: 'freelance',
    title: 'Freelance Web Developer',
    company: 'Freelance',
    location: 'Dhaka, Bangladesh',
    startDate: '2010',
    endDate: '2015',
    description:
      'Started professional career as a Freelance Web Developer during college and early university years, working with a diverse range of international clients. Developed and maintained custom websites and web applications for various corporate and non-profit organizations. Utilized a broad range of technologies including HTML/CSS, JavaScript, WordPress, and PHP to deliver high-quality digital solutions tailored to specific business needs.',
  },
];
