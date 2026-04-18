'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

type Status = 'idle' | 'sending' | 'success' | 'error_invalid' | 'error_generic';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      company: data.get('company'),
    };

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else if (res.status === 400) {
        setStatus('error_invalid');
      } else {
        setStatus('error_generic');
      }
    } catch {
      setStatus('error_generic');
    }
  }

  const isSending = status === 'sending';
  const feedback =
    status === 'success'
      ? { role: 'status', tone: 'bg-olive/20 text-espresso', message: t('success') }
      : status === 'error_invalid'
        ? { role: 'alert', tone: 'bg-terracotta/20 text-espresso', message: t('error_invalid') }
        : status === 'error_generic'
          ? { role: 'alert', tone: 'bg-terracotta/20 text-espresso', message: t('error_generic') }
          : null;

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-espresso mb-6 text-center"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-terracotta font-display text-xl italic mb-12"
        >
          {t('cta')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <a
            href="mailto:christianvv13@gmail.com"
            className="flex items-center gap-2 text-espresso/70 hover:text-terracotta rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            christianvv13@gmail.com
          </a>
          <a
            href="tel:+17872649554"
            className="flex items-center gap-2 text-espresso/70 hover:text-terracotta rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            787-264-9554
          </a>
          <a
            href="https://www.linkedin.com/in/christian-vargas-valentín-100008224"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-espresso/70 hover:text-terracotta rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          noValidate
          className="bg-cream rounded-2xl p-8 border border-sand/20 space-y-6"
        >
          {/* Honeypot: real users can't see or tab into this */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              overflow: 'hidden',
            }}
          >
            <label htmlFor="contact-company">Company (leave empty)</label>
            <input
              id="contact-company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-espresso/70 mb-2">
              {t('name_label')}
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              placeholder={t('name_placeholder')}
              required
              maxLength={100}
              disabled={isSending}
              className="w-full px-4 py-3 bg-sand/10 border border-sand/30 rounded-xl text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-espresso/70 mb-2">
              {t('email_label')}
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              placeholder={t('email_placeholder')}
              required
              maxLength={200}
              disabled={isSending}
              className="w-full px-4 py-3 bg-sand/10 border border-sand/30 rounded-xl text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-espresso/70 mb-2">
              {t('message_label')}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder={t('message_placeholder')}
              required
              minLength={10}
              maxLength={5000}
              disabled={isSending}
              className="w-full px-4 py-3 bg-sand/10 border border-sand/30 rounded-xl text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/20 transition-colors resize-none disabled:opacity-60"
            />
          </div>

          {feedback && (
            <p
              role={feedback.role}
              aria-live="polite"
              className={`rounded-xl px-4 py-3 text-sm ${feedback.tone}`}
            >
              {feedback.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-terracotta text-cream py-4 rounded-xl font-medium text-base hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2 focus-visible:ring-offset-cream transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSending ? t('sending') : t('send')}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
