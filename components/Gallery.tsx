'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import { useT } from '@/contexts/I18nContext';
import storyImage from '@/public/story-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', span: '' },
  { src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop', span: '' },
  { src: storyImage.src, span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop', span: '' },
  { src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=800&auto=format&fit=crop', span: '' },
];

export default function Gallery() {
  const t = useT();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-eyebrow', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: '.gallery-eyebrow', start: 'top 85%' } });
      gsap.fromTo('.gallery-item', { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
    if (lightboxSrc) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [lightboxSrc]);

  return (
    <section ref={sectionRef} id="gallery"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="gallery-eyebrow text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter opacity-0">
            {t.gallery_eyebrow}
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl text-luxury-cream">
            {t.gallery_h1}
            <br />
            <span className="italic text-luxury-gold">{t.gallery_h2}</span>
          </h2>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.button key={i}
              className={`gallery-item opacity-0 relative overflow-hidden group ${img.span}`}
              onClick={() => setLightboxSrc(img.src)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              aria-label={`${t.gallery_eyebrow} ${i + 1}`}
            >
              <Image src={img.src} alt="" fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-all duration-400" />
              <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-all duration-400" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass p-3 rounded-full">
                  <ZoomIn size={18} className="text-luxury-gold" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-20 overflow-hidden py-4 border-t border-b border-luxury-gold/10">
          <div className="marquee-track flex gap-12 whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-luxury-gold/20 font-instrument italic text-2xl shrink-0">
                Lezzet · Tutku · Ateş · Sanat · Akdeniz · Keyif ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxSrc} alt="" fill className="object-contain" sizes="100vw" />
              <div className="absolute inset-0 border border-luxury-gold/20" />
            </motion.div>
            <button
              className="absolute top-6 right-6 glass p-3 text-luxury-cream hover:text-luxury-gold transition-colors duration-300"
              onClick={() => setLightboxSrc(null)} aria-label="Close"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
