#Brand Yatra® | Creative Digital Marketing Agency

Official website for **Brand Yatra**, a creative digital marketing agency.

Built with Next.js, React, TypeScript and GSAP, featuring a responsive interface, dynamic service routes and interactive page transitions.

# Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework and App Router |
| React | Component architecture |
| TypeScript | Type safety |
| CSS | Styling and responsive layouts |
| GSAP | Animations and ScrollTrigger |
| Lucide React | UI icons |
| Next.js Image | Image optimization |

Refer to `package.json` for the exact installed versions and additional dependencies.

# Requirements

- Node.js compatible with the installed Next.js version
- npm
- Git

# Local Development

Clone the repository:

```bash
git clone <repository-url>
cd brand-yatra
```

Install dependencies:

```bash
npm install
```

Configure environment variables if required:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Application runs at:

`http://localhost:3000`

> The `.env.example` command applies only if that file exists in the repository.

# Project Structure

Representative Next.js App Router structure:

```text
brand-yatra/
├── public/
│   ├── brand/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/
│   │   ├── work/
│   │   ├── process/
│   │   ├── insights/
│   │   │   └── [slug]/
│   │   └── contact/
│   │
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── services/
│   │   ├── insights/
│   │   └── ui/
│   │
│   ├── data/
│   ├── lib/
│   └── hooks/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

The structure above is illustrative. The actual repository structure is the source of truth.

# Application Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About Brand Yatra |
| `/services/[slug]` | Dynamic service details |
| `/work` | Portfolio |
| `/process` | Agency workflow |
| `/insights` | Articles and insights |
| `/insights/[slug]` | Individual article |
| `/contact` | Contact and project inquiry |

# Dynamic Services

Service pages are intended to use a shared route template with centralized content configuration.

Supported service slugs:

```text
branding
web-development
graphic-design
lead-generation
social-media
google-ads
seo
meta-ads
content
video-motion
ui-ux
analytics-cro
```

Example:

```text
/services/branding
/services/seo
/services/web-development
```

Service-specific content and metadata should be maintained in the project's service data module.

# Available Commands

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm run start

# TypeScript validation
npx tsc --noEmit
```

Additional scripts such as `lint` or `test` should be executed only if defined in `package.json`.

# Environment Variables

Create `.env.local` for local configuration.

Example configuration, depending on the integrations implemented:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form integration, if implemented
CONTACT_EMAIL=
EMAIL_API_KEY=
```

Environment variable names must match those actually referenced in the source code.

Never commit `.env.local`, API credentials or other secrets.

Only expose variables with the `NEXT_PUBLIC_` prefix when their values are safe for the browser.

# Component Architecture

The application follows a component-based structure.

- **App Router:** Page routing, layouts and metadata.
- **Layout Components:** Shared navigation, footer and site-level UI.
- **Page Components:** Reusable sections and page-specific layouts.
- **Data Modules:** Structured content for services, projects and articles.
- **UI Components:** Buttons, navigation controls and other reusable elements.
- **Animation Components:** GSAP timelines and scroll-triggered interactions.

Keep reusable logic centralized and avoid duplicating content across dynamic pages.

# Animation Guidelines

GSAP is used for interactive transitions and scroll-based effects.

When modifying animations:

- Scope animations to their owning components.
- Clean up GSAP contexts and ScrollTrigger instances on unmount.
- Avoid duplicate animation initialization.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary layout-triggering animations.
- Verify behavior after route navigation and viewport resizing.

# Responsive Design

The interface is intended to support desktop, tablet and mobile viewports.

Use fluid layouts and responsive typography rather than fixed-width page structures.

Recommended QA viewport widths:

```text
320px
375px
390px
768px
1024px
1366px
1440px
1920px
```

Check navigation, typography, image crops, forms and animation behavior at each breakpoint.

# Build & Validation

Before deploying, run:

```bash
npx tsc --noEmit
npm run build
```

If a lint script is available:

```bash
npm run lint
```

Also verify:

- All routes resolve correctly.
- Images and fonts load successfully.
- Dynamic service pages render valid content.
- Navigation works with keyboard and pointer input.
- No horizontal overflow occurs.
- Contact form validation and submission work.
- No unexpected console errors or hydration warnings appear.

A successful production build does not replace browser-level functional testing.

# Deployment

Deploy to a hosting provider that supports the installed Next.js version and required server-side features.

# Production Checklist

- [ ] Install dependencies from the committed lockfile.
- [ ] Configure production environment variables.
- [ ] Run TypeScript validation.
- [ ] Run production build.
- [ ] Verify dynamic routes and metadata.
- [ ] Check image and font loading.
- [ ] Test contact form delivery.
- [ ] Validate responsive layouts.
- [ ] Configure production domain and HTTPS.
- [ ] Verify sitemap, robots directives and favicon.

For reproducible CI installations, prefer:

```bash
npm ci
npm run build
```

# Maintenance

When adding a new service:

1. Add its configuration to the centralized service data.
2. Ensure the slug is unique.
3. Provide service-specific metadata and content.
4. Update navigation if it is not data-driven.
5. Verify the generated route.
6. Test desktop and mobile navigation.

When adding an article:

1. Add the article to the configured content source.
2. Provide a unique slug.
3. Include valid metadata and image assets.
4. Verify the article detail route.
5. Confirm publication status and related links.

# License

Proprietary project.

Source code, branding and original project assets are maintained for Brand Yatra. Third-party packages and assets remain subject to their respective licenses.

## Maintainer

**Brand Yatra Development Team**

---

© 2026 Brand Yatra. All rights reserved.
