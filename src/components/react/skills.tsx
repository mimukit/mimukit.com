import { useEffect } from 'react';
import { type IconType } from 'react-icons';
import { BsCursor } from 'react-icons/bs';
import { FaQuestionCircle } from 'react-icons/fa';
import {
  SiAnthropic,
  SiApache,
  SiAstro,
  SiCloudflare,
  SiCss3,
  SiDigitalocean,
  SiDiscord,
  SiGit,
  SiGithub,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiLua,
  SiMacos,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPerplexity,
  SiPostgresql,
  SiSlack,
  SiSpotify,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu,
  SiVercel,
  SiZoom,
} from 'react-icons/si';
import { TbBrandNextjs, TbBrandVisualStudio } from 'react-icons/tb';
import { technologies, type Category, type Technologies } from '../../consts';
import { InfiniteScroll } from '../ui/infinite-scroll';
import { LucideAppWindow } from 'lucide-react';

const iconMap: { [key: string]: IconType } = {
  'mdi:language-html5': SiHtml5,
  'mdi:language-javascript': SiJavascript,
  'mdi:language-typescript': SiTypescript,
  'mdi:language-css3': SiCss3,
  'cib:nextjs': TbBrandNextjs,
  'simple-icons:astro': SiAstro,
  'mdi:tailwind': SiTailwindcss,

  'mdi:visual-studio-code': TbBrandVisualStudio,
  'mdi:cursor': BsCursor,
  'mdi:git': SiGit,
  'mdi:github': SiGithub,
  'mdi:jira': SiJira,
  'mdi:slack': SiSlack,
  'mdi:zoom': SiZoom,

  'cib:cloudflare': SiCloudflare,
  'mdi:digital-ocean': SiDigitalocean,
  'cib:netlify': SiNetlify,
  'cib:vercel': SiVercel,

  'mdi:macos': SiMacos,
  'mdi:ubuntu': SiUbuntu,
  'mdi:windows': LucideAppWindow,

  'mdi:nodejs': SiNodedotjs,
  'mdi:language-lua': SiLua,

  'cib:apache': SiApache,
  'cib:nginx': SiNginx,

  'cib:postgresql': SiPostgresql,
  'cib:mysql': SiMysql,
  'cib:mongodb': SiMongodb,

  'cib:google-gemini': SiGoogle,
  'cib:openai': SiOpenai,
  'cib:anthropic': SiAnthropic,
  'cib:perplexity': SiPerplexity,
};

const categories = Object.keys(technologies);
const groupSize = Math.ceil(categories.length / 3);
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
];

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible');
    });
  }, []);

  return (
    <div className="z-30 mx-auto mt-12 flex w-full max-w-[calc(100vw-5rem)] flex-col lg:max-w-full">
      <div className="space-y-2">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={50000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {group.flatMap((category) =>
              technologies[category as keyof Technologies].map(
                (tech: Category, techIndex: number) => {
                  const IconComponent = iconMap[tech.logo] || FaQuestionCircle;
                  return (
                    <div
                      key={`${category}-${techIndex}`}
                      className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                      data-tech-name={`${category}-${techIndex}`}
                    >
                      <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                        <IconComponent className="tech-icon text-primary" />
                      </span>
                      <span className="text-foreground font-medium">
                        {tech.text}
                      </span>
                    </div>
                  );
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  );
};

export default Skills;
