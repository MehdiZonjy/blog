# MZMuse Blog

Personal blog built with [Astro Paper](https://github.com/satnaing/astro-paper) - a minimal, accessible, and SEO-friendly Astro blog theme.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format

# Lint
npm run lint
```

## Project Structure

```
src/
  data/blog/       # Markdown blog posts
  config.ts         # Site configuration (title, author, etc.)
  constants.ts      # Social links and share links
public/
  blog-images/      # Blog post images (organized by year/month)
.github/
  workflows/
    deploy.yml      # GitHub Pages deployment workflow
```

## Adding a New Post

Create a markdown file in `src/data/blog/` with the following frontmatter:

```markdown
---
author: Mehdi Zonjy
pubDatetime: 2024-01-01T00:00:00Z
title: "Post Title"
slug: post-slug
featured: false
draft: false
tags:
  - tag-name
description: "A short description of the post."
---

Post content here...
```

## Deployment

The site deploys automatically to GitHub Pages on push to `main` via GitHub Actions. To enable:

1. Go to **Settings > Pages** in the GitHub repo
2. Set source to **GitHub Actions**
