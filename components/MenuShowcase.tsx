'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type Category = 'baslangic' | 'ana' | 'tatli' | 'icecek';

const menuData: Record<
  Category,
  { name: string; description: string; price: string; special?: boolean }[]
> = {
  baslangic: [
    {
      name: 'Lakerda',
      description: 'Tuzlanmış torik balığı, lor peyniri, kapar, kırmızı soğan',
      price: '₺320',
      special: true,
    },
    {
      name: 'Midye Dolma',
      description: 'Özel baharatlı pilavlı taze midye, limon',
      price: '₺280',
    },
    {
      name: 'Hünkar Beğendi',
      description: 'Közlenmiş patlıcan püresi, kaşar, dana kavurma',
      price: '₺380',
      special: true,
    },
    {
      name: 'Sucuk Izgara',
      description: 'Ev yapımı sığır sucuğu, közlenmiş kapya biber',
      price: '₺240',
    },
    {
      name: 'Zeytinyağlı Yaprak Sarma',
      description: 'Asma yaprağı, basmati pilavı, fıstık, kuş üzümü',
      price: '₺220',
    },
    {
      name: 'Mezze Tabağı',
      description: 'Şefin günlük seçkisi, 6 çeşit soğuk meze',
      price: '₺480',
      special: true,
    },
  ],
  ana: [
    {
      name: 'Adana Ustabaşı',
      description: 'El kıyması dana, özel yağ, közlenmiş biber',
      price: '₺680',
      special: true,
    },
    {
      name: 'Kuzu Tandır',
      description: '18 saat marine, yavaş pişmiş kuzu but, yaban otları sosu',
      price: '₺920',
      special: true,
    },
    {
      name: 'Beyti Sarma',
      description: 'Dana kıyma, sarımsaklı yoğurt, tereyağlı domates sosu',
      price: '₺580',
    },
    {
      name: 'Levrek Buğulama',
      description: 'Taze levrek, zeytinyağı, kapari, zeytin, cherry domates',
      price: '₺760',
    },
    {
      name: 'İskender Ustabaşı',
      description: 'Dana döner, tereyağı, domates sosu, yoğurt',
      price: '₺620',
    },
    {
      name: 'Bonfile',
      description: '250g AA grade dana bonfile, truffle tereyağı, sezonal garnitür',
      price: '₺1.200',
      special: true,
    },
  ],
  tatli: [
    {
      name: 'Künefe',
      description: 'Taze tel kadayıf, eriyen beyaz peynir, gül şerbeti',
      price: '₺280',
      special: true,
    },
    {
      name: 'Baklava Tabağı',
      description: 'Özel Antep fıstıklı baklava, 4 çeşit',
      price: '₺320',
    },
    {
      name: 'Sütlaç',
      description: 'Fırında pişmiş sütlaç, safran, dövülmüş Antep fıstığı',
      price: '₺240',
    },
    {
      name: 'Şekerpare',
      description: 'İnce un şekerpare, irmik, kaymak',
      price: '₺220',
    },
    {
      name: 'Dondurmalı Kadayıf',
      description: 'Altın kadayıf, mastic dondurma, bal, çam fıstığı',
      price: '₺300',
      special: true,
    },
  ],
  icecek: [
    { name: 'Tekirdağ Gold', description: 'Tekirdağ Altın Seri Rakı, 35cl', price: '₺380' },
    { name: 'Yeni Rakı', description: 'Klasik Yeni Rakı, 35cl', price: '₺280' },
    {
      name: 'Kavaklidere Cuvée',
      description: 'Türkiye\'nin en prestijli şarabı, 2019',
      price: '₺480',
      special: true,
    },
    {
      name: 'Vinkara Kalecik Karası',
      description: 'Zarif kırmızı şarap, meşe aroması, 2020',
      price: '₺420',
    },
    { name: 'Özel Kokteyller', description: 'Şefin özel likör ve baharat seçkisi', price: '₺220' },
    { name: 'Türk Çayı Servisi', description: 'Demlik çay, Rize usulü', price: '₺80' },
  ],
};

const tabs: { id: Category; label: string }[] = [
  { id: 'baslangic', label: 'Başlangıç' },
  { id: 'ana', label: 'Ana Yemek' },
  { id: 'tatli', label: 'Tatlı' },
  { id: 'icecek', label: 'İçecek' },
];

export default function MenuShowcase() {
  const [active, setActive] = useState<Category>('baslangic');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-header', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative bg-luxury-black py-32 md:py-40 overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.06) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="menu-header text-center mb-16 opacity-0">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-inter">
            Menü
          </p>
          <h2 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-luxury-cream">
            Her Tabak
            <br />
            <span className="italic text-luxury-gold">Bir Hikaye</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto mt-8" />
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-0 mb-16 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-3 text-xs tracking-[0.2em] uppercase font-inter transition-all duration-300 border-b whitespace-nowrap
                ${
                  active === tab.id
                    ? 'text-luxury-gold border-luxury-gold'
                    : 'text-luxury-cream/40 border-luxury-cream/10 hover:text-luxury-cream/70'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-0"
          >
            {menuData[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-baseline justify-between gap-4 py-5 border-b border-luxury-cream/5 group hover:bg-luxury-gold/[0.03] transition-colors duration-300 px-2 -mx-2"
              >
                <div className="flex items-baseline gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 shrink-0">
                    {item.special && (
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0" />
                    )}
                    <h4 className="font-instrument text-luxury-cream group-hover:text-luxury-gold transition-colors duration-300 text-xl">
                      {item.name}
                    </h4>
                  </div>
                  {/* Dot line */}
                  <div className="flex-1 border-b border-dotted border-luxury-cream/10 mb-1" />
                </div>
                <div className="flex items-baseline gap-6 shrink-0">
                  <p className="text-luxury-cream/30 text-xs font-inter hidden md:block max-w-[260px] text-right">
                    {item.description}
                  </p>
                  <span className="font-instrument text-luxury-gold text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <p className="text-center text-luxury-cream/20 text-[10px] tracking-widest uppercase font-inter mt-16">
          Fiyatlara KDV dahildir · Sezonluk ürün bulunabilirliği değişebilir
        </p>
      </div>
    </section>
  );
}
