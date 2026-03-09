# AGENTS.md

This file provides guidance for AI coding agents working with this repository.

## Project Overview

This is a **documentation site** built with [Astro 5](https://astro.build/) and [Starlight](https://starlight.astro.build/) (Astro's official documentation framework). The site serves as an internal knowledge base for manufacturing/ERP system documentation.

**Content Domain:**
- Warehouse management procedures (仓库管理制度和流程)
- Material backflushing (倒冲领料)
- Material coding rules (物料编码规则)
- Kingdee ERP system documentation (金蝶系统文档) - including 金蝶操作手册, 云之家
- BlackLake MES system documentation (黑湖系统文档) - including 腾为黑湖操作文档

**Language:** Chinese (Simplified)

## Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.x |
| Documentation | @astrojs/starlight 0.37.x |
| Theme | starlight-theme-rapide 0.5.x |
| Language | TypeScript (ES Modules) |
| Image Processing | sharp 0.34.x |

## Project Structure

```
.
├── astro.config.mjs          # Astro + Starlight configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript strict config
├── src/
│   ├── content.config.ts     # Content collection schema
│   ├── content/docs/         # Documentation pages (Markdown/MDX)
│   │   ├── index.mdx         # Homepage (splash template)
│   │   ├── 知识库/           # Knowledge base docs
│   │   ├── 金蝶系统文档/      # Kingdee ERP docs
│   │   ├── 黑湖系统文档/      # BlackLake MES docs
│   │   └── AI氛围编程/        # AI programming docs (empty)
│   ├── components/           # Custom Astro components
│   │   └── Header.astro      # Custom header override
│   ├── styles/
│   │   └── custom.css        # Theme customization
│   └── assets/               # Importable assets
│       └── houston.webp      # Hero image
├── public/                   # Static assets
│   └── favicon.svg
└── dist/                     # Build output (git-ignored)
```

## Build and Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321
npm run start            # Alias for npm run dev

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

1. **Content Collections**: Defined in `src/content.config.ts`. Uses Starlight's `docsLoader()` and `docsSchema()` for content management and frontmatter validation.

2. **File-Based Routing**: Documentation structure mirrors the filesystem. No manual routing required.
   - `src/content/docs/index.mdx` → `/` (homepage)
   - `src/content/docs/知识库/仓库管理制度和流程.md` → `/知识库/仓库管理制度和流程`
   - `src/content/docs/金蝶系统文档/云之家.md` → `/金蝶系统文档/云之家`

3. **Zero JS by Default**: Astro strips JavaScript unless explicitly needed. Pages are static HTML.

4. **Island Architecture**: Interactive components can be added as "islands" while keeping the rest static.

### Custom Components

The project overrides the default Starlight Header component:

- **Header.astro**: Custom header with site title, search, social icons, theme toggle, and language select.
  - Uses virtual imports from Starlight (`virtual:starlight/*`)
  - Adds custom `.social-icons` styling with divider

## Content Conventions

### File Organization

- Use **Chinese folder names** for Chinese content sections
- Group related documentation in subdirectories
- Place images in `assets/` subdirectories within each section

### File Extensions

- `.md` - Simple Markdown files (no components)
- `.mdx` - Markdown with React/Astro components

### Frontmatter Schema

All documentation files use Starlight's standardized frontmatter:

```yaml
---
title: Page Title
description: Meta description for SEO
# template: splash  # Optional: for full-width hero pages
hero:              # Optional: hero section configuration
  tagline: Subtitle text
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Button Text
      link: /path
      icon: right-arrow
---
```

### Using Starlight Components in MDX

```jsx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="Card Title" icon="pencil">
    Card content here
  </Card>
</CardGrid>
```

Available components: `Card`, `CardGrid`, `Tabs`, `TabItem`, `LinkCard`, `LinkButton`, `Aside`, `Code`, `FileTree`, `Steps`, `Badge`, `Icon`, and more.

## Styling Guidelines

### Custom CSS (`src/styles/custom.css`)

The project has extensive custom styling to unify font sizes across the documentation:

- **Body & Right Sidebar**: 13px
- **Left Sidebar (file tree)**: 12px
- **Headings**: H1 (24px), H2 (20px), H3 (18px), H4 (16px), H5 (14px), H6 (13px)
- **Navigation Height**: Reduced to 2.5rem
- **Search & Buttons**: Reduced height to 1.75rem
- **Hero Section**: 
  - Left-aligned content
  - Max image height: 180px
  - Reduced padding for compact layout

### CSS Variables

Starlight provides CSS custom properties in the `--sl-*` namespace:
- `--sl-nav-height` - Navigation bar height
- `--sl-nav-pad-y` - Navigation vertical padding
- `--sl-color-gray-5` - Border color

## Type Safety

- TypeScript strict mode is enabled (`tsconfig.json` extends `astro/tsconfigs/strict`)
- Content types are auto-generated in `.astro/content.d.ts` based on `src/content.config.ts`
- Run `npm run astro check` to validate types

## Testing

**No testing infrastructure** is configured. Quality assurance relies on:
- TypeScript compile-time checking
- Astro's built-in content schema validation
- Manual testing during development

## Linting and Formatting

**No ESLint, Prettier, or similar tools** are configured. Code quality depends on:
- TypeScript strict mode
- Manual review

## Configuration Details

### astro.config.mjs

```javascript
export default defineConfig({
  devToolbar: { enabled: false },  // DevTools disabled
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],  // Rapide theme
      title: 'haibin',                     // Site title
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/Header.astro',  // Custom header override
      },
    }),
  ],
});
```

### content.config.ts

```typescript
export const collections = {
  docs: defineCollection({ 
    loader: docsLoader(), 
    schema: docsSchema() 
  }),
};
```

## Deployment

The project builds to a static site in `./dist/` directory:

```bash
npm run build
```

The `dist/` folder contains the generated static HTML, CSS, and assets ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Dependencies

See `package.json` for full list. Key dependencies:

| Package | Version | Purpose |
|---------|---------|---------|
| astro | ^5.6.1 | Web framework |
| @astrojs/starlight | ^0.37.1 | Documentation theme |
| starlight-theme-rapide | ^0.5.2 | Custom Starlight theme |
| sharp | ^0.34.2 | Image optimization |

## Important Notes for Agents

1. **Content is in Chinese**: When editing documentation, maintain Chinese language unless specifically requested otherwise.

2. **Image Assets**: Store images in `src/content/docs/<section>/assets/` directories. Reference them with relative paths.

3. **Component Overrides**: When overriding Starlight components, use the virtual imports pattern shown in `Header.astro`.

4. **No Runtime State**: This is a static documentation site. Avoid adding client-side JavaScript unless absolutely necessary.

5. **Build Output**: The `dist/` directory is git-ignored. Never commit build artifacts.

6. **Theme Customization**: All visual styling should go through `src/styles/custom.css` rather than modifying component internals when possible.
