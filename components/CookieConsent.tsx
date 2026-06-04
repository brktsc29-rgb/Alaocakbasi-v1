'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ala_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ala_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('ala_cookie_consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-8 md:pb-6"
        >
          <div className="max-w-5xl mx-auto glass border border-luxury-gold/20 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            {/* Icon */}
            <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-luxury-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-luxury-cream/80 text-xs font-inter font-light leading-relaxed">
                Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanmaktadır.{' '}
                <Link href="/tr/gizlilik" className="text-luxury-gold hover:underline transition-colors duration-200">
                  Gizlilik Politikası
                </Link>{' '}
                ve{' '}
                <Link href="/tr/cerez-politikasi" className="text-luxury-gold hover:underline transition-colors duration-200">
                  Çerez Politikamız
                </Link>{' '}
                hakkında daha fazla bilgi alabilirsiniz.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={decline}
                className="flex-1 md:flex-none px-5 py-2.5 border border-luxury-cream/20 text-luxury-cream/50 hover:text-luxury-cream/80 hover:border-luxury-cream/40 text-[10px] tracking-[0.2em] uppercase font-inter transition-all duration-300"
              >
                Reddet
              </button>
              <button
                onClick={accept}
                className="flex-1 md:flex-none px-5 py-2.5 bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light text-[10px] tracking-[0.2em] uppercase font-inter font-medium transition-all duration-300"
              >
                Kabul Et
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
