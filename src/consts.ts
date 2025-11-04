import type { IconMap, SocialLink, Site } from '@/types';

const EXPERIENCE_YEARS = new Date().getFullYear() - 2017;

export const SITE: Site = {
  title: 'Mukitul Islam Mukit',
  description: `Senior Software Engineer with ${EXPERIENCE_YEARS}+ years of experience, passionate about building robust, scalable web solutions with React, Node.js, and TypeScript. Welcome to my hub for technical deep-dives, hands-on guides, and project showcases—where I share proven strategies, real-world experience, and actionable insights at the intersection of modern web development, DevOps, and cloud architecture.`,
  href: 'https://mimukit.com',
  author: 'Mukitul Islam Mukit',
  locale: 'en-US',
  location: 'Bangladesh',
  email: 'hello@mimukit.com',
};

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'mailto:hello@mimukit.com',
    label: 'Email',
  },
  {
    href: 'https://github.com/mimukit',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/mimukit/',
    label: 'LinkedIn',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
];

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
};

export interface Category {
  text: string;
  logo: string;
}

export type Technologies = {
  'Web Development': Category[];
  'Development Tools': Category[];
  'Hosting and Cloud Services': Category[];
  'Operating Systems': Category[];
  'Other Programming Languages and Technologies': Category[];
  'Web Servers': Category[];
  Databases: Category[];
  'Other Software': Category[];
};

export const technologies: Technologies = {
  'Web Development': [
    { text: 'HTML', logo: 'mdi:language-html5' },
    { text: 'JavaScript', logo: 'mdi:language-javascript' },
    { text: 'TypeScript', logo: 'mdi:language-typescript' },
    { text: 'CSS', logo: 'mdi:language-css3' },
    { text: 'Next.js', logo: 'cib:nextjs' },
    { text: 'Astro', logo: 'simple-icons:astro' },
    { text: 'Tailwind CSS', logo: 'mdi:tailwind' },
  ],
  'Development Tools': [
    { text: 'Visual Studio Code', logo: 'mdi:visual-studio-code' },
    { text: 'Cursor', logo: 'mdi:cursor' },
    { text: 'Git', logo: 'mdi:git' },
    { text: 'GitHub', logo: 'mdi:github' },
    { text: 'Jira', logo: 'mdi:jira' },
    { text: 'Slack', logo: 'mdi:slack' },
    { text: 'Zoom', logo: 'mdi:zoom' },
  ],
  'Hosting and Cloud Services': [
    { text: 'Cloudflare', logo: 'cib:cloudflare' },
    { text: 'DigitalOcean', logo: 'mdi:digital-ocean' },
    { text: 'Netlify', logo: 'cib:netlify' },
    { text: 'Vercel', logo: 'cib:vercel' },
  ],
  'Operating Systems': [
    { text: 'macOS', logo: 'mdi:macos' },
    { text: 'Windows', logo: 'mdi:windows' },
    { text: 'Ubuntu', logo: 'mdi:ubuntu' },
  ],
  'Other Programming Languages and Technologies': [
    { text: 'Node.js', logo: 'mdi:nodejs' },
    { text: 'Lua', logo: 'mdi:language-lua' },
  ],
  'Web Servers': [
    { text: 'Apache', logo: 'cib:apache' },
    { text: 'Nginx', logo: 'cib:nginx' },
  ],
  Databases: [
    { text: 'PostgreSQL', logo: 'cib:postgresql' },
    { text: 'MySQL', logo: 'cib:mysql' },
    { text: 'MongoDB', logo: 'cib:mongodb' },
  ],
  'Other Software': [
    { text: 'Google Gemini', logo: 'cib:google-gemini' },
    { text: 'OpenAI', logo: 'cib:openai' },
    { text: 'Claude', logo: 'cib:anthropic' },
    { text: 'Perplexity', logo: 'cib:perplexity' },
  ],
};
