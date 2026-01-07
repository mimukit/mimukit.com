# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Type-check with astro check, then build
pnpm preview          # Preview production build locally
pnpm prettier         # Format all .ts, .tsx, .css, .astro files
```

## Architecture

This is an Astro-based personal portfolio and blog deployed to Cloudflare Pages.

### Tech Stack

- **Astro 5** with hybrid SSR (Cloudflare adapter)
- **React 19** for interactive components (navbar, theme toggle)
- **Tailwind CSS 4** via Vite plugin
- **TypeScript** with path alias `@/*` → `./src/*`
- **MDX** for blog posts with expressive-code syntax highlighting

### Content Collections

Defined in `src/content.config.ts`:

- **blog**: `src/content/blog/**/*.{md,mdx}` - Posts with title, description, date, tags, draft status
- **projects**: `src/content/projects/**/*.{md,mdx}` - Projects with name, description, tags, image, link, rank (for sorting)

### Key Files

- `src/consts.ts` - Site metadata, navigation links, social links, technology lists
- `src/lib/data-utils.ts` - Content collection query helpers (getAllPosts, getAllProjects, etc.)
- `src/layouts/Layout.astro` - Base layout with theme handling
- `astro.config.ts` - Integrations, markdown plugins, Cloudflare adapter config

### API Routes

- `src/pages/api/like/[postId].ts` - Post like endpoint
- `src/pages/api/dislike/[postId].ts` - Post dislike endpoint
- `src/pages/image/[...id].png.ts` - Dynamic OG image generation using satori

### Component Organization

- `src/components/*.astro` - Astro components (layout pieces, blog UI)
- `src/components/react/*.tsx` - Interactive React components (client:load)
- `src/components/ui/*.tsx` - Reusable UI primitives (Radix-based)
