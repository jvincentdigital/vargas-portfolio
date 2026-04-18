# CLAUDE.md

## Project Overview

Bilingual (Spanish/English) marketing portfolio site for Christian A. Vargas Valentín, a Social Media Manager and content creator based in Puerto Rico. A single-page Next.js App Router site with animated sections (Hero, About, Skills, Experience, Portfolio, Contact). Content is fully translated via `next-intl`. No backend — the contact form submits via `mailto:`. Deployed to Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components)
- **Language:** TypeScript (strict)
- **UI:** React 18, Tailwind CSS, Framer Motion
- **i18n:** `next-intl` with `es` (default) and `en` locales
- **Fonts:** DM Serif Display (display), Plus Jakarta Sans (body) — loaded via Google Fonts in `globals.css`
- **Deploy:** Vercel (project: `vargas-portfolio`)

## Commands

All operations go through the `Makefile` — the single entry point.

```bash
make install       # npm install
make dev           # start dev server on :3000
make build         # next build
make test          # typecheck + lint
make deploy TARGET=prod
```

Run `make help` for the full list.

## Project Structure

```
src/
  app/
    [locale]/
      layout.tsx        # next-intl provider, <html lang>
      page.tsx          # composes all section components in order
    layout.tsx          # root metadata (site title/description)
    globals.css         # Tailwind + Google Fonts import + base styling
  components/           # Hero, About, Skills, Experience, Portfolio, Contact, Navbar, Footer
  i18n/
    routing.ts          # locales = ['es','en'], defaultLocale = 'es'
    request.ts          # loads messages/{locale}.json per request
  middleware.ts         # next-intl locale routing (matcher: /, /(es|en)/:path*)
messages/
  en.json
  es.json
docs/
Makefile
TODO.md
```

## Architecture

- **Single page, sectioned:** `src/app/[locale]/page.tsx` renders all section components sequentially. Each section reads its copy via `useTranslations('<namespace>')`.
- **i18n:** Locale is a URL segment (`/es/*`, `/en/*`). `middleware.ts` handles locale detection/redirect. `src/i18n/request.ts` imports the matching JSON from `messages/`.
- **Animations:** Section components are `'use client'` and use `framer-motion` (`motion.div`, `whileInView`, `viewport={{ once: true }}`) for scroll-triggered reveals.
- **Contact form:** `action="mailto:christianvv13@gmail.com"` — no API route, no backend. The user's mail client handles submission. This is a known limitation (see TODO.md).
- **Design system:** Warm earth-tone palette defined in `tailwind.config.ts` — `sand`, `espresso`, `terracotta`, `cream`, `olive`, `clay`. Serif display + humanist sans body. No cold grays or blues.

## Key Workflows

### Docs

`docs/` is the single source of truth for institutional knowledge. Check it before starting unfamiliar work; write up anything non-obvious you learn.

### TODO

`TODO.md` tracks work. Mark `[~]` when starting, `[x]` when done.

### Skills

- `cli-first` — prefer `vercel`, `gh` CLIs over web dashboards
- `lsp` — use language server for type checking and navigation

## External Services

- **Vercel** — hosting and environment variables (project: `vargas-portfolio`)
- **Google Fonts** — `DM Serif Display` + `Plus Jakarta Sans` loaded at runtime via `@import` in `globals.css`

Check `.env*` for credentials before using any external service. See the `cli-first` skill.

## Conventions

- All user-facing strings live in `messages/{en,es}.json` — never hardcode copy in components. Add to both files when adding a section.
- Tailwind tokens from `tailwind.config.ts` (`bg-cream`, `text-espresso`, `bg-terracotta`) — don't reintroduce raw hex.
- Section components are `'use client'` because Framer Motion needs the client runtime.
- Import paths use the `@/*` alias (`@/components/Hero`, `@/i18n/routing`).
- New locale routes must be added to `routing.ts` AND have a matching `messages/<locale>.json`.
- Middleware matcher is `['/', '/(es|en)/:path*']` — update it if locales change.
