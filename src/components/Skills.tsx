'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Skills() {
  const t = useTranslations('skills');

  const technical: string[] = t.raw('technical');
  const professional: string[] = t.raw('professional');

  return (
    <section id="skills" className="py-24 px-6 bg-espresso/[0.03]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-espresso mb-16 text-center"
        >
          {t('title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical tools */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl text-espresso mb-6">{t('technical_title')}</h3>
            <div className="flex flex-wrap gap-3">
              {technical.map((tool, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#8B6347', color: '#F5ECD7' }}
                  className="px-4 py-2 bg-sand/20 text-espresso rounded-full text-sm font-medium border border-sand/30 transition-colors cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Professional competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl text-espresso mb-6">{t('professional_title')}</h3>
            <div className="space-y-4">
              {professional.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="bg-cream rounded-xl p-5 border border-sand/20 hover:border-terracotta/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-terracotta" />
                    <p className="text-espresso font-medium">{skill}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
