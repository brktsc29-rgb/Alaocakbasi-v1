'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    id: 1,
    name: 'Adana Ustabaşı',
    subtitle: 'İmza Kebap',
    description:
      'El kıyması dana eti, özel baharatlı yağ, közlenmiş biber ve taze otlarla hazırlanan şef imzalı kebap.',
    price: '₺680',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    tag: 'Şef Seçkisi',
  },
  {
    id: 2,
    name: 'Kuzu Tandır',
    subtitle: 'Özel Hazırlık',
    description:
      '18 saat marine edilmiş kuzu but, yaban otları ve kırmızı şarap sosuyla yavaş pişirilmiş tandır.',
    price: '₺920',
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
    tag: 'Saatlerce Hazırlık',
  },
  {
    id: 3,
    name: 'Hünkar Beğendi',
    subtitle: 'Osmanlı Mirası',
    description:
      'Közlenmiş patlıcan püresi, kaşar peyniri ve üzerinde dana kavurmasıyla sunulan Osmanlı klasiği.',
    price: '₺480',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
    tag: 'Geleneksel',
  },
  {
    id: 4,
    name: 'Levrek Buğulama',
    subtitle: 'Akdeniz Lezzeti',
    description:
      'Ege sularından taze levrek, zeytinyağı, kapari, zeytin ve cherry domatesiyle buğulamada.',
    price: '₺760',
    image:
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=800&auto=format&fit=crop',
    tag: 'Günlük Taze',
  },
];

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dishes-eyebrow',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.dishes-eyebrow', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.dishes-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dishes-heading', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.dish-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dishes-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dishes"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      {/* Background decorations */}
      <div
        className="absolute top-20 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="dishes-eyebrow text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter opacity-0">
            İmza Yemekler
          </p>
          <h2 className="dishes-heading font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream opacity-0">
            Ocağın En Özel
            <br />
            <span className="italic text-luxury-gold">Lezzetleri</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
        </div>

        {/* Dishes Grid */}
        <div className="dishes-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              className="dish-card opacity-0 relative overflow-hidden bg-luxury-black group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="dish-card-overlay absolute inset-0" />

                {/* Tag */}
                <div className="absolute top-4 left-4 glass px-3 py-1">
                  <span className="text-luxury-gold text-[9px] tracking-[0.3em] uppercase font-inter">
                    {dish.tag}
                  </span>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/40 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-luxury-gold/60 text-[10px] tracking-[0.3em] uppercase font-inter mb-2">
                  {dish.subtitle}
                </p>
                <h3 className="font-instrument text-luxury-cream text-2xl leading-tight mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-luxury-cream/40 text-xs font-inter font-light leading-relaxed line-clamp-3">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-luxury-gold/10">
                  <span className="font-instrument text-luxury-gold text-xl">
                    {dish.price}
                  </span>
                  <span className="text-luxury-cream/30 text-[9px] tracking-[0.2em] uppercase font-inter group-hover:text-luxury-gold/50 transition-colors duration-300">
                    Detaylar →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300 group"
          >
            <span className="w-12 h-px bg-current transition-all duration-300 group-hover:w-20" />
            Tüm Menüyü Gör
            <span className="w-12 h-px bg-current transition-all duration-300 group-hover:w-20" />
          </a>
        </div>
      </div>
    </section>
  );
}
