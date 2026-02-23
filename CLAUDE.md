# CLAUDE.md

## Project Overview

MZMuse Blog - a personal tech blog by Mehdi Zonjy, built with Astro Paper v5.5.1 (Astro-based static site generator).

## Key Commands

- `npm run dev` - Start development server
- `npm run build` - Production build (includes `astro check`, `astro build`, and `pagefind` indexing)
- `npm run preview` - Preview production build
- `npm run format` - Format with Prettier
- `npm run lint` - Lint with ESLint

## Architecture

- **Framework**: Astro 5 with Astro Paper theme
- **Styling**: Tailwind CSS 4
- **Search**: Pagefind (static search indexing)
- **Deployment**: GitHub Pages via GitHub Actions

## File Locations

- **Blog posts**: `src/data/blog/*.md` - Markdown files with YAML frontmatter
- **Site config**: `src/config.ts` - Title, author, description, site URL
- **Social links**: `src/constants.ts` - GitHub, social media links
- **Images**: `public/blog-images/` - Organized by `year/month/` (e.g., `2020/01/`)
- **Layouts**: `src/layouts/` - Astro layout components
- **Pages**: `src/pages/` - Route-based pages
- **Components**: `src/components/` - Reusable Astro components
- **Deploy workflow**: `.github/workflows/deploy.yml`

## Blog Post Frontmatter

```yaml
---
author: Mehdi Zonjy
pubDatetime: 2024-01-01T00:00:00Z
title: "Post Title"
slug: post-slug
featured: false
draft: false
tags:
  - tag-name
description: "Short description."
---
```

## Conventions

- Blog images are referenced as `/blog-images/YYYY/MM/filename.ext`
- Post slugs use kebab-case and match the markdown filename
- Tags use lowercase kebab-case
- All dates are in ISO 8601 format with timezone (Z suffix)
