'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './ui/MagneticButton';

interface EmberParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
  opacity: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#D4AF37', '#E8C94A', '#FFB347', '#FF8C00', '#FFA500', '#FFD700'];
    const particles: EmberParticle[] = [];

    const createParticle = (): EmberParticle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: -(Math.random() * 1.8 + 0.6),
      life: 0,
      maxLife: Math.random() * 120 + 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0,
    });

    for (let i = 0; i < 100; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      p.y = canvas.height - Math.random() * canvas.height;
      particles.push(p);
    }

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX + Math.sin(p.life * 0.05) * 0.3;
        p.y += p.speedY;
        const progress = p.life / p.maxLife;
        p.opacity = Math.sin(progress * Math.PI) * 0.8;
        const size = p.size * (1 - progress * 0.7);

        if (p.life >= p.maxLife) {
          Object.assign(p, createParticle());
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 20, letterSpacing: '0.2em' },
        { opacity: 1, y: 0, letterSpacing: '0.4em', duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-title-ala',
          { opacity: 0, y: 80, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: 'power4.out' },
          '-=0.6'
        )
        .fromTo(
          '.hero-title-ocak',
          { opacity: 0, y: 80, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: 'power4.out' },
          '-=1.0'
        )
        .fromTo(
          '.hero-line',
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 1, ease: 'power2.inOut' },
          '-=0.6'
        )
        .fromTo(
          '.hero-tagline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-luxury-black" />

      {/* Warm fire glow from below */}
      <div className="absolute inset-0 fire-ambient" />

      {/* Secondary ambient layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(150, 80, 10, 0.15) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 80% 85%, rgba(130, 70, 8, 0.12) 0%, transparent 55%)',
        }}
      />

      {/* Ember particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-transparent to-luxury-black/90 pointer-events-none" />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
        {/* Eyebrow */}
        <p className="hero-eyebrow opacity-0 text-luxury-gold text-[10px] tracking-[0.4em] uppercase mb-10 font-inter font-light">
          Est. 2010 · Istanbul · Türkiye
        </p>

        {/* Main Title */}
        <h1 className="overflow-hidden">
          <span
            className="hero-title-ala opacity-0 block font-instrument italic text-luxury-cream"
            style={{
              fontSize: 'clamp(6rem, 20vw, 22rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
            }}
          >
            ALA
          </span>
          <span
            className="hero-title-ocak opacity-0 block font-instrument text-luxury-cream"
            style={{
              fontSize: 'clamp(2.5rem, 8.5vw, 9rem)',
              lineHeight: 1,
              letterSpacing: '0.15em',
            }}
          >
            OCAKBAŞI
          </span>
        </h1>

        {/* Gold Divider */}
        <div className="hero-line w-40 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent my-8 opacity-0" />

        {/* Tagline */}
        <p className="hero-tagline opacity-0 font-instrument italic text-luxury-cream/60 text-lg md:text-xl max-w-xl leading-relaxed">
          Akdeniz&apos;in Kalbinde Ateşin ve Lezzetin Buluştuğu Yer
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <div className="hero-cta opacity-0">
            <MagneticButton
              variant="gold"
              href="#reservation"
              onClick={() =>
                document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="min-w-[200px]"
            >
              Rezervasyon
            </MagneticButton>
          </div>
          <div className="hero-cta opacity-0">
            <MagneticButton
              variant="outline"
              href="#menu"
              onClick={() =>
                document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="min-w-[200px]"
            >
              Menüyü Keşfet
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hero-scroll opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group"
        onClick={handleScrollDown}
        aria-label="Aşağı kaydır"
      >
        <span className="text-luxury-gold/40 text-[9px] tracking-[0.4em] uppercase font-inter group-hover:text-luxury-gold/70 transition-colors duration-300">
          Keşfet
        </span>
        <div className="relative w-px h-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/0 via-luxury-gold/60 to-luxury-gold/0 animate-scroll-line" />
        </div>
      </button>

      {/* Corner decorations */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <p className="text-luxury-cream/20 text-[9px] tracking-[0.3em] uppercase font-inter rotate-90 origin-bottom-left translate-y-[-100%]">
          Fine Dining Experience
        </p>
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block">
        <p className="text-luxury-cream/20 text-[9px] tracking-[0.3em] uppercase font-inter -rotate-90 origin-bottom-right translate-y-[-100%]">
          Açık Ateş · Open Fire
        </p>
      </div>
    </section>
  );
}
