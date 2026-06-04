'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import LanguageSwitcher from './LanguageSwitcher';
import { useT } from '@/contexts/I18nContext';
import type { Locale } from '@/locales/translations';

export default function Navigation({ locale }: { locale: string }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: t.nav_story, href: '#story' },
    { label: t.nav_menu, href: '#menu' },
    { label: t.nav_chef, href: '#chef' },
    { label: t.nav_gallery, href: '#gallery' },
    { label: t.nav_contact, href: '#location' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-luxury-gold/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href={`/${locale}`}
            className="flex items-center gap-3"
          >
            <span className="font-instrument italic text-luxury-gold text-2xl tracking-wider">
              ÂLÂ
            </span>
            <span className="w-px h-5 bg-luxury-gold/40" />
            <span className="font-instrument text-luxury-cream/90 text-sm tracking-[0.3em] uppercase">
              Ocakbaşı
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="link-underline text-luxury-cream/60 hover:text-luxury-cream text-xs tracking-[0.2em] uppercase transition-colors duration-300 font-inter font-light"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher currentLocale={locale as Locale} />
            <MagneticButton
              variant="outline"
              href="#reservation"
              onClick={() => handleNavClick('#reservation')}
              className="text-xs py-3 px-6"
            >
              {t.nav_reservation}
            </MagneticButton>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale as Locale} />
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-luxury-gold"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-px bg-luxury-gold"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-luxury-gold"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNavClick(link.href)}
                className="font-instrument italic text-4xl text-luxury-cream hover:text-luxury-gold transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton
                variant="outline"
                href="#reservation"
                onClick={() => handleNavClick('#reservation')}
              >
                {t.nav_reservation}
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
