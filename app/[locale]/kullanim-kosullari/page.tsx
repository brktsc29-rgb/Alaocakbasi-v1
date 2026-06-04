import Link from 'next/link';

export default function KullanimKosullariPage({ params }: { params: { locale: string } }) {
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
        {/* Title */}
        <div className="mb-16">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">Yasal Bildirim</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            Kullanım <br />
            <span className="italic text-luxury-gold">Koşulları</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">Son güncelleme: Haziran 2025</p>
        </div>

        <div className="space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">1. Kabul</h2>
            <p>
              Bu web sitesini (<strong className="text-luxury-cream font-normal">alaocakbasi.com</strong>) ziyaret etmeniz,
              aşağıdaki kullanım koşullarını okuduğunuzu ve kabul ettiğinizi göstermektedir.
              Koşulları kabul etmiyorsanız lütfen siteyi kullanmayınız.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">2. Hizmet Tanımı</h2>
            <p>
              ALA Ocakbaşı web sitesi; restoran tanıtımı, menü bilgisi, galeri ve rezervasyon talebi
              iletimi amacıyla hizmet vermektedir. Rezervasyon formunun doldurulması,
              kesin rezervasyon anlamına gelmemekte; işletme tarafından onaylanması gerekmektedir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">3. Fikri Mülkiyet</h2>
            <p>
              Web sitesindeki tüm içerik, tasarım, logo, metin ve görseller ALA Ocakbaşı'na aittir.
              İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">4. Sorumluluk Sınırlaması</h2>
            <p>
              Web sitesindeki bilgiler "olduğu gibi" sunulmaktadır. Menü içerikleri ve fiyatlar
              önceden haber verilmeksizin değiştirilebilir. ALA Ocakbaşı; teknik kesintilerden,
              veri kayıplarından veya yanlış bilgilerden doğan zararlar için sorumluluk kabul etmemektedir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">5. Dış Bağlantılar</h2>
            <p>
              Web sitemiz üçüncü taraf platformlara (Instagram, Facebook, Google Haritalar vb.)
              bağlantılar içerebilir. Bu platformların içerik ve gizlilik politikalarından
              ALA Ocakbaşı sorumlu değildir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">6. Rezervasyon Koşulları</h2>
            <ul className="list-none space-y-2 pl-0">
              {[
                'Rezervasyon talepleri e-posta yoluyla onaylanır.',
                'Onaylanmamış talepler geçerli rezervasyon sayılmaz.',
                'İptal bildiriminin en az 2 saat öncesinden yapılması beklenmektedir.',
                'Grup rezervasyonları (8+ kişi) için önceden iletişime geçilmesi gerekmektedir.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">7. Kişisel Verilerin Korunması</h2>
            <p>
              Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için{' '}
              <Link href={`/${params.locale}/gizlilik`} className="text-luxury-gold hover:underline">
                Gizlilik ve KVKK Politikamızı
              </Link>{' '}
              inceleyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">8. Uygulanacak Hukuk</h2>
            <p>
              Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda
              <strong className="text-luxury-cream font-normal"> Antalya </strong>
              mahkemeleri ve icra daireleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">9. Değişiklikler</h2>
            <p>
              ALA Ocakbaşı, bu koşulları önceden haber vermeksizin güncelleme hakkını saklı tutar.
              Güncel koşullar her zaman bu sayfada yayımlanacaktır.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">10. İletişim</h2>
            <p>
              Sorularınız için:{' '}
              <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                alaocakbasiantalya@gmail.com
              </a>
              {' '}veya{' '}
              <a href="https://wa.me/905321756707" target="_blank" rel="noopener noreferrer" className="text-luxury-gold">
                +90 532 175 67 07
              </a>
            </p>
          </section>

        </div>

        {/* Back */}
        <div className="mt-20 pt-10 border-t border-luxury-gold/10">
          <Link href={`/${params.locale}`}
            className="inline-flex items-center gap-3 text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
