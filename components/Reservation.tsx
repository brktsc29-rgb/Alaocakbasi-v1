'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import { useT } from '@/contexts/I18nContext';

gsap.registerPlugin(ScrollTrigger);

const timeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

export default function Reservation() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', party: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.res-header', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.res-header', start: 'top 80%' } });
      gsap.fromTo('.res-form', { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.res-form', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const contactInfo = [
    { label: t.res_label_phone, value: '+90 (242) 555 00 00' },
    { label: t.res_label_email, value: 'rezervasyon@alaocakbasi.com' },
    { label: t.res_label_hours, value: t.res_hours_value },
  ];

  return (
    <section ref={sectionRef} id="reservation"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="res-header text-center mb-16 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            {t.res_eyebrow}
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            {t.res_h1}
            <br />
            <span className="italic text-luxury-gold">{t.res_h2}</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
          <p className="text-luxury-cream/40 font-inter font-light text-sm mt-6 max-w-lg mx-auto leading-relaxed">
            {t.res_desc}
          </p>
        </div>

        <motion.div className="res-form opacity-0 glass p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-luxury-gold/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-luxury-gold/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-luxury-gold/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-luxury-gold/40" />

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 border border-luxury-gold/40 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-luxury-gold text-2xl">✓</span>
              </div>
              <h3 className="font-instrument text-luxury-cream text-3xl italic mb-4">{t.res_success_h}</h3>
              <p className="text-luxury-cream/50 font-inter font-light text-sm leading-relaxed max-w-sm mx-auto">
                {t.res_success_msg}{' '}
                <strong className="text-luxury-gold">{form.email}</strong>
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder={t.res_name} required className="luxury-input" />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder={t.res_email} required className="luxury-input" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder={t.res_phone} required className="luxury-input" />
                <select name="party" value={form.party} onChange={handleChange} required
                  className="luxury-input" style={{ cursor: 'none' }}
                >
                  <option value="" disabled>{t.res_party}</option>
                  {t.res_party_sizes.map((s) => (
                    <option key={s} value={s} className="bg-luxury-surface text-luxury-cream">{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <input type="date" name="date" value={form.date} onChange={handleChange}
                  required className="luxury-input" style={{ colorScheme: 'dark' }} />
                <select name="time" value={form.time} onChange={handleChange} required
                  className="luxury-input" style={{ cursor: 'none' }}
                >
                  <option value="" disabled>{t.res_time}</option>
                  {timeSlots.map((s) => (
                    <option key={s} value={s} className="bg-luxury-surface text-luxury-cream">{s}</option>
                  ))}
                </select>
              </div>

              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder={t.res_notes} rows={3} className="luxury-input resize-none" />

              <div className="text-center pt-4">
                <MagneticButton variant="gold" className="min-w-[240px] py-5">
                  {t.res_submit}
                </MagneticButton>
                <p className="text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-6">
                  {t.res_privacy}
                </p>
              </div>
            </form>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          {contactInfo.map((item) => (
            <div key={item.label} className="p-6 border border-luxury-cream/5">
              <p className="text-luxury-gold/60 text-[9px] tracking-[0.4em] uppercase font-inter mb-3">{item.label}</p>
              <p className="text-luxury-cream/60 text-sm font-inter font-light">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
