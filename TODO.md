# TODO

Mark `[~]` when starting, `[x]` when done. Start from the top unless told otherwise.

## Content gaps

- [~] **Fill in real Portfolio content.** The Portfolio section now ships with 3 case studies (Join A Join, United Way PR, Semila/Cacao360 — USC was removed). **Join A Join** has real assets (thumbnail + 3 house posts + 3 reels, under `public/portfolio/join-a-join/`); still pending are `organic_growth` metric, `[PENDING_DESCRIPTION]` copy in EN + ES, Instagram/TikTok URLs, and a decision on where to host `top 12(1).mp4` (453 MB — needs CDN, not repo). **United Way PR** and **Semila/Cacao360** have no assets or metric values yet; cards show gradient fallback. See `README_PORTFOLIO.md` for the full checklist and `grep -rn "\[PENDING_" src/ messages/` to enumerate.

## Production readiness

- [~] **Replace `mailto:` contact form with a real backend.** Code done: `src/app/api/contact/route.ts` sends via Resend with honeypot + length/email validation; `Contact.tsx` rewritten to POST JSON, track `sending/success/error` state, and surface feedback via `aria-live`. Still blocked on config: set `RESEND_API_KEY` + `RESEND_FROM` in Vercel (see `.env.local.example` and `docs/deploy.md`). Until then the endpoint returns `500 misconfigured` and the user sees the generic error.

- [x] **Add per-page SEO metadata.** Done: `generateMetadata` in `src/app/[locale]/layout.tsx` reads a new `seo` namespace from messages and emits `openGraph`, `twitter`, `alternates.canonical`, and `alternates.languages` per locale. Root layout now just sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` (placeholder `https://vargas-portfolio.vercel.app` until a custom domain is wired).

- [x] **Add an Open Graph image.** Done: dynamic `src/app/opengraph-image.tsx` renders a 1200×630 card using the design system palette (cream→sand gradient, espresso text, terracotta eyebrow). Uses the Edge runtime and Next's `ImageResponse`. Build wires it up for both locale routes via the `openGraph.images` metadata chain.

- [x] **Generate `sitemap.xml` and `robots.txt`.** Done: `src/app/sitemap.ts` + `src/app/robots.ts`. Sitemap emits one entry per locale with `alternates.languages` (hreflang). Base URL reads from `NEXT_PUBLIC_SITE_URL` with the same Vercel fallback as `metadataBase`.

- [x] **Move Google Fonts from `@import` to `next/font`.** Done: `DM_Serif_Display` + `Plus_Jakarta_Sans` loaded via `next/font/google` in `[locale]/layout.tsx` with `display: 'swap'`, exposed as `--font-display` / `--font-body` CSS variables. Tailwind `fontFamily` updated to consume the variables. `@import` removed from `globals.css`.

- [x] **Optimize portfolio / hero images.** Done: `ProjectCard` and `ProjectModal` both use `next/image` with `fill` + `sizes` and an `onError` fallback to the gradient placeholder. No `<img>` tags remain in the codebase. Hero has no imagery (text only), so no `priority` image needed. When large assets land, `next/image` auto-serves responsive + WebP.

- [x] **Accessibility pass.** Done: `MotionConfig reducedMotion="user"` wrapper respects `prefers-reduced-motion`; aria-labels in i18n (Navbar toggle, Footer email/LinkedIn, Hero eyebrow); `aria-expanded` on mobile menu; `aria-pressed` on ES/EN language toggles; bilingual skip-link + `<main id="main-content" tabIndex={-1}>`; heading hierarchy reviewed (one `h1`, `h2` per section, `h3` subsections). Contrast audit — all `text-espresso/50` and most `text-espresso/60` bumped to `/70+` to hit WCAG AA 4.5:1 on both `bg-cream` and `bg-sand/20`. Focus rings — consistent `focus-visible:ring-terracotta/60` with `ring-offset` added to every interactive element (Navbar logo/links/lang-toggle/hamburger, Hero CTA, Contact form + links + submit, Footer socials).

- [x] **Add analytics.** Done: `@vercel/analytics` installed and `<Analytics />` mounted in `[locale]/layout.tsx`. No-op in local dev; reports automatically on Vercel-hosted deployments (free on hobby tier).

- [ ] **Link a custom domain.** Assuming the goal is a professional portfolio — check Vercel domains and wire up a branded domain if not already done. Update `metadataBase` in root layout to match.

- [x] **Add CI.** Done: `.github/workflows/ci.yml` runs `make test` (typecheck + lint) on PRs and pushes to `main`, with npm cache enabled on Node 20.

- [x] **Configure ESLint beyond the default.** Done: `.eslintrc.json` extends `next/core-web-vitals`. `npm run lint` now runs non-interactively and the current tree is clean.

- [x] **Add a basic 404 / not-found page.** Done: `src/app/[locale]/not-found.tsx` (translated, via `not_found` namespace) covers invalid-locale routes and any `notFound()` inside `[locale]`. `src/app/not-found.tsx` is a self-contained bilingual fallback (html+body inline because the root layout returns raw children) for URLs that miss the `[locale]` matcher entirely.

- [x] **Translate root-layout metadata.** Done: root `src/app/layout.tsx` no longer carries locale-specific copy — it just sets `metadataBase` and a generic fallback title. Per-locale title/description come from `generateMetadata` in `[locale]/layout.tsx` driven by the `seo` namespace.

- [x] **Add a CSP / security headers config.** Done: `next.config.mjs` emits `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy` for camera/microphone/geolocation on all paths. No full CSP yet — would be the next step once external scripts (analytics, fonts, etc.) stabilize.

- [ ] **Verify mobile behavior end-to-end.** Framer Motion `whileInView` + long sections can misbehave on iOS Safari. Test scroll reveals, the language switcher (is there one in `Navbar`?), and the contact form on a real phone.
