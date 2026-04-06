'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  tags: string[];
}

const gradients = [
  'from-terracotta/40 to-sand/40',
  'from-olive/30 to-sand/30',
  'from-espresso/20 to-terracotta/30',
  'from-sand/50 to-clay/30',
  'from-olive/20 to-cream',
  'from-terracotta/30 to-espresso/20',
];

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const projects: Project[] = t.raw('projects');

  return (
    <section id="portfolio" className="py-24 px-6 bg-espresso/[0.03]">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-cream rounded-2xl overflow-hidden border border-sand/20 hover:border-terracotta/30 transition-colors cursor-pointer"
            >
              {/* Placeholder thumbnail */}
              <div className={`h-48 bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}>
                <span className="text-espresso/20 font-display text-6xl">
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg text-espresso mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-3 py-1 bg-sand/20 text-espresso/60 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-terracotta font-medium group-hover:underline">
                  {t('see_more')} →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-espresso/50 mt-12 italic"
        >
          {t('note')}
        </motion.p>
      </div>
    </section>
  );
}
