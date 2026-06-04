'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const raki = [
  {
    name: 'Tekirdağ Altın Seri',
    region: 'Tekirdağ, Türkiye',
    note: 'Anason, meyan kökü, tatlı amber',
    year: '—',
    price: '₺380',
    featured: true,
  },
  {
    name: 'Yeni Rakı Klasik',
    region: 'İstanbul, Türkiye',
    note: 'Saf anason, hafif tatlı, uzun bitiş',
    year: '—',
    price: '₺280',
  },
  {
    name: 'Efe Zeybek',
    region: 'İzmir, Türkiye',
    note: 'Doğal üzüm, çiçeksi anason aroması',
    year: '—',
    price: '₺320',
  },
];

const wines = [
  {
    name: 'Kavaklidere Cuvée Blanc',
    region: 'Ankara Bağları, Türkiye',
    grape: 'Narince, Emir',
    note: 'Elma, armut, çiçek, hafif asidite',
    year: '2021',
    price: '₺480',
    featured: true,
  },
  {
    name: 'Vinkara Kalecik Karası',
    region: 'Ankara, Türkiye',
    grape: 'Kalecik Karası',
    note: 'Kiraz, baharatlı meşe, yumuşak tanin',
    year: '2020',
    price: '₺420',
  },
  {
    name: 'Pamukkale Kalecik',
    region: 'Denizli, Türkiye',
    grape: 'Kalecik Karası, Cabernet',
    note: 'Erik, vişne, karabiber, uzun bitiş',
    year: '2019',
    price: '₺360',
  },
  {
    name: 'Lucien Arkas Grand Cru',
    region: 'İzmir, Türkiye',
    grape: 'Cabernet Sauvignon, Syrah',
    note: 'Koyu meyve, deri, tütün, derin yapı',
    year: '2018',
    price: '₺680',
    featured: true,
  },
];

function SelectionCard({
  name,
  region,
  note,
  year,
  price,
  featured,
  extra,
  delay,
}: {
  name: string;
  region: string;
  note: string;
  year: string;
  price: string;
  featured?: boolean;
  extra?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`card-shine relative p-6 border transition-all duration-500 hover:border-luxury-gold/40 group ${
        featured
          ? 'border-luxury-gold/30 bg-luxury-gold/[0.04]'
          : 'border-luxury-cream/5 bg-luxury-surface/40'
      }`}
    >
      {featured && (
        <span className="absolute top-3 right-3 text-[9px] tracking-[0.3em] uppercase text-luxury-gold font-inter">
          Önerilen
        </span>
      )}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className="font-instrument text-luxury-cream text-xl group-hover:text-luxury-gold transition-colors duration-300 mb-1">
            {name}
          </h4>
          <p className="text-luxury-cream/30 text-[10px] tracking-[0.2em] uppercase font-inter">
            {region}
          </p>
          {extra && (
            <p className="text-luxury-cream/30 text-[10px] tracking-[0.15em] uppercase font-inter mt-0.5">
              {extra}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-instrument text-luxury-gold text-xl">{price}</p>
          {year !== '—' && (
            <p className="text-luxury-cream/30 text-[10px] font-inter mt-0.5">{year}</p>
          )}
        </div>
      </div>
      <p className="text-luxury-cream/40 text-xs font-inter font-light mt-4 leading-relaxed">
        {note}
      </p>
    </motion.div>
  );
}

export default function WineRaki() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wine-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.wine-header', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wine"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-luxury-surface/90" />
      </div>

      {/* Decorative gold orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="wine-header text-center mb-20 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            İçecek Seçkisi
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            Şarap &amp;
            <br />
            <span className="italic text-luxury-gold">Rakı</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
          <p className="text-luxury-cream/40 font-inter font-light text-sm mt-6 max-w-md mx-auto leading-relaxed">
            Özenle seçilmiş Türk ve Dünya şarapları, geleneksel rakı seçkimiz
            ile sofralarınızı taçlandırıyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Rakı Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-luxury-gold/40" />
              <h3 className="font-instrument text-luxury-gold text-2xl italic">
                Rakı Seçkisi
              </h3>
              <div className="flex-1 h-px bg-luxury-gold/10" />
            </div>
            <div className="space-y-4">
              {raki.map((item, i) => (
                <SelectionCard
                  key={item.name}
                  name={item.name}
                  region={item.region}
                  note={item.note}
                  year={item.year}
                  price={item.price}
                  featured={item.featured}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Wine Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-luxury-gold/40" />
              <h3 className="font-instrument text-luxury-gold text-2xl italic">
                Şarap Seçkisi
              </h3>
              <div className="flex-1 h-px bg-luxury-gold/10" />
            </div>
            <div className="space-y-4">
              {wines.map((item, i) => (
                <SelectionCard
                  key={item.name}
                  name={item.name}
                  region={item.region}
                  note={item.note}
                  year={item.year}
                  price={item.price}
                  featured={item.featured}
                  extra={item.grape}
                  delay={i * 0.1 + 0.2}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <p className="text-center text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-16">
          Alkol tüketimi sağlığa zararlıdır · 18 yaş altına alkol satışı yasaktır
        </p>
      </div>
    </section>
  );
}
