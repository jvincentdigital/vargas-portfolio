'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface Role {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export default function Experience() {
  const t = useTranslations('experience');
  const roles: Role[] = t.raw('roles');

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-espresso mb-16 text-center"
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-sand/50" />

          <div className="space-y-8">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-terracotta border-2 border-cream" />

                <div className="bg-cream rounded-2xl p-6 md:p-8 border border-sand/20 hover:border-terracotta/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl text-espresso">{role.company}</h3>
                    <span className="text-sm text-terracotta font-medium whitespace-nowrap">
                      {role.period}
                    </span>
                  </div>
                  <p className="text-espresso/70 font-medium mb-1">
                    {role.role}
                    {role.location && <span className="text-espresso/60"> · {role.location}</span>}
                  </p>
                  <p className="text-espresso/70 text-sm leading-relaxed mt-3">
                    {role.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
