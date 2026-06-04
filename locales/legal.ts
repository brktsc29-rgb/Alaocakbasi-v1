export interface LegalContent {
  // Shared page UI
  back: string;
  lastUpdated: string;
  legalNotice: string;
  backHome: string;

  // Cookie consent banner
  cookieBannerText: string;
  cookiePrivacyLabel: string;
  cookiePolicyLabel: string;
  cookieAccept: string;
  cookieDecline: string;

  // Gizlilik / Privacy
  privacy: {
    eyebrow: string;
    title1: string;
    title2: string;
    lastUpdated: string;
    sections: { heading: string; body?: string; list?: string[] }[];
    rightsEmail: string;
    cookiePolicyLabel: string;
    cookiePolicyText: string;
  };

  // Kullanım Koşulları / Terms
  terms: {
    eyebrow: string;
    title1: string;
    title2: string;
    lastUpdated: string;
    sections: { heading: string; body?: string; list?: string[] }[];
    privacyLinkLabel: string;
  };

  // Çerez Politikası / Cookie Policy
  cookie: {
    eyebrow: string;
    title1: string;
    title2: string;
    lastUpdated: string;
    sections: {
      heading: string;
      body?: string;
      types?: { type: string; desc: string; examples: string }[];
      list?: string[];
    }[];
  };

  // Footer links on legal pages
  privacyLabel: string;
  termsLabel: string;
  cookieLabel: string;
}

// ─── TURKISH ──────────────────────────────────────────────────────────────────
const tr: LegalContent = {
  back: '← Geri Dön',
  lastUpdated: 'Son güncelleme',
  legalNotice: 'Yasal Bildirim',
  backHome: '← Ana Sayfaya Dön',

  cookieBannerText: 'Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanmaktadır.',
  cookiePrivacyLabel: 'Gizlilik Politikası',
  cookiePolicyLabel: 'Çerez Politikamız',
  cookieAccept: 'Kabul Et',
  cookieDecline: 'Reddet',

  privacy: {
    eyebrow: 'KVKK · Madde 10',
    title1: 'Gizlilik &',
    title2: 'KVKK Politikası',
    lastUpdated: 'Haziran 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'Çerez Politikamızı',
    cookiePolicyText: 'Web sitemiz, teknik çerezler ve analiz çerezleri kullanmaktadır. Ayrıntılı bilgi için',
    sections: [
      {
        heading: '1. Veri Sorumlusu',
        body: '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verileriniz, ÂLÂ Ocakbaşı (Şirinyalı Mah. 1539. Sk. No:4, 07160 Muratpaşa/Antalya) tarafından işlenmektedir. İletişim: alaocakbasiantalya@gmail.com',
      },
      {
        heading: '2. Toplanan Kişisel Veriler',
        body: 'Aşağıdaki kişisel verileriniz işlenmektedir:',
        list: [
          'Ad ve soyad',
          'E-posta adresi',
          'Telefon numarası',
          'Rezervasyon tarihi, saati ve kişi sayısı',
          'Özel istek ve notlar',
          'Web sitesi ziyaret verileri (çerezler aracılığıyla)',
        ],
      },
      {
        heading: '3. Kişisel Verilerin İşlenme Amacı',
        body: 'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
        list: [
          'Rezervasyon talebinin alınması ve onaylanması',
          'Müşteri ile iletişim kurulması',
          'Hizmet kalitesinin iyileştirilmesi',
          'Yasal yükümlülüklerin yerine getirilmesi',
          'Web sitesi güvenliği ve performans analizi',
        ],
      },
      {
        heading: '4. Hukuki Dayanak',
        body: "Kişisel verileriniz; KVKK'nın 5. maddesi uyarınca sözleşmenin kurulması ve ifası, meşru menfaat ve açık rıza hukuki sebeplerine dayanılarak işlenmektedir.",
      },
      {
        heading: '5. Verilerin Aktarımı',
        body: 'Kişisel verileriniz; yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır. Rezervasyon e-postaları yalnızca restoran yönetimine iletilir.',
      },
      {
        heading: '6. Saklama Süresi',
        body: "Kişisel verileriniz, işlenme amacının sona ermesinin ardından KVKK ve ilgili mevzuatta öngörülen süre boyunca saklanır; aksi hâlde 2 yıl içinde silinir veya anonim hâle getirilir.",
      },
      {
        heading: '7. KVKK Kapsamındaki Haklarınız',
        body: "KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:",
        list: [
          'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
          'İşlenmişse buna ilişkin bilgi talep etme',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
          'Yurt içi veya yurt dışında aktarıldığı üçüncü kişileri öğrenme',
          'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
          'KVKK madde 7 uyarınca silinmesini veya yok edilmesini isteme',
          'Düzeltme/silme işlemlerinin üçüncü kişilere bildirilmesini isteme',
          'Analiz edilmesi suretiyle aleyhine sonuç çıkmasına itiraz etme',
          'Zararın giderilmesini talep etme',
        ],
      },
    ],
  },

  terms: {
    eyebrow: 'Yasal Bildirim',
    title1: 'Kullanım',
    title2: 'Koşulları',
    lastUpdated: 'Haziran 2025',
    privacyLinkLabel: 'Gizlilik ve KVKK Politikamızı',
    sections: [
      {
        heading: '1. Kabul',
        body: 'Bu web sitesini (alaocakbasi.com) ziyaret etmeniz, aşağıdaki kullanım koşullarını okuduğunuzu ve kabul ettiğinizi göstermektedir. Koşulları kabul etmiyorsanız lütfen siteyi kullanmayınız.',
      },
      {
        heading: '2. Hizmet Tanımı',
        body: 'ÂLÂ Ocakbaşı web sitesi; restoran tanıtımı, menü bilgisi, galeri ve rezervasyon talebi iletimi amacıyla hizmet vermektedir. Rezervasyon formunun doldurulması, kesin rezervasyon anlamına gelmemekte; işletme tarafından onaylanması gerekmektedir.',
      },
      {
        heading: '3. Fikri Mülkiyet',
        body: "Web sitesindeki tüm içerik, tasarım, logo, metin ve görseller ÂLÂ Ocakbaşı'na aittir. İzinsiz kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.",
      },
      {
        heading: '4. Sorumluluk Sınırlaması',
        body: 'Web sitesindeki bilgiler "olduğu gibi" sunulmaktadır. Menü içerikleri ve fiyatlar önceden haber verilmeksizin değiştirilebilir. ÂLÂ Ocakbaşı; teknik kesintilerden, veri kayıplarından veya yanlış bilgilerden doğan zararlar için sorumluluk kabul etmemektedir.',
      },
      {
        heading: '5. Dış Bağlantılar',
        body: 'Web sitemiz üçüncü taraf platformlara (Instagram, Facebook, Google Haritalar vb.) bağlantılar içerebilir. Bu platformların içerik ve gizlilik politikalarından ÂLÂ Ocakbaşı sorumlu değildir.',
      },
      {
        heading: '6. Rezervasyon Koşulları',
        list: [
          'Rezervasyon talepleri e-posta yoluyla onaylanır.',
          'Onaylanmamış talepler geçerli rezervasyon sayılmaz.',
          'İptal bildiriminin en az 2 saat öncesinden yapılması beklenmektedir.',
          'Grup rezervasyonları (8+ kişi) için önceden iletişime geçilmesi gerekmektedir.',
        ],
      },
      {
        heading: '7. Kişisel Verilerin Korunması',
        body: 'Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi için Gizlilik ve KVKK Politikamızı inceleyebilirsiniz.',
      },
      {
        heading: '8. Uygulanacak Hukuk',
        body: 'Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda Antalya mahkemeleri ve icra daireleri yetkilidir.',
      },
      {
        heading: '9. Değişiklikler',
        body: 'ÂLÂ Ocakbaşı, bu koşulları önceden haber vermeksizin güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayımlanacaktır.',
      },
      {
        heading: '10. İletişim',
        body: 'Sorularınız için: alaocakbasiantalya@gmail.com veya +90 532 175 67 07',
      },
    ],
  },

  cookie: {
    eyebrow: 'Yasal Bildirim',
    title1: 'Çerez',
    title2: 'Politikası',
    lastUpdated: 'Haziran 2025',
    sections: [
      {
        heading: 'Çerez Nedir?',
        body: 'Çerezler, web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Oturum bilgilerini hatırlamak, tercihlerinizi saklamak ve site performansını ölçmek amacıyla kullanılırlar.',
      },
      {
        heading: 'Kullandığımız Çerezler',
        types: [
          {
            type: 'Zorunlu Çerezler',
            desc: 'Sitenin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz.',
            examples: "Oturum yönetimi, güvenlik token'ları",
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
        ],
      },
      {
        heading: 'Çerezleri Yönetmek',
        body: 'Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi, sitenin bazı özelliklerinin çalışmamasına yol açabilir.',
        list: [
          'Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler',
          'Firefox: Tercihler → Gizlilik ve Güvenlik',
          'Safari: Tercihler → Gizlilik',
          'Edge: Ayarlar → Çerezler ve site izinleri',
        ],
      },
      {
        heading: 'İletişim',
        body: 'Çerez politikamız hakkında sorularınız için: alaocakbasiantalya@gmail.com',
      },
    ],
  },

  privacyLabel: 'Gizlilik Politikası →',
  termsLabel: 'Kullanım Koşulları →',
  cookieLabel: 'Çerez Politikası →',
};

// ─── ENGLISH ──────────────────────────────────────────────────────────────────
const en: LegalContent = {
  back: '← Go Back',
  lastUpdated: 'Last updated',
  legalNotice: 'Legal Notice',
  backHome: '← Back to Home',

  cookieBannerText: 'We use cookies to improve your experience on our website.',
  cookiePrivacyLabel: 'Privacy Policy',
  cookiePolicyLabel: 'Cookie Policy',
  cookieAccept: 'Accept',
  cookieDecline: 'Decline',

  privacy: {
    eyebrow: 'Privacy · GDPR',
    title1: 'Privacy &',
    title2: 'Data Policy',
    lastUpdated: 'June 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'Cookie Policy',
    cookiePolicyText: 'Our website uses technical and analytics cookies. For detailed information, please review our',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'Your personal data is processed by ÂLÂ Ocakbaşı (Şirinyalı Mah. 1539. Sk. No:4, 07160 Muratpaşa/Antalya, Turkey) in accordance with applicable data protection legislation. Contact: alaocakbasiantalya@gmail.com',
      },
      {
        heading: '2. Personal Data Collected',
        body: 'We process the following personal data:',
        list: [
          'Full name',
          'Email address',
          'Phone number',
          'Reservation date, time and party size',
          'Special requests and notes',
          'Website visit data (via cookies)',
        ],
      },
      {
        heading: '3. Purposes of Processing',
        body: 'Your personal data is processed for the following purposes:',
        list: [
          'Receiving and confirming reservation requests',
          'Communicating with customers',
          'Improving service quality',
          'Fulfilling legal obligations',
          'Website security and performance analysis',
        ],
      },
      {
        heading: '4. Legal Basis',
        body: 'Your personal data is processed on the legal bases of performance of a contract, legitimate interests, and consent.',
      },
      {
        heading: '5. Data Sharing',
        body: 'Your personal data is not shared with third parties except as required by law. Reservation emails are forwarded only to restaurant management.',
      },
      {
        heading: '6. Retention Period',
        body: 'Your personal data is retained for the period required by applicable law after the processing purpose ceases; otherwise it is deleted or anonymised within 2 years.',
      },
      {
        heading: '7. Your Rights',
        body: 'You have the following rights regarding your personal data:',
        list: [
          'Right to know whether your personal data is being processed',
          'Right to request information if it is being processed',
          'Right to know the purpose and whether it is used accordingly',
          'Right to know third parties to whom it is transferred domestically or abroad',
          'Right to request correction if it is incomplete or incorrect',
          'Right to request deletion or destruction',
          'Right to request notification of corrections/deletions to third parties',
          'Right to object to results arising from automated analysis',
          'Right to claim compensation for damages',
        ],
      },
    ],
  },

  terms: {
    eyebrow: 'Legal Notice',
    title1: 'Terms',
    title2: 'of Use',
    lastUpdated: 'June 2025',
    privacyLinkLabel: 'Privacy & Data Policy',
    sections: [
      {
        heading: '1. Acceptance',
        body: 'By visiting this website (alaocakbasi.com), you confirm that you have read and agree to the following terms of use. If you do not agree, please do not use the site.',
      },
      {
        heading: '2. Service Description',
        body: 'The ÂLÂ Ocakbaşı website provides restaurant information, menu details, a gallery and the ability to submit reservation requests. Submitting the reservation form does not constitute a confirmed reservation; confirmation by the establishment is required.',
      },
      {
        heading: '3. Intellectual Property',
        body: 'All content, design, logos, text and images on the website are the property of ÂLÂ Ocakbaşı. Copying, distributing or using them for commercial purposes without permission is prohibited.',
      },
      {
        heading: '4. Limitation of Liability',
        body: 'Information on this website is provided "as is". Menu contents and prices may change without prior notice. ÂLÂ Ocakbaşı accepts no liability for damages arising from technical interruptions, data loss or inaccurate information.',
      },
      {
        heading: '5. External Links',
        body: 'Our website may contain links to third-party platforms (Instagram, Facebook, Google Maps, etc.). ÂLÂ Ocakbaşı is not responsible for the content or privacy practices of these platforms.',
      },
      {
        heading: '6. Reservation Conditions',
        list: [
          'Reservation requests are confirmed by email.',
          'Unconfirmed requests do not count as valid reservations.',
          'Cancellations are expected to be notified at least 2 hours in advance.',
          'Group reservations (8+ guests) require prior contact.',
        ],
      },
      {
        heading: '7. Personal Data Protection',
        body: 'For detailed information on how your personal data is processed, please review our Privacy & Data Policy.',
      },
      {
        heading: '8. Governing Law',
        body: 'These terms are governed by the laws of the Republic of Turkey. Antalya courts and enforcement offices have jurisdiction for any disputes.',
      },
      {
        heading: '9. Changes',
        body: 'ÂLÂ Ocakbaşı reserves the right to update these terms without prior notice. The current terms will always be published on this page.',
      },
      {
        heading: '10. Contact',
        body: 'For enquiries: alaocakbasiantalya@gmail.com or +90 532 175 67 07',
      },
    ],
  },

  cookie: {
    eyebrow: 'Legal Notice',
    title1: 'Cookie',
    title2: 'Policy',
    lastUpdated: 'June 2025',
    sections: [
      {
        heading: 'What Are Cookies?',
        body: 'Cookies are small text files saved to your browser by websites. They are used to remember session information, store preferences and measure site performance.',
      },
      {
        heading: 'Cookies We Use',
        types: [
          {
            type: 'Essential Cookies',
            desc: 'Required for the basic functionality of the site. These cookies cannot be disabled.',
            examples: 'Session management, security tokens',
          },
          {
            type: 'Preference Cookies',
            desc: 'Remembers language selection and user preferences.',
            examples: 'Language preference (tr/en/de…), cookie consent status',
          },
          {
            type: 'Analytics Cookies',
            desc: 'Collects anonymous information about visitor numbers and behaviour.',
            examples: 'Page views, visit duration',
          },
        ],
      },
      {
        heading: 'Managing Cookies',
        body: 'You can delete or block cookies from your browser settings. However, blocking essential cookies may cause some features of the site to stop working.',
        list: [
          'Chrome: Settings → Privacy and security → Cookies',
          'Firefox: Preferences → Privacy & Security',
          'Safari: Preferences → Privacy',
          'Edge: Settings → Cookies and site permissions',
        ],
      },
      {
        heading: 'Contact',
        body: 'For questions about our cookie policy: alaocakbasiantalya@gmail.com',
      },
    ],
  },

  privacyLabel: 'Privacy Policy →',
  termsLabel: 'Terms of Use →',
  cookieLabel: 'Cookie Policy →',
};

// ─── GERMAN ───────────────────────────────────────────────────────────────────
const de: LegalContent = {
  back: '← Zurück',
  lastUpdated: 'Letzte Aktualisierung',
  legalNotice: 'Rechtlicher Hinweis',
  backHome: '← Zurück zur Startseite',

  cookieBannerText: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.',
  cookiePrivacyLabel: 'Datenschutzrichtlinie',
  cookiePolicyLabel: 'Cookie-Richtlinie',
  cookieAccept: 'Akzeptieren',
  cookieDecline: 'Ablehnen',

  privacy: {
    eyebrow: 'Datenschutz · DSGVO',
    title1: 'Datenschutz-',
    title2: 'richtlinie',
    lastUpdated: 'Juni 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'Cookie-Richtlinie',
    cookiePolicyText: 'Unsere Website verwendet technische Cookies und Analyse-Cookies. Für weitere Informationen lesen Sie bitte unsere',
    sections: [
      { heading: '1. Verantwortlicher', body: 'Ihre personenbezogenen Daten werden von ÂLÂ Ocakbaşı (Şirinyalı Mah. 1539. Sk. No:4, 07160 Muratpaşa/Antalya, Türkei) gemäß den geltenden Datenschutzvorschriften verarbeitet. Kontakt: alaocakbasiantalya@gmail.com' },
      { heading: '2. Erhobene Daten', body: 'Wir verarbeiten folgende personenbezogene Daten:', list: ['Vollständiger Name', 'E-Mail-Adresse', 'Telefonnummer', 'Reservierungsdatum, -uhrzeit und Personenanzahl', 'Besondere Wünsche und Notizen', 'Website-Besuchsdaten (über Cookies)'] },
      { heading: '3. Verarbeitungszwecke', body: 'Ihre Daten werden für folgende Zwecke verarbeitet:', list: ['Entgegennahme und Bestätigung von Reservierungsanfragen', 'Kommunikation mit Kunden', 'Verbesserung der Servicequalität', 'Erfüllung gesetzlicher Verpflichtungen', 'Website-Sicherheit und Leistungsanalyse'] },
      { heading: '4. Rechtsgrundlage', body: 'Die Verarbeitung erfolgt auf Grundlage der Vertragserfüllung, berechtigter Interessen und Einwilligung.' },
      { heading: '5. Datenweitergabe', body: 'Ihre Daten werden außer bei gesetzlicher Pflicht nicht an Dritte weitergegeben. Reservierungs-E-Mails werden nur an die Restaurantleitung weitergeleitet.' },
      { heading: '6. Speicherdauer', body: 'Ihre Daten werden nach Wegfall des Verarbeitungszwecks gemäß den gesetzlichen Fristen aufbewahrt; andernfalls innerhalb von 2 Jahren gelöscht oder anonymisiert.' },
      { heading: '7. Ihre Rechte', body: 'Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:', list: ['Auskunftsrecht', 'Recht auf Berichtigung', 'Recht auf Löschung', 'Recht auf Einschränkung der Verarbeitung', 'Recht auf Datenübertragbarkeit', 'Widerspruchsrecht', 'Beschwerderecht bei der Aufsichtsbehörde'] },
    ],
  },

  terms: {
    eyebrow: 'Rechtlicher Hinweis',
    title1: 'Nutzungs-',
    title2: 'bedingungen',
    lastUpdated: 'Juni 2025',
    privacyLinkLabel: 'Datenschutzrichtlinie',
    sections: [
      { heading: '1. Akzeptanz', body: 'Durch den Besuch dieser Website (alaocakbasi.com) bestätigen Sie, dass Sie die folgenden Nutzungsbedingungen gelesen und akzeptiert haben.' },
      { heading: '2. Leistungsbeschreibung', body: 'Die ÂLÂ Ocakbaşı-Website bietet Restaurantinformationen, Menüdetails, eine Galerie und die Möglichkeit, Reservierungsanfragen zu stellen.' },
      { heading: '3. Geistiges Eigentum', body: 'Alle Inhalte, Designs, Logos, Texte und Bilder auf der Website sind Eigentum von ÂLÂ Ocakbaşı.' },
      { heading: '4. Haftungsbeschränkung', body: 'Informationen auf dieser Website werden "wie besehen" bereitgestellt. Menüinhalte und Preise können sich ohne vorherige Ankündigung ändern.' },
      { heading: '5. Externe Links', body: 'Unsere Website kann Links zu Drittanbieter-Plattformen enthalten. ÂLÂ Ocakbaşı ist nicht für deren Inhalte oder Datenschutzpraktiken verantwortlich.' },
      { heading: '6. Reservierungsbedingungen', list: ['Reservierungsanfragen werden per E-Mail bestätigt.', 'Unbestätigte Anfragen gelten nicht als gültige Reservierungen.', 'Stornierungen sind mindestens 2 Stunden im Voraus zu melden.', 'Gruppenreservierungen (8+ Personen) erfordern vorherige Kontaktaufnahme.'] },
      { heading: '7. Datenschutz', body: 'Für weitere Informationen zur Verarbeitung Ihrer personenbezogenen Daten lesen Sie bitte unsere Datenschutzrichtlinie.' },
      { heading: '8. Anwendbares Recht', body: 'Diese Bedingungen unterliegen dem türkischen Recht. Für Streitigkeiten sind die Gerichte in Antalya zuständig.' },
      { heading: '9. Änderungen', body: 'ÂLÂ Ocakbaşı behält sich das Recht vor, diese Bedingungen ohne vorherige Ankündigung zu aktualisieren.' },
      { heading: '10. Kontakt', body: 'Bei Fragen: alaocakbasiantalya@gmail.com oder +90 532 175 67 07' },
    ],
  },

  cookie: {
    eyebrow: 'Rechtlicher Hinweis',
    title1: 'Cookie-',
    title2: 'Richtlinie',
    lastUpdated: 'Juni 2025',
    sections: [
      { heading: 'Was sind Cookies?', body: 'Cookies sind kleine Textdateien, die von Websites in Ihrem Browser gespeichert werden, um Sitzungsinformationen zu speichern, Präferenzen zu merken und die Website-Leistung zu messen.' },
      { heading: 'Von uns verwendete Cookies', types: [{ type: 'Notwendige Cookies', desc: 'Für die grundlegenden Funktionen der Website erforderlich. Diese Cookies können nicht deaktiviert werden.', examples: 'Sitzungsverwaltung, Sicherheits-Token' }, { type: 'Präferenz-Cookies', desc: 'Speichert Sprachauswahl und Benutzerpräferenzen.', examples: 'Sprachpräferenz (tr/en/de…), Cookie-Zustimmungsstatus' }, { type: 'Analyse-Cookies', desc: 'Sammelt anonyme Informationen über Besucherzahlen und -verhalten.', examples: 'Seitenaufrufe, Besuchsdauer' }] },
      { heading: 'Cookies verwalten', body: 'Sie können Cookies über Ihre Browser-Einstellungen löschen oder blockieren.', list: ['Chrome: Einstellungen → Datenschutz und Sicherheit → Cookies', 'Firefox: Einstellungen → Datenschutz & Sicherheit', 'Safari: Einstellungen → Datenschutz', 'Edge: Einstellungen → Cookies und Website-Berechtigungen'] },
      { heading: 'Kontakt', body: 'Bei Fragen zu unserer Cookie-Richtlinie: alaocakbasiantalya@gmail.com' },
    ],
  },

  privacyLabel: 'Datenschutzrichtlinie →',
  termsLabel: 'Nutzungsbedingungen →',
  cookieLabel: 'Cookie-Richtlinie →',
};

// ─── ARABIC ───────────────────────────────────────────────────────────────────
const ar: LegalContent = {
  back: '→ رجوع',
  lastUpdated: 'آخر تحديث',
  legalNotice: 'إشعار قانوني',
  backHome: '→ العودة إلى الرئيسية',

  cookieBannerText: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا.',
  cookiePrivacyLabel: 'سياسة الخصوصية',
  cookiePolicyLabel: 'سياسة ملفات تعريف الارتباط',
  cookieAccept: 'قبول',
  cookieDecline: 'رفض',

  privacy: {
    eyebrow: 'الخصوصية · حماية البيانات',
    title1: 'سياسة',
    title2: 'الخصوصية',
    lastUpdated: 'يونيو 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'سياسة ملفات تعريف الارتباط',
    cookiePolicyText: 'يستخدم موقعنا ملفات تعريف الارتباط التقنية والتحليلية. للمزيد من المعلومات، راجع',
    sections: [
      { heading: '1. المتحكم في البيانات', body: 'تتم معالجة بياناتك الشخصية من قِبل آلا أوجاق باشي (شيرينيالي، أنطاليا، تركيا). للتواصل: alaocakbasiantalya@gmail.com' },
      { heading: '2. البيانات المُجمَّعة', body: 'نعالج البيانات الشخصية التالية:', list: ['الاسم الكامل', 'البريد الإلكتروني', 'رقم الهاتف', 'تاريخ الحجز وعدد الأشخاص', 'الطلبات الخاصة والملاحظات', 'بيانات زيارة الموقع (عبر ملفات تعريف الارتباط)'] },
      { heading: '3. أغراض المعالجة', body: 'تُعالج بياناتك للأغراض التالية:', list: ['استلام طلبات الحجز وتأكيدها', 'التواصل مع العملاء', 'تحسين جودة الخدمة', 'الوفاء بالالتزامات القانونية', 'أمان الموقع وتحليل الأداء'] },
      { heading: '4. الأساس القانوني', body: 'تتم المعالجة على أساس تنفيذ العقد والمصالح المشروعة والموافقة.' },
      { heading: '5. مشاركة البيانات', body: 'لا تُشارك بياناتك مع أطراف ثالثة إلا عند الضرورة القانونية.' },
      { heading: '6. فترة الاحتفاظ', body: 'تُحتفظ ببياناتك وفق المدد القانونية، وتُحذف أو تُجهَّل خلال سنتين بعد انتهاء الغرض.' },
      { heading: '7. حقوقك', body: 'لديك الحقوق التالية:', list: ['حق الوصول إلى بياناتك', 'حق التصحيح', 'حق الحذف', 'حق تقييد المعالجة', 'حق قابلية النقل', 'حق الاعتراض', 'حق تقديم شكوى'] },
    ],
  },

  terms: {
    eyebrow: 'إشعار قانوني',
    title1: 'شروط',
    title2: 'الاستخدام',
    lastUpdated: 'يونيو 2025',
    privacyLinkLabel: 'سياسة الخصوصية',
    sections: [
      { heading: '1. القبول', body: 'بزيارة هذا الموقع، تؤكد أنك قرأت ووافقت على شروط الاستخدام هذه.' },
      { heading: '2. وصف الخدمة', body: 'يوفر موقع آلا أوجاق باشي معلومات المطعم والقائمة ومعرض الصور وإمكانية تقديم طلبات الحجز.' },
      { heading: '3. الملكية الفكرية', body: 'جميع المحتويات والتصاميم والشعارات والنصوص والصور ملك لـ آلا أوجاق باشي.' },
      { heading: '4. تحديد المسؤولية', body: 'تُقدَّم المعلومات "كما هي". قد تتغير محتويات القائمة والأسعار دون إشعار مسبق.' },
      { heading: '5. الروابط الخارجية', body: 'قد يحتوي موقعنا على روابط لمنصات طرف ثالث. لا يتحمل آلا أوجاق باشي مسؤولية محتواها.' },
      { heading: '6. شروط الحجز', list: ['تؤكَّد طلبات الحجز عبر البريد الإلكتروني.', 'لا تعدّ الطلبات غير المؤكدة حجوزات صالحة.', 'يُرجى الإلغاء قبل ساعتين على الأقل.', 'حجوزات المجموعات (8+ أشخاص) تتطلب التواصل المسبق.'] },
      { heading: '7. حماية البيانات', body: 'لمزيد من المعلومات حول معالجة بياناتك، راجع سياسة الخصوصية.' },
      { heading: '8. القانون المطبق', body: 'تخضع هذه الشروط لقوانين جمهورية تركيا، ومحاكم أنطاليا مختصة بالنزاعات.' },
      { heading: '9. التعديلات', body: 'يحتفظ آلا أوجاق باشي بحق تحديث هذه الشروط دون إشعار مسبق.' },
      { heading: '10. التواصل', body: 'للاستفسارات: alaocakbasiantalya@gmail.com أو +90 532 175 67 07' },
    ],
  },

  cookie: {
    eyebrow: 'إشعار قانوني',
    title1: 'سياسة',
    title2: 'ملفات الارتباط',
    lastUpdated: 'يونيو 2025',
    sections: [
      { heading: 'ما هي ملفات تعريف الارتباط؟', body: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة تحفظها المواقع في متصفحك لحفظ معلومات الجلسة والتفضيلات وقياس أداء الموقع.' },
      { heading: 'الملفات التي نستخدمها', types: [{ type: 'الملفات الأساسية', desc: 'ضرورية للوظائف الأساسية للموقع ولا يمكن تعطيلها.', examples: 'إدارة الجلسة، رموز الأمان' }, { type: 'ملفات التفضيلات', desc: 'تحفظ اختيار اللغة وتفضيلات المستخدم.', examples: 'تفضيل اللغة، حالة موافقة ملفات الارتباط' }, { type: 'ملفات التحليل', desc: 'تجمع معلومات مجهولة عن عدد الزوار وسلوكهم.', examples: 'مشاهدات الصفحة، مدة الزيارة' }] },
      { heading: 'إدارة الملفات', body: 'يمكنك حذف ملفات الارتباط أو حجبها من إعدادات متصفحك.', list: ['Chrome: الإعدادات ← الخصوصية والأمان ← ملفات الارتباط', 'Firefox: التفضيلات ← الخصوصية والأمان', 'Safari: التفضيلات ← الخصوصية', 'Edge: الإعدادات ← ملفات الارتباط وأذونات الموقع'] },
      { heading: 'التواصل', body: 'لأسئلة حول سياسة الملفات: alaocakbasiantalya@gmail.com' },
    ],
  },

  privacyLabel: 'سياسة الخصوصية →',
  termsLabel: 'شروط الاستخدام →',
  cookieLabel: 'سياسة الملفات →',
};

// ─── RUSSIAN ──────────────────────────────────────────────────────────────────
const ru: LegalContent = {
  back: '← Назад',
  lastUpdated: 'Последнее обновление',
  legalNotice: 'Правовое уведомление',
  backHome: '← На главную',

  cookieBannerText: 'Мы используем файлы cookie для улучшения вашего опыта на нашем сайте.',
  cookiePrivacyLabel: 'Политика конфиденциальности',
  cookiePolicyLabel: 'Политика использования cookies',
  cookieAccept: 'Принять',
  cookieDecline: 'Отклонить',

  privacy: {
    eyebrow: 'Конфиденциальность',
    title1: 'Политика',
    title2: 'конфиденциальности',
    lastUpdated: 'Июнь 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'политику использования cookies',
    cookiePolicyText: 'Наш сайт использует технические и аналитические файлы cookie. Для получения подробной информации ознакомьтесь с нашей',
    sections: [
      { heading: '1. Оператор данных', body: 'Ваши персональные данные обрабатываются компанией ÂLÂ Ocakbaşı (Şirinyalı, Анталья, Турция). Контакт: alaocakbasiantalya@gmail.com' },
      { heading: '2. Собираемые данные', body: 'Мы обрабатываем следующие персональные данные:', list: ['Полное имя', 'Адрес электронной почты', 'Номер телефона', 'Дата бронирования и количество гостей', 'Особые пожелания и заметки', 'Данные посещения сайта (через cookies)'] },
      { heading: '3. Цели обработки', body: 'Ваши данные обрабатываются в следующих целях:', list: ['Приём и подтверждение запросов на бронирование', 'Связь с клиентами', 'Улучшение качества сервиса', 'Выполнение правовых обязательств', 'Безопасность сайта и анализ производительности'] },
      { heading: '4. Правовая основа', body: 'Обработка данных осуществляется на основе исполнения договора, законных интересов и согласия.' },
      { heading: '5. Передача данных', body: 'Ваши данные не передаются третьим лицам, кроме случаев, предусмотренных законом.' },
      { heading: '6. Срок хранения', body: 'Ваши данные хранятся в соответствии с требованиями закона и удаляются или анонимизируются в течение 2 лет после истечения цели обработки.' },
      { heading: '7. Ваши права', body: 'Вы имеете следующие права в отношении ваших персональных данных:', list: ['Право на доступ к данным', 'Право на исправление', 'Право на удаление', 'Право на ограничение обработки', 'Право на переносимость данных', 'Право на возражение', 'Право на подачу жалобы'] },
    ],
  },

  terms: {
    eyebrow: 'Правовое уведомление',
    title1: 'Условия',
    title2: 'использования',
    lastUpdated: 'Июнь 2025',
    privacyLinkLabel: 'Политику конфиденциальности',
    sections: [
      { heading: '1. Принятие', body: 'Посещая этот сайт, вы подтверждаете, что прочитали и согласились с настоящими условиями использования.' },
      { heading: '2. Описание услуги', body: 'Сайт ÂLÂ Ocakbaşı предоставляет информацию о ресторане, меню, галерею и возможность отправки запросов на бронирование.' },
      { heading: '3. Интеллектуальная собственность', body: 'Весь контент, дизайн, логотипы, тексты и изображения на сайте являются собственностью ÂLÂ Ocakbaşı.' },
      { heading: '4. Ограничение ответственности', body: 'Информация на сайте предоставляется "как есть". Содержание меню и цены могут изменяться без предварительного уведомления.' },
      { heading: '5. Внешние ссылки', body: 'Наш сайт может содержать ссылки на сторонние платформы. ÂLÂ Ocakbaşı не несёт ответственности за их контент.' },
      { heading: '6. Условия бронирования', list: ['Запросы на бронирование подтверждаются по электронной почте.', 'Неподтверждённые запросы не считаются действительными бронированиями.', 'Об отмене следует уведомить не менее чем за 2 часа.', 'Групповые бронирования (8+ гостей) требуют предварительного контакта.'] },
      { heading: '7. Защита данных', body: 'Для получения подробной информации об обработке ваших персональных данных ознакомьтесь с нашей Политикой конфиденциальности.' },
      { heading: '8. Применимое право', body: 'Настоящие условия регулируются законодательством Турецкой Республики. Для разрешения споров компетентны суды Антальи.' },
      { heading: '9. Изменения', body: 'ÂLÂ Ocakbaşı оставляет за собой право обновлять настоящие условия без предварительного уведомления.' },
      { heading: '10. Контакт', body: 'По вопросам: alaocakbasiantalya@gmail.com или +90 532 175 67 07' },
    ],
  },

  cookie: {
    eyebrow: 'Правовое уведомление',
    title1: 'Политика',
    title2: 'cookies',
    lastUpdated: 'Июнь 2025',
    sections: [
      { heading: 'Что такое файлы cookie?', body: 'Файлы cookie — это небольшие текстовые файлы, сохраняемые сайтами в вашем браузере для хранения информации о сеансе, предпочтениях и измерения производительности сайта.' },
      { heading: 'Используемые файлы cookie', types: [{ type: 'Необходимые cookies', desc: 'Необходимы для базовых функций сайта и не могут быть отключены.', examples: 'Управление сеансом, токены безопасности' }, { type: 'Cookies предпочтений', desc: 'Запоминает выбор языка и предпочтения пользователя.', examples: 'Языковые предпочтения (tr/en/de…), статус согласия на cookies' }, { type: 'Аналитические cookies', desc: 'Собирает анонимную информацию о посетителях и их поведении.', examples: 'Просмотры страниц, продолжительность визита' }] },
      { heading: 'Управление cookies', body: 'Вы можете удалить или заблокировать файлы cookie в настройках браузера.', list: ['Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie', 'Firefox: Настройки → Приватность и защита', 'Safari: Настройки → Конфиденциальность', 'Edge: Настройки → Файлы cookie и разрешения сайта'] },
      { heading: 'Контакт', body: 'По вопросам политики cookies: alaocakbasiantalya@gmail.com' },
    ],
  },

  privacyLabel: 'Политика конфиденциальности →',
  termsLabel: 'Условия использования →',
  cookieLabel: 'Политика cookies →',
};

// ─── FRENCH ───────────────────────────────────────────────────────────────────
const fr: LegalContent = {
  back: '← Retour',
  lastUpdated: 'Dernière mise à jour',
  legalNotice: 'Mention légale',
  backHome: '← Retour à l\'accueil',

  cookieBannerText: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
  cookiePrivacyLabel: 'Politique de confidentialité',
  cookiePolicyLabel: 'Politique de cookies',
  cookieAccept: 'Accepter',
  cookieDecline: 'Refuser',

  privacy: {
    eyebrow: 'Confidentialité · RGPD',
    title1: 'Politique de',
    title2: 'confidentialité',
    lastUpdated: 'Juin 2025',
    rightsEmail: 'alaocakbasiantalya@gmail.com',
    cookiePolicyLabel: 'Politique de cookies',
    cookiePolicyText: 'Notre site utilise des cookies techniques et analytiques. Pour plus d\'informations, consultez notre',
    sections: [
      { heading: '1. Responsable du traitement', body: 'Vos données personnelles sont traitées par ÂLÂ Ocakbaşı (Şirinyalı, Antalya, Turquie). Contact : alaocakbasiantalya@gmail.com' },
      { heading: '2. Données collectées', body: 'Nous traitons les données personnelles suivantes :', list: ['Nom complet', 'Adresse e-mail', 'Numéro de téléphone', 'Date de réservation et nombre de convives', 'Demandes spéciales et notes', 'Données de visite du site (via cookies)'] },
      { heading: '3. Finalités du traitement', body: 'Vos données sont traitées aux fins suivantes :', list: ['Réception et confirmation des demandes de réservation', 'Communication avec les clients', 'Amélioration de la qualité du service', 'Respect des obligations légales', 'Sécurité du site et analyse des performances'] },
      { heading: '4. Base légale', body: 'Le traitement est effectué sur la base de l\'exécution du contrat, des intérêts légitimes et du consentement.' },
      { heading: '5. Partage des données', body: 'Vos données ne sont pas partagées avec des tiers, sauf obligation légale.' },
      { heading: '6. Durée de conservation', body: 'Vos données sont conservées conformément aux exigences légales et supprimées ou anonymisées dans les 2 ans suivant la fin de la finalité.' },
      { heading: '7. Vos droits', body: 'Vous disposez des droits suivants :', list: ['Droit d\'accès', 'Droit de rectification', 'Droit à l\'effacement', 'Droit à la limitation du traitement', 'Droit à la portabilité', 'Droit d\'opposition', 'Droit de réclamation auprès de la CNIL'] },
    ],
  },

  terms: {
    eyebrow: 'Mention légale',
    title1: 'Conditions',
    title2: 'd\'utilisation',
    lastUpdated: 'Juin 2025',
    privacyLinkLabel: 'Politique de confidentialité',
    sections: [
      { heading: '1. Acceptation', body: 'En visitant ce site, vous confirmez avoir lu et accepté les présentes conditions d\'utilisation.' },
      { heading: '2. Description du service', body: 'Le site ÂLÂ Ocakbaşı fournit des informations sur le restaurant, le menu, une galerie et la possibilité d\'envoyer des demandes de réservation.' },
      { heading: '3. Propriété intellectuelle', body: 'Tous les contenus, designs, logos, textes et images du site appartiennent à ÂLÂ Ocakbaşı.' },
      { heading: '4. Limitation de responsabilité', body: 'Les informations sont fournies "en l\'état". Les contenus du menu et les prix peuvent changer sans préavis.' },
      { heading: '5. Liens externes', body: 'Notre site peut contenir des liens vers des plateformes tierces. ÂLÂ Ocakbaşı n\'est pas responsable de leur contenu.' },
      { heading: '6. Conditions de réservation', list: ['Les demandes de réservation sont confirmées par e-mail.', 'Les demandes non confirmées ne constituent pas des réservations valides.', 'Les annulations doivent être notifiées au moins 2 heures à l\'avance.', 'Les réservations de groupe (8+ convives) nécessitent un contact préalable.'] },
      { heading: '7. Protection des données', body: 'Pour des informations détaillées sur le traitement de vos données, consultez notre Politique de confidentialité.' },
      { heading: '8. Droit applicable', body: 'Ces conditions sont régies par le droit turc. Les tribunaux d\'Antalya sont compétents pour tout litige.' },
      { heading: '9. Modifications', body: 'ÂLÂ Ocakbaşı se réserve le droit de mettre à jour ces conditions sans préavis.' },
      { heading: '10. Contact', body: 'Pour toute question : alaocakbasiantalya@gmail.com ou +90 532 175 67 07' },
    ],
  },

  cookie: {
    eyebrow: 'Mention légale',
    title1: 'Politique de',
    title2: 'cookies',
    lastUpdated: 'Juin 2025',
    sections: [
      { heading: 'Que sont les cookies ?', body: 'Les cookies sont de petits fichiers texte enregistrés par les sites dans votre navigateur pour mémoriser les informations de session, stocker vos préférences et mesurer les performances du site.' },
      { heading: 'Cookies utilisés', types: [{ type: 'Cookies essentiels', desc: 'Nécessaires aux fonctions de base du site. Ces cookies ne peuvent pas être désactivés.', examples: 'Gestion de session, jetons de sécurité' }, { type: 'Cookies de préférence', desc: 'Mémorise la sélection de langue et les préférences utilisateur.', examples: 'Préférence linguistique (tr/en/de…), statut de consentement aux cookies' }, { type: 'Cookies d\'analyse', desc: 'Collecte des informations anonymes sur le nombre de visiteurs et leur comportement.', examples: 'Pages vues, durée de visite' }] },
      { heading: 'Gérer les cookies', body: 'Vous pouvez supprimer ou bloquer les cookies depuis les paramètres de votre navigateur.', list: ['Chrome : Paramètres → Confidentialité et sécurité → Cookies', 'Firefox : Préférences → Vie privée et sécurité', 'Safari : Préférences → Confidentialité', 'Edge : Paramètres → Cookies et autorisations de sites'] },
      { heading: 'Contact', body: 'Pour toute question sur notre politique de cookies : alaocakbasiantalya@gmail.com' },
    ],
  },

  privacyLabel: 'Politique de confidentialité →',
  termsLabel: 'Conditions d\'utilisation →',
  cookieLabel: 'Politique de cookies →',
};

// ─── Lookup ───────────────────────────────────────────────────────────────────
const map: Record<string, LegalContent> = { tr, en, de, ar, ru, fr };

export function getLegal(locale: string): LegalContent {
  return map[locale] ?? en;
}
