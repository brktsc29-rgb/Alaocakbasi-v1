'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '14', label: t.stat_years, suffix: '+' },
    { value: '80', label: t.stat_dishes, suffix: '' },
    { value: '120', label: t.stat_tables, suffix: '' },
    { value: '5', label: t.stat_awards, suffix: '' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-eyebrow', { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-eyebrow', start: 'top 85%' } });
      gsap.fromTo('.story-heading', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-heading', start: 'top 85%' } });
      gsap.fromTo('.story-body p', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-body', start: 'top 80%' } });
      gsap.fromTo('.story-stat', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-stats', start: 'top 85%' } });
      if (imageRef.current) {
        gsap.to('.story-image-inner', { yPercent: -12, ease: 'none',
          scrollTrigger: { trigger: imageRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative order-2 md:order-1 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-full h-full border border-luxury-gold/20 pointer-events-none z-10"
            style={{ transform: 'translate(8px,8px)' }} />
          <div className="story-image-inner relative overflow-hidden aspect-[3/4]">
            <Image src="/story-bg.jpg"
              alt="ÂLÂ Ocakbaşı" fill className="object-cover scale-110" sizes="(max-width:768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-luxury-black/10 to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}
            className="absolute bottom-8 right-8 glass p-6 z-20">
            <p className="text-luxury-gold text-3xl font-instrument italic">2010</p>
            <p className="text-luxury-cream/50 text-[10px] tracking-[0.3em] uppercase mt-1 font-inter">{t.story_founded}</p>
          </motion.div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <p className="story-eyebrow text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter opacity-0">
            {t.story_eyebrow}
          </p>
          <h2 className="story-heading font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream leading-none mb-8 opacity-0">
            {t.story_h1}<br />
            <span className="italic text-luxury-gold">{t.story_h2}</span><br />
            {t.story_h3}<br />
            {t.story_h4}
          </h2>
          <div className="w-16 h-px bg-luxury-gold/50 mb-8" />
          <div className="story-body space-y-5">
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">{t.story_body1}</p>
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">{t.story_body2}</p>
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">{t.story_body3}</p>
          </div>
          <div className="story-stats grid grid-cols-4 gap-4 mt-12 pt-12 border-t border-luxury-gold/15">
            {stats.map((stat) => (
              <div key={stat.label} className="story-stat opacity-0 text-center">
                <p className="font-instrument text-luxury-gold text-3xl md:text-4xl leading-none">
                  {stat.value}<span className="text-2xl">{stat.suffix}</span>
                </p>
                <p className="text-luxury-cream/40 text-[9px] tracking-[0.2em] uppercase mt-2 font-inter">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
