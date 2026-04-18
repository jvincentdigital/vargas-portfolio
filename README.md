# vargas-portfolio

Bilingual (ES/EN) Next.js portfolio site for Christian A. Vargas Valentín — Social Media Manager & content creator.

## Commands

All operations go through the `Makefile`. Run `make help` for the full list.

### Development

```bash
make install      # Install npm dependencies
make dev          # Start Next.js dev server on :3000
make typecheck    # TS typecheck (no emit)
make lint         # Next.js ESLint
make test         # Typecheck + lint
```

### Build & run

```bash
make build        # Production build (next build)
make start        # Run the production build locally
make clean        # Remove .next/ and out/
```

### Deployment (Vercel)

```bash
make deploy                 # Deploy a preview to Vercel
make deploy TARGET=prod     # Deploy to production
make logs TARGET=prod       # Stream production logs
make status                 # List recent deployments
```

### Docs

```bash
make docs         # Serve docs/ on :8000
```

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-intl

See [`CLAUDE.md`](./CLAUDE.md) for architecture and conventions.
