'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

type Category = 'baslangic' | 'ana' | 'tatli' | 'icecek';

interface MenuItem {
  id: string;
  category: Category;
  name: string;
  description: string;
  descriptions?: Record<string, string>;
  price: string;
  special: boolean;
}

export default function MenuShowcase() {
  const t = useT();
  const params = useParams();
  const locale = typeof params?.locale === 'string' ? params.locale : 'tr';
  const [active, setActive] = useState<Category>('baslangic');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const tabs: { id: Category; label: string }[] = [
    { id: 'baslangic', label: t.menu_tab_starter },
    { id: 'ana',       label: t.menu_tab_main },
    { id: 'tatli',     label: t.menu_tab_dessert },
    { id: 'icecek',    label: t.menu_tab_drinks },
  ];

  const fetchMenu = useCallback(async () => {
    try {
      const r = await fetch('/api/menu');
      if (!r.ok) throw new Error('fetch failed');
      setItems(await r.json());
      setFetchError(false);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMenu(); }, [fetchMenu]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-header', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filtered = items.filter((i) => i.category === active);

  return (
    <section ref={sectionRef} id="menu"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >

      <div className="max-w-5xl mx-auto px-6">
        <div className="menu-header text-center mb-16 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            {t.menu_eyebrow}
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            {t.menu_h1}
            <br />
            <span className="italic text-luxury-gold">{t.menu_h2}</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
        </div>

        <div className="flex items-center justify-center gap-0 mb-16 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`px-6 py-3 text-xs tracking-[0.2em] uppercase font-inter transition-all duration-300 border-b whitespace-nowrap
                ${active === tab.id
                  ? 'text-luxury-gold border-luxury-gold'
                  : 'text-luxury-cream/40 border-luxury-cream/10 hover:text-luxury-cream/70'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-luxury-cream/[0.03] animate-pulse" />
            ))}
          </div>
        ) : fetchError ? (
          <div className="text-center py-16 border border-dashed border-luxury-cream/10">
            <p className="text-luxury-cream/25 text-sm font-inter mb-3">Menü yüklenemedi.</p>
            <button
              onClick={() => { setLoading(true); setFetchError(false); fetchMenu(); }}
              className="text-luxury-gold/60 text-xs tracking-wider uppercase font-inter hover:text-luxury-gold transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-luxury-cream/20 text-sm font-inter py-16">{t.menu_empty}</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="space-y-0"
            >
              {filtered.map((item) => (
                <div key={item.id}
                  className="py-5 border-b border-luxury-cream/5 group md:hover:bg-luxury-gold/[0.03] md:transition-colors md:duration-300 px-2 -mx-2"
                >
                  {/* Name + dotted line + price row */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2 shrink-0">
                        {item.special && <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0" />}
                        <h4 className="font-instrument text-luxury-cream md:group-hover:text-luxury-gold md:transition-colors md:duration-300 text-xl">
                          {item.name}
                        </h4>
                      </div>
                      <div className="flex-1 border-b border-dotted border-luxury-cream/10 mb-1" />
                    </div>
                    <div className="flex items-baseline gap-6 shrink-0">
                      {item.description && (
                        <p className="text-luxury-cream/30 text-xs font-inter hidden md:block max-w-[260px] text-right">
                          {item.descriptions?.[locale] ?? item.description}
                        </p>
                      )}
                      <span className="font-instrument text-luxury-gold text-lg whitespace-nowrap">{item.price}</span>
                    </div>
                  </div>
                  {/* Description below name — mobile only */}
                  {item.description && (
                    <p className="md:hidden text-luxury-cream/30 text-xs font-inter mt-1.5 pl-4 leading-relaxed">
                      {item.descriptions?.[locale] ?? item.description}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <p className="text-center text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-16">
          {t.menu_footnote}
        </p>
      </div>
    </section>
  );
}
