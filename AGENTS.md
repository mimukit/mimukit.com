# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
pnpm dev                # Start dev server on port 3000
pnpm build              # Type-check with astro check, then build
pnpm preview            # Preview production build locally
pnpm preview:cloudflare # Preview with Wrangler (Cloudflare runtime)
pnpm prettier           # Format all .ts, .tsx, .css, .astro files
pnpm clean              # Remove .astro, .wrangler, dist, node_modules
```

## Architecture

This is an Astro-based personal portfolio and blog deployed to Cloudflare Pages. The site uses hybrid SSR with mostly static pages and a few dynamic API routes.

### Tech Stack

- **Astro 5** with hybrid SSR (Cloudflare adapter)
- **React 19** for interactive components (navbar, theme toggle, search)
- **Tailwind CSS 4** via Vite plugin with OKLCH color system
- **TypeScript** with path alias `@/*` → `./src/*`
- **MDX** for blog posts with expressive-code syntax highlighting
- **Neon Database** (serverless Postgres) for post likes/dislikes
- **Satori + Resvg** for dynamic OG image generation
- **Radix UI** primitives for accessible UI components
- **Fuse.js** for client-side search

### Project Structure

```
src/
├── assets/            # Images for projects (processed by Astro)
├── components/
│   ├── *.astro        # Layout components (Head, Footer, Breadcrumbs, etc.)
│   ├── home/          # Homepage sections (Hero, Career, Projects, Skills)
│   ├── react/         # Interactive React components (client:load)
│   └── ui/            # Radix-based UI primitives (button, badge, etc.)
├── content/
│   ├── blog/          # MDX blog posts (each in own folder with index.mdx)
│   └── projects/      # Markdown project descriptions
├── data/              # Static data (career.ts)
├── layouts/           # Base Layout.astro
├── lib/               # Utilities (data-utils, neon, cn/formatDate)
├── pages/
│   ├── api/           # SSR endpoints (like/dislike)
│   ├── blog/          # Blog listing and post pages
│   ├── image/         # Dynamic OG image generation
│   ├── projects/      # Project listing and pages
│   └── tags/          # Tag-based post filtering
└── styles/            # Global CSS and typography
```

### Content Collections

Defined in `src/content.config.ts` using Astro's content layer:

**Blog** (`src/content/blog/**/*.{md,mdx}`):
```typescript
{
  title: string,
  description: string,
  date: Date,
  image?: ImageMetadata,  // Optional cover image
  tags?: string[],
  authors?: string[],
  draft?: boolean         // Drafts excluded from getAllPosts()
}
```

**Projects** (`src/content/projects/**/*.{md,mdx}`):
```typescript
{
  name: string,
  description: string,
  tags: string[],
  image: ImageMetadata,   // Required project image
  link: string,           // URL to project
  startDate?: Date,
  endDate?: Date,
  rank: number,           // Lower rank = higher priority in listings
  badge?: 'new' | 'popular' | 'featured' | 'archived'
}
```

### Key Files

| File | Purpose |
|------|---------|
| `src/consts.ts` | Site metadata, navigation links, social links, technology lists |
| `src/lib/data-utils.ts` | Content collection queries (getAllPosts, getAllProjects, getPostsByTag, etc.) |
| `src/lib/utils.ts` | `cn()` class merger, `formatDate()`, `readingTime()` |
| `src/lib/neon.ts` | Neon database connection |
| `src/types.ts` | TypeScript types (Site, SocialLink, CareerPosition) |
| `src/data/career.ts` | Career history data |
| `src/layouts/Layout.astro` | Base layout with theme handling and font preloading |
| `astro.config.ts` | Integrations, markdown plugins, Cloudflare adapter |
| `wrangler.jsonc` | Cloudflare Workers configuration |

### API Routes

All API routes use `prerender = false` for SSR.

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/like/[postId]` | GET | Get likes/dislikes count for a post |
| `/api/like/[postId]` | POST | Like a post (requires fingerprintId) |
| `/api/dislike/[postId]` | POST | Dislike a post (requires fingerprintId) |
| `/image/[...id].png` | GET | Generate OG image for blog post (static paths) |
| `/rss.xml` | GET | RSS feed |
| `/sitemap.xml` | GET | Sitemap |
| `/robots.txt` | GET | Robots.txt |

### Database Schema (Neon)

The like/dislike system uses two tables:

```sql
-- Stores aggregate feedback per post
CREATE TABLE post_feedback (
  post_id VARCHAR PRIMARY KEY,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0
);

-- Tracks individual likes to prevent duplicates
CREATE TABLE post_likes (
  post_id VARCHAR,
  fingerprint_id VARCHAR,
  PRIMARY KEY (post_id, fingerprint_id)
);
```

### Styling System

- **Tailwind CSS 4** with CSS-first configuration
- **OKLCH colors** defined in `src/styles/global.css` as CSS variables
- **Dark mode** via `.dark` class on `<html>` (toggled by theme-toggle component)
- **Custom fonts**: ClashDisplay (headings), Lexend (body)
- **Theme colors**: `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- **Use `cn()`** from `@/lib/utils` to merge Tailwind classes

Key utility classes:
```css
.font-custom     /* ClashDisplay font for headings */
.navbar-transition /* Smooth width/radius transitions */
.prose           /* Typography styles for blog content */
```

### Component Patterns

**Astro Components** (`.astro`):
- Server-rendered, no client JS by default
- Use for layout, static content, SEO

**React Components** (`client:load`):
- Used for: navbar, theme toggle, search, skills carousel
- Always add `client:load` directive when including in Astro pages
- Located in `src/components/react/`

**UI Primitives** (`src/components/ui/`):
- Based on shadcn/ui patterns with Radix primitives
- Use `class-variance-authority` for variants
- Export both component and variants (e.g., `Button` and `buttonVariants`)

### Code Style

- **Prettier** with plugins: astro, tailwindcss, astro-organize-imports
- **Single quotes**, **trailing commas**, **semicolons**
- **Path aliases**: Use `@/` instead of relative imports
- **Component naming**: PascalCase for files and components
- **File organization**: Related files in same folder (e.g., blog post with its assets)

### Environment Variables

Required in `.env`:
```
NEON_DATABASE_URL=postgresql://...  # Neon connection string
```

Access via `import.meta.env.NEON_DATABASE_URL` in server-side code only.

### Deployment

- **Platform**: Cloudflare Pages with Workers
- **Build command**: `pnpm build`
- **Output directory**: `dist`
- **Node version**: >=20.0.0
- **Compatibility flags**: `nodejs_compat`, `global_fetch_strictly_public`

### Common Tasks

**Adding a new blog post**:
1. Create folder in `src/content/blog/[slug]/`
2. Add `index.mdx` with frontmatter (title, description, date, tags)
3. Optional: Add images in same folder, reference with relative imports

**Adding a new project**:
1. Create `src/content/projects/[name].md`
2. Add image to `src/assets/projects/`
3. Set `rank` to control display order

**Adding a new page**:
1. Create `src/pages/[route].astro`
2. Use `Layout` component as wrapper
3. Add `PageHead` in slot for meta tags

**Creating new UI component**:
1. Add to `src/components/ui/` following existing patterns
2. Use `cn()` for class merging
3. Export variants if using CVA

### Notes for AI Agents

- Always run `pnpm prettier` after making changes to ensure consistent formatting
- The project uses Astro 5's content layer API - check `content.config.ts` for schemas
- React components must use `client:load` to hydrate on the client
- Images in content collections should use Astro's `image()` schema helper
- The OG image generator reads fonts from `public/fonts2/` directory
- Theme state persists in localStorage under the key `theme`
- The navbar shrinks as user scrolls down (scroll-aware design)
