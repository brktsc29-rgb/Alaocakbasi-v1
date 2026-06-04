'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const info = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Nişantaşı Mah. Abdi İpekçi Cad. No:42\nŞişli, İstanbul 34367',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+90 (212) 555 00 00',
  },
  {
    icon: Mail,
    label: 'E-posta',
    value: 'info@alaocakbasi.com',
  },
  {
    icon: Clock,
    label: 'Çalışma Saatleri',
    value: 'Pazartesi – Pazar\n19:00 – 00:00',
  },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.loc-left',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-left', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.loc-right',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-right', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          {/* Left: Info */}
          <div className="loc-left opacity-0">
            <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
              Bize Ulaşın
            </p>
            <h2 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-12">
              Bizi
              <br />
              <span className="italic text-luxury-gold">Bulun</span>
            </h2>

            <div className="space-y-8 mb-12">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-luxury-gold/25 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-luxury-gold/70" />
                  </div>
                  <div>
                    <p className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">
                      {label}
                    </p>
                    <p className="text-luxury-cream/70 text-sm font-inter font-light leading-relaxed whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-6 pt-8 border-t border-luxury-gold/10">
              <p className="text-luxury-cream/30 text-[9px] tracking-[0.3em] uppercase font-inter">
                Bizi Takip Edin
              </p>
              <a
                href="#"
                className="w-10 h-10 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="loc-right opacity-0 relative min-h-[400px]">
            {/* Map placeholder with golden styling */}
            <div className="relative w-full h-full min-h-[400px] overflow-hidden border border-luxury-gold/20">
              <iframe
                title="ALA Ocakbaşı Konum"
                src="https://www.openstreetmap.org/export/embed.html?bbox=28.97,41.04,29.00,41.06&layer=mapnik&marker=41.050,28.984"
                width="100%"
                height="100%"
                style={{
                  filter: 'grayscale(100%) invert(90%) sepia(20%) saturate(50%)',
                  minHeight: '400px',
                  border: 'none',
                }}
                loading="lazy"
              />
              {/* Gold overlay tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(10,10,10,0.3) 0%, rgba(212,175,55,0.05) 100%)',
                  mixBlendMode: 'multiply',
                }}
              />
            </div>

            {/* Floating info card */}
            <div className="absolute bottom-6 left-6 right-6 glass p-5 z-10">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-luxury-gold shrink-0" />
                <div>
                  <p className="text-luxury-cream/80 text-sm font-inter font-light">
                    Abdi İpekçi Cad. No:42, Nişantaşı
                  </p>
                  <p className="text-luxury-cream/40 text-[10px] tracking-widest uppercase font-inter mt-0.5">
                    Şişli · İstanbul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
