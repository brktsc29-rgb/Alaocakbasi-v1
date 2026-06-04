'use client';

import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useT } from '@/contexts/I18nContext';

const handleScroll = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const t = useT();

  const footerLinks = [
    { label: t.nav_story,       href: '#story' },
    { label: t.nav_menu,        href: '#menu' },
    { label: t.nav_chef,        href: '#chef' },
    { label: t.nav_gallery,     href: '#gallery' },
    { label: t.nav_reservation, href: '#reservation' },
    { label: t.nav_contact,     href: '#location' },
  ];

  return (
    <footer className="bg-luxury-black border-t border-luxury-gold/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-instrument italic text-luxury-gold text-3xl tracking-wider">ALA</span>
              <span className="w-px h-6 bg-luxury-gold/30" />
              <span className="font-instrument text-luxury-cream/70 text-sm tracking-[0.3em] uppercase">Ocakbaşı</span>
            </div>
            <p className="text-luxury-cream/30 font-inter font-light text-xs leading-relaxed max-w-[240px]">
              {t.footer_tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-luxury-gold/50 text-[9px] tracking-[0.4em] uppercase font-inter mb-6">
              {t.footer_pages}
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button onClick={() => handleScroll(link.href)}
                    className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.1em] uppercase font-inter transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-luxury-gold/50 text-[9px] tracking-[0.4em] uppercase font-inter mb-6">
              {t.footer_contact}
            </p>
            <div className="space-y-3">
              <p className="text-luxury-cream/40 text-xs font-inter font-light">+90 (242) 555 00 00</p>
              <p className="text-luxury-cream/40 text-xs font-inter font-light">info@alaocakbasi.com</p>
              <p className="text-luxury-cream/40 text-xs font-inter font-light leading-relaxed">
                1539. Sk. No:4, Şirinyalı<br />
                Muratpaşa, Antalya 07160
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }, { Icon: Twitter, label: 'Twitter' }].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 border border-luxury-cream/10 flex items-center justify-center text-luxury-cream/30 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter">
            © {new Date().getFullYear()} ALA Ocakbaşı · {t.footer_copy}
          </p>
          <p className="text-luxury-cream/15 text-[10px] tracking-wider uppercase font-inter">
            {t.footer_finedining}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter hover:text-luxury-cream/50 transition-colors duration-300">
              {t.footer_privacy}
            </a>
            <a href="#" className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter hover:text-luxury-cream/50 transition-colors duration-300">
              {t.footer_terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
