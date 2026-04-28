// Source of truth for the Portfolio section.
// Non-translatable structure lives here; translatable text lives in
// `messages/{en,es}.json` under `portfolio.projects.<id>.*`.
//
// When you add a project: (1) add an entry here, (2) add matching copy to both
// message files under `portfolio.projects.<id>`, (3) drop assets in
// `public/portfolio/<id>/`. See `README_PORTFOLIO.md` for the full checklist.
//
// Placeholders that still need real values from Christian are marked
// `[PENDING_*]` so a grep surfaces everything that's unfinished.

export type TagKey =
  | 'reels'
  | 'strategy'
  | 'meta_ads'
  | 'tiktok'
  | 'copywriting'
  | 'audiovisual'
  | 'branding'
  | 'event_coverage'
  | 'campaign';

export type MetricLabelKey =
  | 'reels_per_month'
  | 'organic_growth'
  | 'campaigns_run'
  | 'events_covered'
  | 'posts_designed';

export type ExternalPlatform =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'linkedin'
  | 'website';

export interface ProjectMetric {
  labelKey: MetricLabelKey;
  value: string;
}

export interface ProjectExternalLink {
  platform: ExternalPlatform;
  url: string;
}

export interface Project {
  /** Slug — also used as i18n key and asset folder name. */
  id: string;
  /** Brand / client name — not translated. */
  client: string;
  /** Tag keys; labels come from `portfolio.tag_labels.<key>`. */
  tags: TagKey[];
  /** Metric values are raw strings (numbers, percentages); labels translated. */
  metrics: ProjectMetric[];
  /** Path under /public, e.g. `/portfolio/join-a-join/thumb.jpg`. */
  thumbnail: string;
  /** Additional images/video paths shown in the modal gallery. */
  gallery: string[];
  /** Optional social / website links. */
  externalLinks?: ProjectExternalLink[];
}

export const projects: Project[] = [
  {
    id: 'join-a-join',
    client: 'Join A Join',
    tags: ['reels', 'strategy', 'meta_ads', 'tiktok', 'copywriting'],
    metrics: [
      // Real: from experience.json "10 monthly reels production"
      { labelKey: 'reels_per_month', value: '10' },
      { labelKey: 'organic_growth', value: '[PENDING_METRIC]' },
    ],
    thumbnail: '/portfolio/join-a-join/thumbnail.png',
    gallery: [
      '/portfolio/join-a-join/house-patillas.png',
      '/portfolio/join-a-join/house-parguera.png',
      '/portfolio/join-a-join/house-cabo-rojo.png',
      '/portfolio/join-a-join/reel-lake-house.mov',
      '/portfolio/join-a-join/reel-01.mp4',
      '/portfolio/join-a-join/reel-02.mp4',
    ],
    externalLinks: [
      // { platform: 'instagram', url: '[PENDING_URL]' },
      // { platform: 'tiktok', url: '[PENDING_URL]' },
    ],
  },
  {
    id: 'united-way-pr',
    client: 'United Way Puerto Rico',
    tags: ['audiovisual', 'campaign', 'event_coverage'],
    metrics: [
      { labelKey: 'campaigns_run', value: '[PENDING_METRIC]' },
      { labelKey: 'events_covered', value: '[PENDING_METRIC]' },
    ],
    thumbnail: '/portfolio/united-way-pr/thumbnail.jpg', // [PENDING_ASSET]
    gallery: [
      '/portfolio/united-way-pr/01.jpg', // [PENDING_ASSET]
    ],
    externalLinks: [
      // { platform: 'website', url: '[PENDING_URL]' },
    ],
  },
  {
    id: 'semila-cacao360',
    client: 'Semila LLC & Cacao360',
    tags: ['strategy', 'copywriting', 'event_coverage', 'branding'],
    metrics: [
      // The Coffee & Chocolate Expo 2023 coverage is called out in the
      // summary/description — keeping metric values short numbers only.
      { labelKey: 'posts_designed', value: '[PENDING_METRIC]' },
    ],
    thumbnail: '/portfolio/semila-cacao360/thumbnail.jpg', // [PENDING_ASSET]
    gallery: [
      '/portfolio/semila-cacao360/01.jpg', // [PENDING_ASSET]
    ],
    externalLinks: [
      // { platform: 'instagram', url: '[PENDING_URL]' },
    ],
  },
];
