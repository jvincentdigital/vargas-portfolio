'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const GRADIENTS = [
  'from-terracotta/40 to-sand/40',
  'from-olive/30 to-sand/30',
  'from-espresso/20 to-terracotta/30',
  'from-sand/50 to-clay/30',
];

export default function ProjectCard({ project, index, onOpen }: Props) {
  const tPortfolio = useTranslations('portfolio');
  const tProject = useTranslations(`portfolio.projects.${project.id}`);
  const tTags = useTranslations('portfolio.tag_labels');
  const tMetrics = useTranslations('portfolio.metric_labels');
  const [imgBroken, setImgBroken] = useState(false);

  const gradient = GRADIENTS[index % GRADIENTS.length];
  const title = tProject('title');
  const topMetrics = project.metrics.slice(0, 2);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      aria-label={`${project.client} — ${title}`}
      className="group text-left w-full bg-cream rounded-2xl overflow-hidden border border-sand/20 hover:border-terracotta/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors cursor-pointer"
    >
      <div
        className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
        <span className="text-espresso/20 font-display text-6xl select-none" aria-hidden="true">
          {project.client.charAt(0)}
        </span>
        {project.thumbnail && !imgBroken && (
          <Image
            src={project.thumbnail}
            alt=""
            onError={() => setImgBroken(true)}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-terracotta font-medium mb-1">
          {project.client}
        </p>
        <h3 className="font-display text-lg text-espresso mb-3">{title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-sand/20 text-espresso/80 rounded-full"
            >
              {tTags(tag)}
            </span>
          ))}
        </div>

        {topMetrics.length > 0 && (
          <div className="flex gap-6 mb-4">
            {topMetrics.map((m) => (
              <div key={m.labelKey}>
                <p className="font-display text-xl text-espresso leading-none">{m.value}</p>
                <p className="text-xs text-espresso/70 mt-1">{tMetrics(m.labelKey)}</p>
              </div>
            ))}
          </div>
        )}

        <span className="text-sm text-terracotta font-medium group-hover:underline">
          {tPortfolio('view_case_study')} →
        </span>
      </div>
    </motion.button>
  );
}
