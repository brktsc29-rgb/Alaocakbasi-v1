'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const timeSlots = [
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
];

const partySizes = ['2 Kişi', '3 Kişi', '4 Kişi', '5-6 Kişi', '7-8 Kişi', '8+ Kişi (Özel)'];

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    party: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.res-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.res-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.res-form',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.res-form', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="reservation"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="res-header text-center mb-16 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            Rezervasyon
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            Masanızı
            <br />
            <span className="italic text-luxury-gold">Ayırtın</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
          <p className="text-luxury-cream/40 font-inter font-light text-sm mt-6 max-w-lg mx-auto leading-relaxed">
            Size özel bir deneyim hazırlamak için sabırsızlanıyoruz. Rezervasyonunuz için
            en geç 24 saat öncesinden onay mesajı alacaksınız.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          className="res-form opacity-0 glass p-8 md:p-12 relative"
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-luxury-gold/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-luxury-gold/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-luxury-gold/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-luxury-gold/40" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 border border-luxury-gold/40 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-luxury-gold text-2xl">✓</span>
              </div>
              <h3 className="font-instrument text-luxury-cream text-3xl italic mb-4">
                Teşekkürler
              </h3>
              <p className="text-luxury-cream/50 font-inter font-light text-sm leading-relaxed max-w-sm mx-auto">
                Rezervasyon talebiniz alındı. 24 saat içinde{' '}
                <strong className="text-luxury-gold">{form.email}</strong> adresinize
                onay mesajı göndereceğiz.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Row 1: Name & Email */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    required
                    className="luxury-input"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="E-posta Adresiniz"
                    required
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Party */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Telefon Numaranız"
                    required
                    className="luxury-input"
                  />
                </div>
                <div>
                  <select
                    name="party"
                    value={form.party}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    style={{ cursor: 'none' }}
                  >
                    <option value="" disabled>
                      KİŞİ SAYISI
                    </option>
                    {partySizes.map((s) => (
                      <option key={s} value={s} className="bg-luxury-surface text-luxury-cream">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Date & Time */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    style={{
                      colorScheme: 'dark',
                    }}
                  />
                </div>
                <div>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    style={{ cursor: 'none' }}
                  >
                    <option value="" disabled>
                      SAAT SEÇİN
                    </option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-luxury-surface text-luxury-cream">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special requests */}
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="ÖZEL İSTEKLER, ALERJİLER VEYA NOTLAR"
                  rows={3}
                  className="luxury-input resize-none"
                />
              </div>

              {/* Submit */}
              <div className="text-center pt-4">
                <MagneticButton variant="gold" className="min-w-[240px] py-5">
                  Rezervasyon Talebi Gönder
                </MagneticButton>
                <p className="text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-6">
                  Bilgileriniz güvende · Spam göndermiyoruz
                </p>
              </div>
            </form>
          )}
        </motion.div>

        {/* Contact alternatives */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          {[
            { label: 'Telefon', value: '+90 (212) 555 00 00' },
            { label: 'E-posta', value: 'rezervasyon@alaocakbasi.com' },
            { label: 'Çalışma Saatleri', value: 'Pzt–Paz · 19:00 – 00:00' },
          ].map((item) => (
            <div key={item.label} className="p-6 border border-luxury-cream/5">
              <p className="text-luxury-gold/60 text-[9px] tracking-[0.4em] uppercase font-inter mb-3">
                {item.label}
              </p>
              <p className="text-luxury-cream/60 text-sm font-inter font-light">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
