import Link from 'next/link';

export default function GizlilikPage({ params }: { params: { locale: string } }) {
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
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">KVKK · Madde 10</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            Gizlilik &amp; <br />
            <span className="italic text-luxury-gold">KVKK Politikası</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">Son güncelleme: Haziran 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verileriniz,
              <strong className="text-luxury-cream font-normal"> ALA Ocakbaşı </strong>
              (Şirinyalı Mah. 1539. Sk. No:4, 07160 Muratpaşa/Antalya) tarafından işlenmektedir.
              İletişim: <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">alaocakbasiantalya@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">2. Toplanan Kişisel Veriler</h2>
            <p>Aşağıdaki kişisel verileriniz işlenmektedir:</p>
            <ul className="list-none space-y-2 mt-4 pl-0">
              {[
                'Ad ve soyad',
                'E-posta adresi',
                'Telefon numarası',
                'Rezervasyon tarihi, saati ve kişi sayısı',
                'Özel istek ve notlar',
                'Web sitesi ziyaret verileri (çerezler aracılığıyla)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">3. Kişisel Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-none space-y-2 mt-4 pl-0">
              {[
                'Rezervasyon talebinin alınması ve onaylanması',
                'Müşteri ile iletişim kurulması',
                'Hizmet kalitesinin iyileştirilmesi',
                'Yasal yükümlülüklerin yerine getirilmesi',
                'Web sitesi güvenliği ve performans analizi',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">4. Hukuki Dayanak</h2>
            <p>
              Kişisel verileriniz; KVKK'nın 5. maddesi uyarınca <em>sözleşmenin kurulması ve ifası</em>,{' '}
              <em>meşru menfaat</em> ve <em>açık rıza</em> hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">5. Verilerin Aktarımı</h2>
            <p>
              Kişisel verileriniz; yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır.
              Rezervasyon e-postaları yalnızca restoran yönetimine iletilir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">6. Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, işlenme amacının sona ermesinin ardından KVKK ve ilgili mevzuatta
              öngörülen süre boyunca saklanır; aksi hâlde <strong className="text-luxury-cream font-normal">2 yıl</strong> içinde silinir veya anonim hâle getirilir.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">7. KVKK Kapsamındaki Haklarınız</h2>
            <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-none space-y-2 mt-4 pl-0">
              {[
                'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                'İşlenmişse buna ilişkin bilgi talep etme',
                'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
                'Yurt içi veya yurt dışında aktarıldığı üçüncü kişileri öğrenme',
                'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
                'KVKK madde 7 uyarınca silinmesini veya yok edilmesini isteme',
                'Düzeltme/silme işlemlerinin üçüncü kişilere bildirilmesini isteme',
                'Analiz edilmesi suretiyle aleyhine sonuç çıkmasına itiraz etme',
                'Zararın giderilmesini talep etme',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Haklarınızı kullanmak için{' '}
              <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                alaocakbasiantalya@gmail.com
              </a>{' '}
              adresine yazılı başvuruda bulunabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">8. Çerezler</h2>
            <p>
              Web sitemiz, teknik çerezler ve analiz çerezleri kullanmaktadır. Ayrıntılı bilgi için{' '}
              <Link href={`/${params.locale}/cerez-politikasi`} className="text-luxury-gold hover:underline">
                Çerez Politikamızı
              </Link>{' '}
              inceleyebilirsiniz.
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
