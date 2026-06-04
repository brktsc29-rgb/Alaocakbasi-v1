'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '14', label: 'Yıl', suffix: '+' },
  { value: '80', label: 'İmza Yemek', suffix: '' },
  { value: '120', label: 'Özel Masa', suffix: '' },
  { value: '5', label: 'Ödül', suffix: '' },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-eyebrow',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-eyebrow',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.story-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-heading',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.story-body p',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-body',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.story-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-stats',
            start: 'top 85%',
          },
        }
      );

      // Parallax on image
      if (imageRef.current) {
        gsap.to('.story-image-inner', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Image Column */}
        <div ref={imageRef} className="relative order-2 md:order-1 overflow-hidden">
          {/* Gold border frame */}
          <div
            className="absolute -top-4 -left-4 w-full h-full border border-luxury-gold/20 pointer-events-none z-10"
            style={{ transform: 'translate(8px, 8px)' }}
          />

          <div className="story-image-inner relative overflow-hidden aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
              alt="ALA Ocakbaşı — Atmosfer"
              fill
              className="object-cover scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-luxury-black/10 to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute bottom-8 right-8 glass p-6 z-20"
          >
            <p className="text-luxury-gold text-3xl font-instrument italic">
              2010
            </p>
            <p className="text-luxury-cream/50 text-[10px] tracking-[0.3em] uppercase mt-1 font-inter">
              Kuruluş
            </p>
          </motion.div>
        </div>

        {/* Text Column */}
        <div ref={textRef} className="order-1 md:order-2">
          <p className="story-eyebrow text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter opacity-0">
            Hikayemiz
          </p>

          <h2 className="story-heading font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream leading-none mb-8 opacity-0">
            Ateşin
            <br />
            <span className="italic text-luxury-gold">Ustası,</span>
            <br />
            Lezzetin
            <br />
            Mimarı
          </h2>

          <div className="w-16 h-px bg-luxury-gold/50 mb-8" />

          <div className="story-body space-y-5">
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">
              ALA Ocakbaşı, 2010 yılında İstanbul&apos;un kalbinde, Akdeniz mutfağının
              en saf halini sunma hayaliyle kapılarını açtı. Her yemekte bir hikaye,
              her ateşte bir sanat gizli.
            </p>
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">
              Kökleri Adana&apos;ya uzanan şef Mehmet Ali Öztürk, nesiller boyu aktarılan
              ocak geleneğini çağdaş fine dining anlayışıyla birleştirerek benzersiz
              bir deneyim yaratıyor. Seçilmiş malzemeler, mükemmel pişirme teknikleri
              ve sanatsal sunum; her akşam yeni bir şaheser doğuruyor.
            </p>
            <p className="text-luxury-cream/60 font-inter font-light leading-relaxed text-sm md:text-base opacity-0">
              Mekan; ham beton, koyu meşe ve altın vurguların bir senfonisi.
              Açık mutfak konseptiyle misafirler, şefin elinden çıkan her tabağı
              yakından takip edebilir.
            </p>
          </div>

          {/* Stats */}
          <div className="story-stats grid grid-cols-4 gap-4 mt-12 pt-12 border-t border-luxury-gold/15">
            {stats.map((stat) => (
              <div key={stat.label} className="story-stat opacity-0 text-center">
                <p className="font-instrument text-luxury-gold text-3xl md:text-4xl leading-none">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </p>
                <p className="text-luxury-cream/40 text-[9px] tracking-[0.2em] uppercase mt-2 font-inter">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
