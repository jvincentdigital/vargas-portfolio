# Portfolio — contributor guide

How to add / edit case studies in the Portfolio section.

## Architecture

Three moving parts:

1. **`src/data/projects.ts`** — non-translatable structure (id, client, tags, metric keys + values, asset paths, external links).
2. **`messages/en.json` + `messages/es.json`** under `portfolio.projects.<id>` — all translatable copy (title, role, period, summary, description).
3. **`public/portfolio/<id>/`** — images and video for the card thumbnail + modal gallery.

Rendering:

- `src/components/Portfolio.tsx` — section, grid, modal state
- `src/components/ProjectCard.tsx` — card in grid
- `src/components/ProjectModal.tsx` — accessible modal (focus trap, ESC, scroll lock)

## Adding a new project

### 1. Pick a slug

Lowercase, hyphenated, URL-safe. It's the `id` in `projects.ts` and the key in `messages.*.json`. Example: `bakery-xyz`.

### 2. Add an entry to `src/data/projects.ts`

```ts
{
  id: 'bakery-xyz',
  client: 'Bakery XYZ',
  tags: ['strategy', 'reels', 'branding'],       // keys from TagKey union
  metrics: [
    { labelKey: 'reels_per_month', value: '8' }, // labelKey from MetricLabelKey union
    { labelKey: 'organic_growth', value: '+38%' },
  ],
  thumbnail: '/portfolio/bakery-xyz/thumbnail.jpg',
  gallery: [
    '/portfolio/bakery-xyz/01.jpg',
    '/portfolio/bakery-xyz/reel-1.mp4',
  ],
  externalLinks: [
    { platform: 'instagram', url: 'https://instagram.com/bakeryxyz' },
  ],
},
```

If the tag or metric you need doesn't exist yet, add it to the `TagKey` / `MetricLabelKey` union at the top of `projects.ts`, then add the translated label to **both** message files (see step 3).

### 3. Add translations to BOTH message files

Under `portfolio.projects.<slug>` in `messages/en.json` and `messages/es.json`:

```json
"bakery-xyz": {
  "title": "Short descriptive title",
  "role": "Social Media Manager",
  "period": "Jan 2026 – Present",
  "summary": "One or two sentences that appear in the modal header.",
  "description": "Longer paragraph: objectives, approach, outcomes."
}
```

**Keys must match across locales.** Missing keys throw at runtime.

### 4. Drop assets

Put images and videos in `public/portfolio/<slug>/`. Paths referenced in `projects.ts` must match these filenames. Large videos (>10 MB) should go to a CDN (Vercel Blob, Cloudflare Stream) instead of the repo — edit the `gallery` path to the remote URL in that case.

## Available tag keys

| Key               | EN label       | ES label            |
| ----------------- | -------------- | ------------------- |
| `reels`           | Reels          | Reels               |
| `strategy`        | Strategy       | Estrategia          |
| `meta_ads`        | Meta Ads       | Meta Ads            |
| `tiktok`          | TikTok         | TikTok              |
| `copywriting`     | Copywriting    | Copywriting         |
| `audiovisual`     | Audiovisual    | Audiovisual         |
| `branding`        | Branding       | Branding            |
| `event_coverage`  | Event coverage | Cobertura de evento |
| `campaign`        | Campaign       | Campaña             |

Need something else? Add to the `TagKey` union in `projects.ts` and to `portfolio.tag_labels` in both message files.

## Available metric label keys

| Key               | EN label       | ES label              |
| ----------------- | -------------- | --------------------- |
| `reels_per_month` | Reels/month    | Reels/mes             |
| `organic_growth`  | Organic growth | Crecimiento orgánico  |
| `campaigns_run`   | Campaigns      | Campañas              |
| `events_covered`  | Events         | Eventos               |
| `posts_designed`  | Posts          | Publicaciones         |

Need something else (engagement rate, followers gained, videos produced, etc.)? Add to `MetricLabelKey` in `projects.ts` and to `portfolio.metric_labels` in both message files.

## Placeholders still to fill

Grep the repo for `[PENDING_` to find everything outstanding. Current list:

- **`projects.ts`:**
  - `organic_growth` metric for `join-a-join`
  - `campaigns_run`, `events_covered` metrics for `united-way-pr`
  - `posts_designed` metric for `semila-cacao360`
  - All `thumbnail` paths (files don't exist yet — card falls back to gradient until then)
  - All `gallery` paths (hidden until assets land)
  - All `externalLinks` arrays (commented placeholders)

- **`messages/en.json` + `messages/es.json`:**
  - `description` field of every project is `[PENDING_DESCRIPTION]` — replace with Christian's real case-study copy.

## Accessibility notes

- Cards are `<button>` with `aria-label="<client> — <title>"` and visible focus ring.
- Modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title, a manual focus trap (Tab cycles within the dialog), ESC to close, click-on-backdrop to close, and body scroll lock.
- `<video>` uses `controls` + `playsInline`; `<img>` uses `loading="lazy"` and `alt` text.
- Framer Motion animations fire on `whileInView` — add a `useReducedMotion` check if this becomes a concern.

## Known TODOs

- Migrate `<img>` tags to `next/image` once real assets are in place (today they're regular `<img>` because paths `[PENDING_ASSET]` would break `next/image` at build).
- Consider promoting the modal to a dedicated `/portfolio/[slug]` route for SEO and shareable URLs.
