import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { routing } from '@/i18n/routing';

const displayFont = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('title');
  const description = t('description');

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_PR' : 'en_US',
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => (l === 'es' ? 'es_PR' : 'en_US')),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'a11y' });

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="font-body bg-cream text-espresso">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-terracotta focus:text-cream focus:font-medium focus:outline-none focus:ring-2 focus:ring-terracotta/60"
        >
          {t('skip_to_main')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
