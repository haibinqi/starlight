# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation site built with **Astro 5** and **Starlight** (Astro's official documentation framework). The site uses a content-first architecture where Markdown/MDX files in `src/content/docs/` become pages automatically via file-based routing.

The content domain is Chinese manufacturing/ERP documentation covering warehouse management procedures, material coding rules, and Kingdee ERP system updates.

## Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321
npm run start            # Alias for dev

# Building
npm run build            # Production build to ./dist/
npm run preview          # Preview production build locally

# Astro CLI
npm run astro ...        # Run Astro CLI commands (e.g., astro add, astro check)
npm run astro -- --help  # Get help using the Astro CLI
```

## Architecture

### Content Flow

```
astro.config.mjs (entry point)
    ↓
Starlight Integration + starlight-theme-rapide plugin
    ↓
Content Collections (src/content.config.ts)
    ↓
Markdown/MDX Files (src/content/docs/)
    ↓
Static HTML Generation (dist/)
```

### Key Concepts

1. **Content Collections**: Astro's CMS layer defined in `src/content.config.ts`. The `docs` collection uses Starlight's `docsSchema()` for frontmatter validation.

2. **File-Based Routing**: Documentation structure mirrors the file system. No manual routing configuration.
   - `src/content/docs/index.mdx` → `/` (homepage)
   - `src/content/docs/金蝶更新.md` → `/金蝶更新`
   - `src/content/docs/02_分享文档/物料编码规则.mdx` → `/02_分享文档/物料编码规则`

3. **Zero JS by Default**: Astro strips JavaScript unless explicitly needed. Pages are static HTML with minimal JavaScript for interactivity.

4. **Island Architecture**: Interactive components (using React, etc.) can be added as "islands" while keeping the rest of the page static.

### Directory Structure

- `src/content/docs/` - Documentation pages (Markdown/MDX files)
- `src/content/config.ts` - Content collection schema definitions
- `src/assets/` - Importable assets (images, etc.)
- `public/` - Static assets served as-is (favicon, etc.)
- `.astro/` - Generated build artifacts and types (git-ignored)
- `astro.config.mjs` - Astro + Starlight configuration

### Content Frontmatter

All docs use standardized frontmatter:

```yaml
---
title: Page Title
description: Meta description
# template: splash  # Optional: for full-width hero pages
hero:              # Optional: hero section config
  tagline: ...
  image: ...
  actions: [...]
---
```

### Starlight Components

MDX files can import and use Starlight components:

```jsx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="..." icon="...">...</Card>
</CardGrid>
```

## Content Conventions

- **Numbered folders** for ordering (e.g., `02_分享文档/`)
- **Chinese filenames** for Chinese content
- `.md` for simple Markdown, `.mdx` for content with React components
- `.excalidraw` files for diagrams (JSON format, embedded as images)

## Type Safety

TypeScript strict mode is enabled. Content types are auto-generated in `.astro/content.d.ts` based on the schema in `src/content.config.ts`.

## No Testing

This project has no testing infrastructure. Code quality is maintained through:
- TypeScript compile-time checking
- Astro's built-in content schema validation
- Manual testing during development

## No Linting/Formatting

This project has no ESLint, Prettier, or similar tools configured. Code quality relies on TypeScript strict mode and manual review.

## Theme

The site uses `starlight-theme-rapide` (v0.5.2), a custom Starlight theme plugin. Customization is done through the plugin configuration in `astro.config.mjs`.
