# Deploy

The site deploys to Vercel. GitHub repo: `jvincentdigital/vargas-portfolio`. Vercel project: `vargas-portfolio`.

## Normal flow

Vercel's GitHub integration auto-deploys on push:

- **Push to `main`** → production deploy
- **Push to any other branch / PR** → preview deploy with a unique URL

## Manual deploys via CLI

```bash
make deploy               # preview deploy from current working tree
make deploy TARGET=prod   # production deploy from current working tree
```

Both use the `vercel` CLI. First-time setup: `vercel login` and `vercel link` (links the local folder to the Vercel project).

## Inspecting a deploy

```bash
make status                 # list recent deployments
make logs                   # stream preview logs
make logs TARGET=prod       # stream production logs
```

## Environment variables

See `.env.local.example` for the full list with comments. Current variables:

| Name                  | Purpose                                                                 | Required            |
| --------------------- | ----------------------------------------------------------------------- | ------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by `metadataBase`, `sitemap.ts`, `robots.ts`.   | Prod (recommended)  |
| `RESEND_API_KEY`       | Resend API key that powers `/api/contact`.                              | Prod (for form)     |
| `RESEND_FROM`          | From header for contact emails — must be a Resend-verified sender.      | Prod (for form)     |

Set secrets via CLI:

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM production
# Repeat for `preview` and `development` as needed
```

Pull them to `.env.local` for local dev:

```bash
vercel env pull .env.local
```

`.env*` files are gitignored.

### Contact form notes

- The `/api/contact` route reads `RESEND_API_KEY` + `RESEND_FROM` at request time. If either is missing, the endpoint returns `500 misconfigured` — the form surfaces the generic error to the user.
- `RESEND_FROM` must use a **domain already verified in Resend**. Using `onboarding@resend.dev` is allowed for smoke tests but spam filters will eat it for real traffic.
- The form has a honeypot field (`name="company"`, visually hidden). Bots that fill it get a fake `200 ok` response so they don't adapt.
- Analytics (`@vercel/analytics`) is wired in `[locale]/layout.tsx`. It only reports on Vercel-hosted deployments; local dev is a no-op.

## Domains

Check the Vercel dashboard for the custom domain config. If a domain needs to be added/changed, use `vercel domains` or the dashboard — domain changes propagate via DNS and can take minutes to hours.
