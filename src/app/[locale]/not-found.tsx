'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-display text-terracotta text-6xl mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-espresso mb-4">
          {t('title')}
        </h1>
        <p className="text-espresso/70 mb-8 leading-relaxed">{t('message')}</p>
        <Link
          href="/"
          className="inline-block bg-terracotta text-cream px-6 py-3 rounded-full font-medium hover:bg-espresso transition-colors"
        >
          {t('home')}
        </Link>
      </div>
    </main>
  );
}
