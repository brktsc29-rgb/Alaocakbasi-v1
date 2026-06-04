'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LOCALES, type Locale } from '@/locales/translations';
import { motion, AnimatePresence } from 'framer-motion';

const LABELS: Record<Locale, { short: string; native: string }> = {
  tr: { short: 'TR', native: 'Türkçe' },
  en: { short: 'EN', native: 'English' },
  de: { short: 'DE', native: 'Deutsch' },
  ar: { short: 'AR', native: 'العربية' },
  ru: { short: 'RU', native: 'Русский' },
  fr: { short: 'FR', native: 'Français' },
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    router.push(`/${locale}`);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-luxury-cream/50 hover:text-luxury-gold text-[10px] tracking-[0.2em] uppercase font-inter transition-colors duration-300"
        aria-label="Dil seç"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60" />
        {LABELS[currentLocale].short}
        <span
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ fontSize: 8 }}
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-3 glass border border-luxury-gold/15 min-w-[130px] py-1 z-50"
          >
            {LOCALES.map((locale) => (
              <button
                key={locale}
                onClick={() => switchTo(locale)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-150
                  ${locale === currentLocale
                    ? 'text-luxury-gold bg-luxury-gold/5'
                    : 'text-luxury-cream/50 hover:text-luxury-cream/90 hover:bg-luxury-cream/[0.03]'
                  }`}
              >
                <span className="text-[9px] tracking-[0.2em] uppercase font-inter">
                  {LABELS[locale].short}
                </span>
                <span className="text-xs font-inter font-light">
                  {LABELS[locale].native}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
