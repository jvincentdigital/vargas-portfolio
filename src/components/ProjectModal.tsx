'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ExternalPlatform, Project } from '@/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

const PLATFORM_LABEL: Record<ExternalPlatform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  website: 'Website',
};

const VIDEO_EXT = /\.(mp4|mov|webm|m4v)$/i;

export default function ProjectModal({ project, onClose }: Props) {
  const tPortfolio = useTranslations('portfolio');
  const tProject = useTranslations(`portfolio.projects.${project.id}`);
  const tTags = useTranslations('portfolio.tag_labels');
  const tMetrics = useTranslations('portfolio.metric_labels');

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [brokenAssets, setBrokenAssets] = useState<Set<string>>(new Set());

  const title = tProject('title');
  const titleId = `project-modal-title-${project.id}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const markBroken = (src: string) =>
    setBrokenAssets((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl border border-sand/30 shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={tPortfolio('close')}
          className="sticky top-4 float-right mr-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-cream/90 border border-sand/30 hover:bg-terracotta/20 text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          <p className="text-xs uppercase tracking-wider text-terracotta font-medium mb-2">
            {project.client}
          </p>
          <h3
            id={titleId}
            className="font-display text-3xl md:text-4xl text-espresso mb-4"
          >
            {title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-sand/20 text-espresso/80 rounded-full"
              >
                {tTags(tag)}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <p className="text-espresso/70 uppercase text-xs tracking-wider mb-1">
                {tPortfolio('role_label')}
              </p>
              <p className="text-espresso">{tProject('role')}</p>
            </div>
            <div>
              <p className="text-espresso/70 uppercase text-xs tracking-wider mb-1">
                {tPortfolio('period_label')}
              </p>
              <p className="text-espresso">{tProject('period')}</p>
            </div>
          </div>

          <p className="text-espresso text-base leading-relaxed mb-4">
            {tProject('summary')}
          </p>
          <p className="text-espresso/75 text-base leading-relaxed mb-8 whitespace-pre-line">
            {tProject('description')}
          </p>

          {project.metrics.length > 0 && (
            <div className="mb-8">
              <p className="text-espresso/70 uppercase text-xs tracking-wider mb-3">
                {tPortfolio('metrics_label')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.labelKey} className="bg-sand/10 rounded-xl p-4">
                    <p className="font-display text-2xl text-espresso leading-none">
                      {m.value}
                    </p>
                    <p className="text-xs text-espresso/70 mt-2">
                      {tMetrics(m.labelKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.gallery
                  .filter((src) => !brokenAssets.has(src))
                  .map((src) =>
                    VIDEO_EXT.test(src) ? (
                      <video
                        key={src}
                        src={src}
                        controls
                        playsInline
                        preload="metadata"
                        onError={() => markBroken(src)}
                        className="w-full rounded-xl bg-sand/20 aspect-video object-cover"
                      />
                    ) : (
                      <div
                        key={src}
                        className="relative w-full rounded-xl bg-sand/20 aspect-video overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`${project.client} — ${title}`}
                          onError={() => markBroken(src)}
                          fill
                          sizes="(min-width: 640px) 350px, 90vw"
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
              </div>
            </div>
          )}

          {project.externalLinks && project.externalLinks.length > 0 && (
            <div>
              <p className="text-espresso/70 uppercase text-xs tracking-wider mb-3">
                {tPortfolio('external_links_label')}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.externalLinks.map((link) => (
                  <a
                    key={link.platform + link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 transition-colors"
                  >
                    {PLATFORM_LABEL[link.platform]} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
