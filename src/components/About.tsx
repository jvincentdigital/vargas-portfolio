'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const t = useTranslations('about');

  const certifications: string[] = t.raw('certifications');
  const awards: string[] = t.raw('awards');

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeInView>
          <h2 className="font-display text-4xl md:text-5xl text-espresso mb-12 text-center">
            {t('title')}
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="text-lg md:text-xl text-espresso/80 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            {t('bio')}
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="bg-sand/15 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-terracotta text-xl">🎓</span>
              <p className="text-espresso font-medium">{t('education')}</p>
            </div>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FadeInView delay={0.3}>
            <div className="bg-sand/15 rounded-2xl p-8 h-full">
              <h3 className="font-display text-xl text-espresso mb-4">{t('certifications_title')}</h3>
              <ul className="space-y-2">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-espresso/70 flex items-start gap-2">
                    <span className="text-terracotta mt-1 text-sm">●</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>

          <FadeInView delay={0.4}>
            <div className="bg-sand/15 rounded-2xl p-8 h-full">
              <h3 className="font-display text-xl text-espresso mb-4">{t('awards_title')}</h3>
              <ul className="space-y-2">
                {awards.map((award, i) => (
                  <li key={i} className="text-espresso/70 flex items-start gap-2">
                    <span className="text-terracotta mt-1 text-sm">●</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        </div>

        <FadeInView delay={0.5}>
          <p className="text-center text-terracotta font-medium text-lg italic">
            {t('focus')}
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
