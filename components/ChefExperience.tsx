'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { year: '2023', title: 'En İyi Fine Dining', org: 'Istanbul Gastronomy Awards' },
  { year: '2022', title: 'Ocakbaşı Ustası', org: 'Turkish Culinary Federation' },
  { year: '2021', title: 'Yılın Şefi', org: 'Yemek & Kültür Magazine' },
  { year: '2019', title: 'Mükemmel Deneyim', org: 'Condé Nast Traveller' },
];

export default function ChefExperience() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.chef-image', { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.chef-image', start: 'top 80%' } });
      gsap.fromTo('.chef-text-block', { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.chef-text-block', start: 'top 80%' } });
      gsap.fromTo('.award-item', { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.awards-list', start: 'top 85%' } });
      gsap.to('.chef-image-inner', { yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.chef-image', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="chef"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Image */}
          <div className="chef-image opacity-0 relative">
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-luxury-gold/20 pointer-events-none z-10"
              style={{ transform: 'translate(-8px, -8px)' }} />
            <div className="chef-image-inner relative overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop"
                alt="Şef Mehmet Ali Öztürk" fill
                className="object-cover scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/20 via-transparent to-luxury-black/40" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}
              className="absolute top-8 -right-8 glass p-6 max-w-[200px] hidden md:block z-20"
            >
              <p className="font-instrument italic text-luxury-cream/80 text-sm leading-relaxed">
                {t.chef_quote}
              </p>
            </motion.div>
          </div>

          {/* Text */}
          <div className="chef-text-block opacity-0">
            <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
              {t.chef_eyebrow}
            </p>
            <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream leading-none mb-4">
              Mehmet Ali
              <br />
              <span className="italic text-luxury-gold">Öztürk</span>
            </h2>
            <p className="text-luxury-cream/40 text-sm tracking-[0.2em] uppercase font-inter mb-8">
              {t.chef_role}
            </p>
            <div className="w-12 h-px bg-luxury-gold/40 mb-8" />
            <div className="space-y-4 mb-12">
              <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm">{t.chef_bio1}</p>
              <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm">{t.chef_bio2}</p>
            </div>

            <div className="awards-list space-y-4">
              <p className="text-luxury-gold/60 text-[9px] tracking-[0.4em] uppercase font-inter mb-6">
                {t.chef_awards_label}
              </p>
              {awards.map((award) => (
                <div key={award.year + award.title}
                  className="award-item opacity-0 flex items-start gap-6 pb-4 border-b border-luxury-gold/10"
                >
                  <span className="text-luxury-gold/40 font-instrument text-lg w-12 shrink-0">{award.year}</span>
                  <div>
                    <p className="text-luxury-cream/80 text-sm font-inter">{award.title}</p>
                    <p className="text-luxury-cream/30 text-[10px] tracking-wider uppercase font-inter mt-0.5">{award.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
