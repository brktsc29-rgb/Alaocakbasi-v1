'use client';

import { Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/contexts/I18nContext';
import { useParams } from 'next/navigation';

const handleScroll = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const t = useT();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'tr';

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
              <span className="font-instrument italic text-luxury-gold text-3xl tracking-wider">ÂLÂ</span>
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
              <a href="https://wa.me/905321756707" target="_blank" rel="noopener noreferrer"
                className="text-luxury-cream/40 text-xs font-inter font-light hover:text-luxury-gold transition-colors duration-300 block">
                +90 532 175 67 07
              </a>
              <a href="mailto:alaocakbasiantalya@gmail.com"
                className="text-luxury-cream/40 text-xs font-inter font-light hover:text-luxury-gold transition-colors duration-300 block">
                alaocakbasiantalya@gmail.com
              </a>
              <p className="text-luxury-cream/40 text-xs font-inter font-light leading-relaxed">
                1539. Sk. No:4, Şirinyalı<br />
                Muratpaşa, Antalya 07160
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/alaocakbasi' },
                { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/share/18iChwtzMT/?mibextid=wwXIfr' },
                { Icon: Twitter,   label: 'Twitter',   href: '#' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
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
            © {new Date().getFullYear()} ÂLÂ Ocakbaşı · {t.footer_copy}
          </p>
          <p className="text-luxury-cream/15 text-[10px] tracking-wider uppercase font-inter">
            {t.footer_finedining}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/gizlilik`}
              className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter hover:text-luxury-cream/50 transition-colors duration-300">
              {t.footer_privacy}
            </Link>
            <Link href={`/${locale}/kullanim-kosullari`}
              className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter hover:text-luxury-cream/50 transition-colors duration-300">
              {t.footer_terms}
            </Link>
            <Link href={`/${locale}/cerez-politikasi`}
              className="text-luxury-cream/20 text-[10px] tracking-wider uppercase font-inter hover:text-luxury-cream/50 transition-colors duration-300">
              Çerez Politikası
            </Link>
          </div>
        </div>

        {/* Developer contact */}
        <div className="flex justify-center mt-8 pt-6 border-t border-luxury-cream/5">
          <a
            href="https://wa.me/905380590173?text=Merhaba%2C%20web%20sitesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-luxury-cream/15 hover:text-luxury-cream/40 transition-colors duration-300"
          >
            <span className="text-[9px] tracking-[0.3em] uppercase font-inter">Bu siteyi siz de yaptırın</span>
            <span className="w-px h-3 bg-luxury-cream/15 group-hover:bg-luxury-cream/30 transition-colors duration-300" />
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
