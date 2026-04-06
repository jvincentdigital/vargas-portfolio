'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-terracotta font-medium text-sm tracking-widest uppercase mb-6"
        >
          Social Media Manager & Content Creator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-espresso leading-tight mb-6"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-display text-xl md:text-2xl lg:text-3xl text-terracotta/90 italic mb-4"
        >
          {t('tagline')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-espresso/60 text-base md:text-lg mb-10 tracking-wide"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <a
            href="#portfolio"
            className="inline-block bg-terracotta text-cream px-8 py-4 rounded-full font-medium text-base hover:bg-espresso transition-colors duration-300"
          >
            {t('cta')}
          </a>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: 'easeInOut' }}
          className="mt-16 mx-auto w-24 h-px bg-sand"
        />
      </div>
    </section>
  );
}
