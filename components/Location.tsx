'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);

  const info = [
    { icon: MapPin, label: t.loc_label_address, value: 'Şirinyalı Mah. 1539. Sk. No:4\nMuratpaşa, Antalya 07160', href: null },
    { icon: Phone,  label: t.loc_label_phone,   value: '+90 532 175 67 07', href: 'https://wa.me/905321756707' },
    { icon: Mail,   label: t.loc_label_email,   value: 'alaocakbasiantalya@gmail.com', href: 'mailto:alaocakbasiantalya@gmail.com' },
    { icon: Clock,  label: t.loc_label_hours,   value: t.loc_hours_value, href: null },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-left', { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-left', start: 'top 80%' } });
      gsap.fromTo('.loc-right', { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-right', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="location"
      className="relative bg-luxury-surface py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          {/* Left: Info */}
          <div className="loc-left opacity-0">
            <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
              {t.loc_eyebrow}
            </p>
            <h2 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-12">
              {t.loc_h1}
              <br />
              <span className="italic text-luxury-gold">{t.loc_h2}</span>
            </h2>

            <div className="space-y-8 mb-12">
              {info.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-luxury-gold/25 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-luxury-gold/70" />
                  </div>
                  <div>
                    <p className="text-luxury-gold/50 text-[9px] tracking-[0.3em] uppercase font-inter mb-1">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-luxury-cream/70 text-sm font-inter font-light leading-relaxed whitespace-pre-line hover:text-luxury-gold transition-colors duration-300">
                        {value}
                      </a>
                    ) : (
                      <p className="text-luxury-cream/70 text-sm font-inter font-light leading-relaxed whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-luxury-gold/10">
              <p className="text-luxury-cream/30 text-[9px] tracking-[0.3em] uppercase font-inter">{t.loc_follow}</p>
              <a href="https://www.instagram.com/alaocakbasi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/share/18iChwtzMT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/40 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="loc-right opacity-0 relative min-h-[400px]">
            <div className="relative w-full h-full min-h-[400px] overflow-hidden border border-luxury-gold/20">
              <iframe
                title="ALA Ocakbaşı Konum"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.375795612985!2d30.734382287468808!3d36.8574228006303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39bb91b3d4429%3A0x113a54451d3ad913!2zw4JMw4IgT2Nha2JhxZ_EsQ!5e0!3m2!1str!2str!4v1780605190016!5m2!1str!2str"
                width="100%" height="100%"
                style={{ minHeight: '400px', border: 'none' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.3) 0%, rgba(212,175,55,0.05) 100%)', mixBlendMode: 'multiply' }} />
            </div>
            <div className="absolute bottom-6 left-6 right-6 glass p-5 z-10">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-luxury-gold shrink-0" />
                <div>
                  <p className="text-luxury-cream/80 text-sm font-inter font-light">1539. Sk. No:4, Şirinyalı</p>
                  <p className="text-luxury-cream/40 text-[10px] tracking-widest uppercase font-inter mt-0.5">Muratpaşa · Antalya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
