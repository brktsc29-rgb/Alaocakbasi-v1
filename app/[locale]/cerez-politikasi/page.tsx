import Link from 'next/link';

export default function CerezPolitikasiPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen bg-luxury-black text-luxury-cream">
      {/* Header */}
      <div className="border-b border-luxury-gold/10 py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/${params.locale}`} className="flex items-center gap-3">
            <span className="font-instrument italic text-luxury-gold text-2xl">ALA</span>
            <span className="w-px h-5 bg-luxury-gold/40" />
            <span className="font-instrument text-luxury-cream/80 text-sm tracking-[0.3em] uppercase">Ocakbaşı</span>
          </Link>
          <Link href={`/${params.locale}`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.2em] uppercase font-inter transition-colors duration-300">
            ← Geri Dön
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">Yasal Bildirim</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            Çerez <br />
            <span className="italic text-luxury-gold">Politikası</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">Son güncelleme: Haziran 2025</p>
        </div>

        <div className="space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">Çerez Nedir?</h2>
            <p>
              Çerezler, web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır.
              Oturum bilgilerini hatırlamak, tercihlerinizi saklamak ve site performansını
              ölçmek amacıyla kullanılırlar.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">Kullandığımız Çerezler</h2>
            <div className="space-y-6 mt-4">
              {[
                {
                  type: 'Zorunlu Çerezler',
                  desc: 'Sitenin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz.',
                  examples: 'Oturum yönetimi, güvenlik token\'ları',
                },
                {
                  type: 'Tercih Çerezleri',
                  desc: 'Dil seçimi ve kullanıcı tercihlerini hatırlar.',
                  examples: 'Dil tercihi (tr/en/de…), çerez onayı durumu',
                },
                {
                  type: 'Analiz Çerezleri',
                  desc: 'Ziyaretçi sayısı ve davranışı hakkında anonim bilgi toplar.',
                  examples: 'Sayfa görüntüleme, ziyaret süresi',
                },
              ].map((item) => (
                <div key={item.type} className="pl-4 border-l border-luxury-gold/20">
                  <p className="text-luxury-gold text-sm font-medium mb-1">{item.type}</p>
                  <p className="text-luxury-cream/60 text-sm mb-1">{item.desc}</p>
                  <p className="text-luxury-cream/30 text-xs">Örnek: {item.examples}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">Çerezleri Yönetmek</h2>
            <p>
              Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz.
              Ancak zorunlu çerezlerin engellenmesi, sitenin bazı özelliklerinin
              çalışmamasına yol açabilir.
            </p>
            <ul className="list-none space-y-2 mt-4 pl-0">
              {[
                'Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler',
                'Firefox: Tercihler → Gizlilik ve Güvenlik',
                'Safari: Tercihler → Gizlilik',
                'Edge: Ayarlar → Çerezler ve site izinleri',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">İletişim</h2>
            <p>
              Çerez politikamız hakkında sorularınız için:{' '}
              <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                alaocakbasiantalya@gmail.com
              </a>
            </p>
          </section>

        </div>

        <div className="mt-20 pt-10 border-t border-luxury-gold/10 flex flex-wrap gap-6">
          <Link href={`/${params.locale}/gizlilik`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            Gizlilik Politikası →
          </Link>
          <Link href={`/${params.locale}/kullanim-kosullari`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            Kullanım Koşulları →
          </Link>
          <Link href={`/${params.locale}`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            ← Ana Sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
