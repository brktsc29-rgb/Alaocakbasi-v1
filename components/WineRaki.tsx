'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

interface DrinkItem {
  id: string;
  type: 'raki' | 'wine';
  name: string;
  region: string;
  note: string;
  year: string;
  price: string;
  featured: boolean;
  grape?: string;
}

function SelectionCard({ name, region, note, year, price, featured, extra, delay, recommendedLabel }: {
  name: string; region: string; note: string; year: string; price: string;
  featured?: boolean; extra?: string; delay: number; recommendedLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }} viewport={{ once: true }}
      className={`relative p-6 border md:transition-all md:duration-500 md:hover:border-luxury-gold/40 group ${
        featured ? 'border-luxury-gold/30 bg-luxury-gold/[0.04]' : 'border-luxury-cream/5 bg-luxury-surface/40'
      }`}
    >
      {featured && (
        <span className="absolute top-3 right-3 text-[9px] tracking-[0.3em] uppercase text-luxury-gold font-inter">
          {recommendedLabel}
        </span>
      )}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className="font-instrument text-luxury-cream text-xl md:group-hover:text-luxury-gold md:transition-colors md:duration-300 mb-1">
            {name}
          </h4>
          <p className="text-luxury-cream/30 text-[10px] tracking-[0.2em] uppercase font-inter">{region}</p>
          {extra && (
            <p className="text-luxury-cream/30 text-[10px] tracking-[0.15em] uppercase font-inter mt-0.5">{extra}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-instrument text-luxury-gold text-xl">{price}</p>
          {year !== '—' && <p className="text-luxury-cream/30 text-[10px] font-inter mt-0.5">{year}</p>}
        </div>
      </div>
      <p className="text-luxury-cream/40 text-xs font-inter font-light mt-4 leading-relaxed">{note}</p>
    </motion.div>
  );
}

export default function WineRaki() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [drinks, setDrinks] = useState<DrinkItem[]>([]);

  useEffect(() => {
    fetch('/api/drinks')
      .then((r) => r.ok ? r.json() : [])
      .then(setDrinks)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wine-header', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.wine-header', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const raki = drinks.filter((d) => d.type === 'raki');
  const wines = drinks.filter((d) => d.type === 'wine');

  return (
    <section ref={sectionRef} id="wine"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop"
          alt="" fill className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-luxury-surface/90" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="wine-header text-center mb-20 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            {t.wine_eyebrow}
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            {t.wine_h1}
            <br />
            <span className="italic text-luxury-gold">{t.wine_h2}</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
          <p className="text-luxury-cream/40 font-inter font-light text-sm mt-6 max-w-md mx-auto leading-relaxed">
            {t.wine_desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-luxury-gold/40" />
              <h3 className="font-instrument text-luxury-gold text-2xl italic">{t.wine_raki_col}</h3>
              <div className="flex-1 h-px bg-luxury-gold/10" />
            </div>
            <div className="space-y-4">
              {raki.map((item, i) => (
                <SelectionCard key={item.id} {...item} delay={i * 0.1} recommendedLabel={t.wine_recommended} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-luxury-gold/40" />
              <h3 className="font-instrument text-luxury-gold text-2xl italic">{t.wine_wines_col}</h3>
              <div className="flex-1 h-px bg-luxury-gold/10" />
            </div>
            <div className="space-y-4">
              {wines.map((item, i) => (
                <SelectionCard key={item.id} {...item} extra={item.grape} delay={i * 0.1 + 0.2} recommendedLabel={t.wine_recommended} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-16">
          {t.wine_disclaimer}
        </p>
      </div>
    </section>
  );
}
