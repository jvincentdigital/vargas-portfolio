'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = (newLocale: 'es' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand/30"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl text-espresso hover:text-terracotta transition-colors">
          C.V.V.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-espresso/70 hover:text-terracotta transition-colors"
            >
              {t(link.key)}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1 ml-4 bg-sand/20 rounded-full px-1 py-1">
            <button
              onClick={() => switchLocale('es')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                locale === 'es'
                  ? 'bg-terracotta text-cream'
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                locale === 'en'
                  ? 'bg-terracotta text-cream'
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-espresso transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-espresso transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-espresso transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream/95 backdrop-blur-md border-b border-sand/30 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-espresso/70 hover:text-terracotta transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => switchLocale('es')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    locale === 'es'
                      ? 'bg-terracotta text-cream'
                      : 'text-espresso/60 hover:text-espresso bg-sand/20'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    locale === 'en'
                      ? 'bg-terracotta text-cream'
                      : 'text-espresso/60 hover:text-espresso bg-sand/20'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
