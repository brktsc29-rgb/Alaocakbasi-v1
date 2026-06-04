export type Locale = 'tr' | 'en' | 'de' | 'ar' | 'ru' | 'fr';

export const LOCALES: Locale[] = ['tr', 'en', 'de', 'ar', 'ru', 'fr'];
export const DEFAULT_LOCALE: Locale = 'tr';

export interface Translations {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  langLabel: string;

  // Navigation
  nav_story: string;
  nav_menu: string;
  nav_chef: string;
  nav_gallery: string;
  nav_contact: string;
  nav_reservation: string;

  // Hero
  hero_eyebrow: string;
  hero_tagline: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_scroll: string;
  hero_corner_left: string;
  hero_corner_right: string;

  // Story
  story_eyebrow: string;
  story_h1: string;
  story_h2: string;
  story_h3: string;
  story_h4: string;
  story_body1: string;
  story_body2: string;
  story_body3: string;
  story_founded: string;
  stat_years: string;
  stat_dishes: string;
  stat_tables: string;
  stat_awards: string;

  // Signature Dishes
  dishes_eyebrow: string;
  dishes_h1: string;
  dishes_h2: string;
  dishes_view_all: string;
  dishes_details: string;
  tag_chef: string;
  tag_slow: string;
  tag_traditional: string;
  tag_fresh: string;
  dish1_sub: string;
  dish1_desc: string;
  dish2_sub: string;
  dish2_desc: string;
  dish3_sub: string;
  dish3_desc: string;
  dish4_sub: string;
  dish4_desc: string;

  // Chef
  chef_eyebrow: string;
  chef_role: string;
  chef_bio1: string;
  chef_bio2: string;
  chef_awards_label: string;
  chef_quote: string;

  // Gallery
  gallery_eyebrow: string;
  gallery_h1: string;
  gallery_h2: string;

  // Menu Showcase
  menu_eyebrow: string;
  menu_h1: string;
  menu_h2: string;
  menu_tab_starter: string;
  menu_tab_main: string;
  menu_tab_dessert: string;
  menu_tab_drinks: string;
  menu_empty: string;
  menu_footnote: string;

  // Wine & Rakı
  wine_eyebrow: string;
  wine_h1: string;
  wine_h2: string;
  wine_desc: string;
  wine_raki_col: string;
  wine_wines_col: string;
  wine_recommended: string;
  wine_disclaimer: string;

  // Reservation
  res_eyebrow: string;
  res_h1: string;
  res_h2: string;
  res_desc: string;
  res_name: string;
  res_email: string;
  res_phone: string;
  res_party: string;
  res_time: string;
  res_notes: string;
  res_submit: string;
  res_submitting: string;
  res_success_h: string;
  res_success_msg: string;
  res_party_sizes: string[];
  res_privacy: string;
  res_label_phone: string;
  res_label_email: string;
  res_label_hours: string;
  res_hours_value: string;

  // Location
  loc_eyebrow: string;
  loc_h1: string;
  loc_h2: string;
  loc_label_address: string;
  loc_label_phone: string;
  loc_label_email: string;
  loc_label_hours: string;
  loc_hours_value: string;
  loc_follow: string;

  // Footer
  footer_tagline: string;
  footer_pages: string;
  footer_contact: string;
  footer_copy: string;
  footer_finedining: string;
  footer_privacy: string;
  footer_terms: string;
}

// ─── TURKISH ──────────────────────────────────────────────────────────────────
const tr: Translations = {
  locale: 'tr', dir: 'ltr', langLabel: 'TR',
  nav_story: 'Hikayemiz', nav_menu: 'Menü', nav_chef: 'Şef',
  nav_gallery: 'Galeri', nav_contact: 'İletişim', nav_reservation: 'Rezervasyon',

  hero_eyebrow: 'Şirinyalı · Antalya · Türkiye',
  hero_tagline: 'Akdeniz\'in Kalbinde Ateşin ve Lezzetin Buluştuğu Yer',
  hero_cta_primary: 'Rezervasyon', hero_cta_secondary: 'Menüyü Keşfet',
  hero_scroll: 'Keşfet', hero_corner_left: 'Fine Dining Experience',
  hero_corner_right: 'Muratpaşa · Antalya',

  story_eyebrow: 'Hikayemiz', story_h1: 'Ateşin', story_h2: 'Ustası,',
  story_h3: 'Lezzetin', story_h4: 'Mimarı',
  story_body1: 'ÂLÂ Ocakbaşı, Antalya\'nın eşsiz Akdeniz iklimiyle bütünleşen Şirinyalı\'da, Akdeniz mutfağının en saf halini sunma hayaliyle kapılarını açtı. Her yemekte bir hikaye, her ateşte bir sanat gizli.',
  story_body2: 'Kökleri Adana\'ya uzanan şef Mehmet Ali Öztürk, nesiller boyu aktarılan ocak geleneğini çağdaş fine dining anlayışıyla birleştirerek benzersiz bir deneyim yaratıyor. Seçilmiş malzemeler, mükemmel pişirme teknikleri ve sanatsal sunum; her akşam yeni bir şaheser doğuruyor.',
  story_body3: 'Antalya\'nın sıcak Akdeniz ruhuyla şekillenen mekan; ham beton, koyu meşe ve altın vurguların bir senfonisi. Açık mutfak konseptiyle misafirler, şefin elinden çıkan her tabağı yakından takip edebilir.',
  story_founded: 'Kuruluş', stat_years: 'Yıl', stat_dishes: 'İmza Yemek',
  stat_tables: 'Özel Masa', stat_awards: 'Ödül',

  dishes_eyebrow: 'İmza Yemekler', dishes_h1: 'Ocağın En Özel', dishes_h2: 'Lezzetleri',
  dishes_view_all: 'Tüm Menüyü Gör', dishes_details: 'Detaylar →',
  tag_chef: 'Şef Seçkisi', tag_slow: 'Saatlerce Hazırlık',
  tag_traditional: 'Geleneksel', tag_fresh: 'Günlük Taze',
  dish1_sub: 'İmza Kebap', dish1_desc: 'El kıyması dana eti, özel baharatlı yağ, közlenmiş biber ve taze otlarla hazırlanan şef imzalı kebap.',
  dish2_sub: 'Özel Hazırlık', dish2_desc: '18 saat marine edilmiş kuzu but, yaban otları ve kırmızı şarap sosuyla yavaş pişirilmiş tandır.',
  dish3_sub: 'Osmanlı Mirası', dish3_desc: 'Közlenmiş patlıcan püresi, kaşar peyniri ve üzerinde dana kavurmasıyla sunulan Osmanlı klasiği.',
  dish4_sub: 'Akdeniz Lezzeti', dish4_desc: 'Ege sularından taze levrek, zeytinyağı, kapari, zeytin ve cherry domatesiyle buğulamada.',

  chef_eyebrow: 'Şefle Buluşun', chef_role: 'Executive Chef & Kurucu',
  chef_bio1: 'Adana\'nın ateşli ocaklarında büyüyen Mehmet Ali, 7 yaşında babasının yanında mangal başında durmaya başladı. Paris\'te Le Cordon Bleu\'yu bitirdikten sonra Michelin yıldızlı restoranlarla çalışarak geldi Antalya\'ya — ve bir efsane yarattı.',
  chef_bio2: '20 yılı aşkın mutfak deneyimini geleneksel Akdeniz teknikleriyle harmanlayan şef, ocakbaşı geleneğini dünya sahnesine taşıdı. Her tabak; saatler süren hazırlık, özenle seçilmiş malzemeler ve derin bir tutkudan doğuyor.',
  chef_awards_label: 'Ödüller & Takdirler',
  chef_quote: '«Her alev bir hikayedir, her duman bir anı.»',

  gallery_eyebrow: 'Galeri', gallery_h1: 'Atmosferi', gallery_h2: 'Hissedin',

  menu_eyebrow: 'Menü', menu_h1: 'Her Tabak', menu_h2: 'Bir Hikaye',
  menu_tab_starter: 'Başlangıç', menu_tab_main: 'Ana Yemek',
  menu_tab_dessert: 'Tatlı', menu_tab_drinks: 'İçecek',
  menu_empty: 'Bu kategoride henüz ürün eklenmedi.',
  menu_footnote: 'Fiyatlara KDV dahildir · Sezonluk ürün bulunabilirliği değişebilir',

  wine_eyebrow: 'İçecek Seçkisi', wine_h1: 'Şarap &', wine_h2: 'Rakı',
  wine_desc: 'Özenle seçilmiş Türk ve Dünya şarapları, geleneksel rakı seçkimiz ile sofralarınızı taçlandırıyoruz.',
  wine_raki_col: 'Rakı Seçkisi', wine_wines_col: 'Şarap Seçkisi',
  wine_recommended: 'Önerilen',
  wine_disclaimer: 'Alkol tüketimi sağlığa zararlıdır · 18 yaş altına alkol satışı yasaktır',

  res_eyebrow: 'Rezervasyon', res_h1: 'Masanızı', res_h2: 'Ayırtın',
  res_desc: 'Size özel bir deneyim hazırlamak için sabırsızlanıyoruz. Rezervasyonunuz için en geç 24 saat öncesinden onay mesajı alacaksınız.',
  res_name: 'ADINIZ SOYADINIZ', res_email: 'E-POSTA ADRESİNİZ',
  res_phone: 'TELEFON NUMARANIZ', res_party: 'KİŞİ SAYISI',
  res_time: 'SAAT SEÇİN', res_notes: 'ÖZEL İSTEKLER, ALERJİLER VEYA NOTLAR',
  res_submit: 'Rezervasyon Talebi Gönder', res_submitting: 'Gönderiliyor…',
  res_success_h: 'Teşekkürler',
  res_success_msg: 'Rezervasyon talebiniz alındı. 24 saat içinde onay mesajı göndereceğiz.',
  res_party_sizes: ['2 Kişi', '3 Kişi', '4 Kişi', '5-6 Kişi', '7-8 Kişi', '8+ Kişi (Özel)'],
  res_privacy: 'Bilgileriniz güvende · Spam göndermiyoruz',
  res_label_phone: 'Telefon', res_label_email: 'E-posta',
  res_label_hours: 'Çalışma Saatleri', res_hours_value: 'Pzt–Paz · 19:00 – 00:00',

  loc_eyebrow: 'Bize Ulaşın', loc_h1: 'Bizi', loc_h2: 'Bulun',
  loc_label_address: 'Adres', loc_label_phone: 'Telefon',
  loc_label_email: 'E-posta', loc_label_hours: 'Çalışma Saatleri',
  loc_hours_value: 'Pazartesi – Pazar\n19:00 – 00:00', loc_follow: 'Bizi Takip Edin',

  footer_tagline: 'Akdeniz\'in kalbinde, ateşin ve lezzetin buluştuğu eşsiz bir fine dining deneyimi.',
  footer_pages: 'Sayfalar', footer_contact: 'İletişim',
  footer_copy: 'Tüm Hakları Saklıdır', footer_finedining: 'Fine Dining · Antalya · Turkey',
  footer_privacy: 'Gizlilik Politikası', footer_terms: 'Kullanım Koşulları',
};

// ─── ENGLISH ──────────────────────────────────────────────────────────────────
const en: Translations = {
  locale: 'en', dir: 'ltr', langLabel: 'EN',
  nav_story: 'Our Story', nav_menu: 'Menu', nav_chef: 'Chef',
  nav_gallery: 'Gallery', nav_contact: 'Contact', nav_reservation: 'Reservation',

  hero_eyebrow: 'Şirinyalı · Antalya · Turkey',
  hero_tagline: 'Where Fire and Flavor Meet in the Heart of the Mediterranean',
  hero_cta_primary: 'Reserve a Table', hero_cta_secondary: 'Explore Menu',
  hero_scroll: 'Discover', hero_corner_left: 'Fine Dining Experience',
  hero_corner_right: 'Muratpaşa · Antalya',

  story_eyebrow: 'Our Story', story_h1: 'Master', story_h2: 'of Fire,',
  story_h3: 'Architect', story_h4: 'of Flavor',
  story_body1: 'ÂLÂ Ocakbaşı opened its doors in Şirinyalı, nestled within Antalya\'s breathtaking Mediterranean coast, with a dream of presenting the Mediterranean kitchen in its purest form. Every dish holds a story; every flame, a work of art.',
  story_body2: 'Chef Mehmet Ali Öztürk, whose roots run deep in Adana\'s fiery hearths, began standing by his father\'s grill at age seven. After graduating from Le Cordon Bleu in Paris and working with Michelin-starred restaurants, he arrived in Antalya — and created a legend.',
  story_body3: 'Shaped by Antalya\'s warm Mediterranean soul, the space is a symphony of raw concrete, dark oak and gold accents. Through the open-kitchen concept, guests can follow every dish as it comes to life from the chef\'s hands.',
  story_founded: 'Founded', stat_years: 'Years', stat_dishes: 'Signature Dishes',
  stat_tables: 'Private Tables', stat_awards: 'Awards',

  dishes_eyebrow: 'Signature Dishes', dishes_h1: 'The Finest', dishes_h2: 'of the Hearth',
  dishes_view_all: 'View Full Menu', dishes_details: 'Details →',
  tag_chef: 'Chef\'s Selection', tag_slow: 'Hours of Preparation',
  tag_traditional: 'Traditional', tag_fresh: 'Daily Fresh',
  dish1_sub: 'Signature Kebab', dish1_desc: 'Hand-minced beef, special spiced butter, roasted peppers and fresh herbs — the chef\'s signature kebab.',
  dish2_sub: 'Special Preparation', dish2_desc: '18-hour marinated lamb leg, slow-roasted in a tandoor with wild herbs and red wine sauce.',
  dish3_sub: 'Ottoman Heritage', dish3_desc: 'Roasted aubergine purée, kaşar cheese, topped with braised beef — an Ottoman classic.',
  dish4_sub: 'Mediterranean Flavour', dish4_desc: 'Fresh sea bass from the Aegean, poached with olive oil, capers, olives and cherry tomatoes.',

  chef_eyebrow: 'Meet the Chef', chef_role: 'Executive Chef & Founder',
  chef_bio1: 'Growing up beside the fiery hearths of Adana, Mehmet Ali began standing at his father\'s grill at the age of seven. After graduating from Le Cordon Bleu in Paris and collaborating with Michelin-starred restaurants, he arrived in Antalya — and created a legend.',
  chef_bio2: 'Blending over 20 years of culinary experience with traditional Mediterranean techniques, the chef brought the ocakbaşı tradition to the world stage. Every plate is born from hours of preparation, carefully sourced ingredients and a deep passion.',
  chef_awards_label: 'Awards & Recognitions',
  chef_quote: '"Every flame is a story; every wisp of smoke, a memory."',

  gallery_eyebrow: 'Gallery', gallery_h1: 'Feel the', gallery_h2: 'Atmosphere',

  menu_eyebrow: 'Menu', menu_h1: 'Every Plate', menu_h2: 'a Story',
  menu_tab_starter: 'Starters', menu_tab_main: 'Mains',
  menu_tab_dessert: 'Desserts', menu_tab_drinks: 'Drinks',
  menu_empty: 'No items in this category yet.',
  menu_footnote: 'Prices include VAT · Seasonal availability may vary',

  wine_eyebrow: 'Beverage Selection', wine_h1: 'Wine &', wine_h2: 'Rakı',
  wine_desc: 'We crown your table with our carefully curated selection of Turkish and international wines alongside our traditional rakı collection.',
  wine_raki_col: 'Rakı Selection', wine_wines_col: 'Wine Selection',
  wine_recommended: 'Recommended',
  wine_disclaimer: 'Alcohol is harmful to health · Sale of alcohol to under-18s is prohibited',

  res_eyebrow: 'Reservation', res_h1: 'Reserve', res_h2: 'Your Table',
  res_desc: 'We look forward to preparing an exclusive experience for you. You will receive a confirmation within 24 hours of your reservation request.',
  res_name: 'YOUR FULL NAME', res_email: 'YOUR EMAIL ADDRESS',
  res_phone: 'YOUR PHONE NUMBER', res_party: 'NUMBER OF GUESTS',
  res_time: 'SELECT TIME', res_notes: 'SPECIAL REQUESTS, ALLERGIES OR NOTES',
  res_submit: 'Send Reservation Request', res_submitting: 'Sending…',
  res_success_h: 'Thank You',
  res_success_msg: 'Your reservation request has been received. We will send a confirmation to your email within 24 hours.',
  res_party_sizes: ['2 Guests', '3 Guests', '4 Guests', '5–6 Guests', '7–8 Guests', '8+ Guests (Private)'],
  res_privacy: 'Your information is secure · We do not send spam',
  res_label_phone: 'Phone', res_label_email: 'Email',
  res_label_hours: 'Opening Hours', res_hours_value: 'Mon–Sun · 19:00 – 00:00',

  loc_eyebrow: 'Get in Touch', loc_h1: 'Find', loc_h2: 'Us',
  loc_label_address: 'Address', loc_label_phone: 'Phone',
  loc_label_email: 'Email', loc_label_hours: 'Opening Hours',
  loc_hours_value: 'Monday – Sunday\n19:00 – 00:00', loc_follow: 'Follow Us',

  footer_tagline: 'An unparalleled fine dining experience at the heart of the Mediterranean, where fire and flavour converge.',
  footer_pages: 'Pages', footer_contact: 'Contact',
  footer_copy: 'All Rights Reserved', footer_finedining: 'Fine Dining · Antalya · Turkey',
  footer_privacy: 'Privacy Policy', footer_terms: 'Terms of Use',
};

// ─── GERMAN ───────────────────────────────────────────────────────────────────
const de: Translations = {
  locale: 'de', dir: 'ltr', langLabel: 'DE',
  nav_story: 'Geschichte', nav_menu: 'Speisekarte', nav_chef: 'Küchenchef',
  nav_gallery: 'Galerie', nav_contact: 'Kontakt', nav_reservation: 'Reservierung',

  hero_eyebrow: 'Şirinyalı · Antalya · Türkei',
  hero_tagline: 'Wo Feuer und Geschmack im Herzen des Mittelmeers aufeinandertreffen',
  hero_cta_primary: 'Tisch reservieren', hero_cta_secondary: 'Speisekarte entdecken',
  hero_scroll: 'Entdecken', hero_corner_left: 'Fine Dining Erlebnis',
  hero_corner_right: 'Muratpaşa · Antalya',

  story_eyebrow: 'Unsere Geschichte', story_h1: 'Meister', story_h2: 'des Feuers,',
  story_h3: 'Architekt', story_h4: 'des Geschmacks',
  story_body1: 'ÂLÂ Ocakbaşı öffnete seine Türen in Şirinyalı, eingebettet in Antalyas atemberaubende Mittelmeerküste, mit dem Traum, die mediterrane Küche in ihrer reinsten Form zu präsentieren. In jedem Gericht steckt eine Geschichte; in jeder Flamme ein Kunstwerk.',
  story_body2: 'Küchenchef Mehmet Ali Öztürk, dessen Wurzeln tief in den feurigen Herden Adanas verwurzelt sind, begann im Alter von sieben Jahren neben dem Grill seines Vaters zu stehen. Nach dem Abschluss am Le Cordon Bleu in Paris und der Zusammenarbeit mit Michelin-Sterne-Restaurants kam er nach Antalya — und schuf eine Legende.',
  story_body3: 'Geprägt von Antalyas warmem Mittelmeergeist ist das Restaurant eine Symphonie aus Rohbeton, dunkler Eiche und Goldakzenten. Durch das Open-Kitchen-Konzept können Gäste jedem Gericht bei seiner Entstehung aus der Hand des Küchenchefs folgen.',
  story_founded: 'Gründung', stat_years: 'Jahre', stat_dishes: 'Signature-Gerichte',
  stat_tables: 'Private Tische', stat_awards: 'Auszeichnungen',

  dishes_eyebrow: 'Signature-Gerichte', dishes_h1: 'Die Feinsten', dishes_h2: 'vom Herd',
  dishes_view_all: 'Vollständige Speisekarte', dishes_details: 'Details →',
  tag_chef: 'Chefselektion', tag_slow: 'Stundenlange Zubereitung',
  tag_traditional: 'Traditionell', tag_fresh: 'Täglich frisch',
  dish1_sub: 'Signature-Kebab', dish1_desc: 'Handgehacktes Rindfleisch, speziell gewürztes Fett, geröstete Paprika und frische Kräuter — der Signature-Kebab des Küchenchefs.',
  dish2_sub: 'Spezielle Zubereitung', dish2_desc: '18 Stunden marinierte Lammkeule, langsam im Tandoor mit wilden Kräutern und Rotweinsoße gegart.',
  dish3_sub: 'Osmanisches Erbe', dish3_desc: 'Geröstetes Auberginenpüree, Kaşar-Käse, garniert mit geschmortem Rind — ein osmanischer Klassiker.',
  dish4_sub: 'Mediterraner Geschmack', dish4_desc: 'Frischer Wolfsbarsch aus der Ägäis, pochiert mit Olivenöl, Kapern, Oliven und Kirschtomaten.',

  chef_eyebrow: 'Den Küchenchef kennenlernen', chef_role: 'Küchenchef & Gründer',
  chef_bio1: 'Mehmet Ali wuchs neben den feurigen Herden Adanas auf und stand bereits mit sieben Jahren neben dem Grill seines Vaters. Nach dem Abschluss am Le Cordon Bleu in Paris und der Zusammenarbeit mit Michelin-Sterne-Restaurants kam er nach Antalya — und schuf eine Legende.',
  chef_bio2: 'Mit über 20 Jahren kulinarischer Erfahrung, die er mit traditionellen mediterranen Techniken verbindet, brachte der Küchenchef die Ocakbaşı-Tradition auf die Weltbühne. Jeder Teller entsteht aus stundenlanger Vorbereitung, sorgfältig ausgewählten Zutaten und tiefer Leidenschaft.',
  chef_awards_label: 'Auszeichnungen & Anerkennungen',
  chef_quote: '„Jede Flamme ist eine Geschichte; jede Rauchschwade eine Erinnerung."',

  gallery_eyebrow: 'Galerie', gallery_h1: 'Erleben Sie die', gallery_h2: 'Atmosphäre',

  menu_eyebrow: 'Speisekarte', menu_h1: 'Jedes Gericht', menu_h2: 'eine Geschichte',
  menu_tab_starter: 'Vorspeisen', menu_tab_main: 'Hauptgerichte',
  menu_tab_dessert: 'Desserts', menu_tab_drinks: 'Getränke',
  menu_empty: 'Noch keine Artikel in dieser Kategorie.',
  menu_footnote: 'Preise inkl. MwSt. · Saisonale Verfügbarkeit kann variieren',

  wine_eyebrow: 'Getränkeauswahl', wine_h1: 'Wein &', wine_h2: 'Rakı',
  wine_desc: 'Wir krönen Ihren Tisch mit unserer sorgfältig zusammengestellten Auswahl türkischer und internationaler Weine sowie unserer traditionellen Rakı-Kollektion.',
  wine_raki_col: 'Rakı-Auswahl', wine_wines_col: 'Weinauswahl',
  wine_recommended: 'Empfohlen',
  wine_disclaimer: 'Alkohol schadet der Gesundheit · Alkoholverkauf an unter 18-Jährige verboten',

  res_eyebrow: 'Reservierung', res_h1: 'Reservieren Sie', res_h2: 'Ihren Tisch',
  res_desc: 'Wir freuen uns darauf, ein exklusives Erlebnis für Sie vorzubereiten. Sie erhalten eine Bestätigung innerhalb von 24 Stunden nach Ihrer Reservierungsanfrage.',
  res_name: 'IHR VOLLSTÄNDIGER NAME', res_email: 'IHRE E-MAIL-ADRESSE',
  res_phone: 'IHRE TELEFONNUMMER', res_party: 'ANZAHL DER GÄSTE',
  res_time: 'UHRZEIT WÄHLEN', res_notes: 'BESONDERE WÜNSCHE, ALLERGIEN ODER NOTIZEN',
  res_submit: 'Reservierungsanfrage senden', res_submitting: 'Wird gesendet…',
  res_success_h: 'Vielen Dank',
  res_success_msg: 'Ihre Reservierungsanfrage wurde erhalten. Wir senden Ihnen innerhalb von 24 Stunden eine Bestätigung.',
  res_party_sizes: ['2 Personen', '3 Personen', '4 Personen', '5–6 Personen', '7–8 Personen', '8+ Personen (Privat)'],
  res_privacy: 'Ihre Daten sind sicher · Kein Spam',
  res_label_phone: 'Telefon', res_label_email: 'E-Mail',
  res_label_hours: 'Öffnungszeiten', res_hours_value: 'Mo–So · 19:00 – 00:00',

  loc_eyebrow: 'Kontakt', loc_h1: 'Finden Sie', loc_h2: 'Uns',
  loc_label_address: 'Adresse', loc_label_phone: 'Telefon',
  loc_label_email: 'E-Mail', loc_label_hours: 'Öffnungszeiten',
  loc_hours_value: 'Montag – Sonntag\n19:00 – 00:00', loc_follow: 'Folgen Sie uns',

  footer_tagline: 'Ein unvergleichliches Fine-Dining-Erlebnis im Herzen des Mittelmeers, wo Feuer und Geschmack zusammentreffen.',
  footer_pages: 'Seiten', footer_contact: 'Kontakt',
  footer_copy: 'Alle Rechte vorbehalten', footer_finedining: 'Fine Dining · Antalya · Türkei',
  footer_privacy: 'Datenschutzrichtlinie', footer_terms: 'Nutzungsbedingungen',
};

// ─── ARABIC ───────────────────────────────────────────────────────────────────
const ar: Translations = {
  locale: 'ar', dir: 'rtl', langLabel: 'AR',
  nav_story: 'قصتنا', nav_menu: 'القائمة', nav_chef: 'الشيف',
  nav_gallery: 'المعرض', nav_contact: 'اتصل بنا', nav_reservation: 'احجز طاولة',

  hero_eyebrow: 'شيرينيالي · أنطاليا · تركيا',
  hero_tagline: 'حيث تلتقي النار والنكهة في قلب البحر الأبيض المتوسط',
  hero_cta_primary: 'احجز طاولة', hero_cta_secondary: 'استعرض القائمة',
  hero_scroll: 'اكتشف', hero_corner_left: 'تجربة المطاعم الفاخرة',
  hero_corner_right: 'مراطباشا · أنطاليا',

  story_eyebrow: 'قصتنا', story_h1: 'سيد', story_h2: 'النار،',
  story_h3: 'مهندس', story_h4: 'النكهة',
  story_body1: 'فتح آلا أوجاق باشي أبوابه في شيرينيالي، في قلب الساحل المتوسطي الخلّاب لأنطاليا، بحلم تقديم المطبخ المتوسطي في أنقى صوره. في كل طبق قصة، وفي كل لهب فن.',
  story_body2: 'الشيف محمد علي أوزتورك، الذي نشأ بجوار موقد أبيه في أضنة، بدأ يقف بجانب الشواية منذ السابعة من عمره. بعد تخرجه من لو كوردون بلو في باريس وعمله مع مطاعم نجوم ميشلان، جاء إلى أنطاليا — وصنع أسطورة.',
  story_body3: 'تشكّل المكان بروح البحر الأبيض المتوسط الدافئة التي تميز أنطاليا، وهو سيمفونية من الخرسانة الخام والبلوط الداكن ولمسات الذهب. من خلال مفهوم المطبخ المفتوح، يمكن للضيوف متابعة كل طبق يخرج من يدي الشيف.',
  story_founded: 'التأسيس', stat_years: 'سنوات', stat_dishes: 'أطباق مميزة',
  stat_tables: 'طاولات خاصة', stat_awards: 'جوائز',

  dishes_eyebrow: 'الأطباق المميزة', dishes_h1: 'أرقى', dishes_h2: 'لذائذ الموقد',
  dishes_view_all: 'عرض القائمة كاملة', dishes_details: 'التفاصيل →',
  tag_chef: 'اختيار الشيف', tag_slow: 'ساعات من الإعداد',
  tag_traditional: 'تقليدي', tag_fresh: 'طازج يومياً',
  dish1_sub: 'كباب مميز', dish1_desc: 'لحم بقري مفروم يدوياً، زبدة متبلة خاصة، فلفل مشوي وأعشاب طازجة — الكباب المميز للشيف.',
  dish2_sub: 'إعداد خاص', dish2_desc: 'فخذ خروف متبل لـ18 ساعة، مطهو ببطء في التندور مع أعشاب برية وصلصة نبيذ أحمر.',
  dish3_sub: 'إرث عثماني', dish3_desc: 'هريس باذنجان مشوي وجبن كاشار وفوقه لحم بقري مطهو — كلاسيكي عثماني أصيل.',
  dish4_sub: 'نكهة متوسطية', dish4_desc: 'سمك البلطي الطازج من بحر إيجه، مطهو بزيت الزيتون والكبر والزيتون وطماطم الكرز.',

  chef_eyebrow: 'تعرّف على الشيف', chef_role: 'الشيف التنفيذي والمؤسس',
  chef_bio1: 'نشأ محمد علي بجوار موقد أبيه المتّقد في أضنة، وبدأ يقف بجانب الشواية منذ السابعة من عمره. بعد تخرجه من لو كوردون بلو في باريس والعمل مع مطاعم حاصلة على نجوم ميشلان، جاء إلى أنطاليا — وصنع أسطورة.',
  chef_bio2: 'دمج الشيف أكثر من 20 عاماً من الخبرة الطهوية مع تقنيات البحر الأبيض المتوسط التقليدية، ليحمل تقليد أوجاق باشي إلى المسرح العالمي. كل طبق يولد من ساعات الإعداد والمكونات المختارة بعناية والشغف العميق.',
  chef_awards_label: 'الجوائز والتقديرات',
  chef_quote: '«كل لهب قصة، وكل دخان ذكرى.»',

  gallery_eyebrow: 'المعرض', gallery_h1: 'أحسس', gallery_h2: 'بالأجواء',

  menu_eyebrow: 'القائمة', menu_h1: 'كل طبق', menu_h2: 'حكاية',
  menu_tab_starter: 'المقبلات', menu_tab_main: 'الأطباق الرئيسية',
  menu_tab_dessert: 'الحلويات', menu_tab_drinks: 'المشروبات',
  menu_empty: 'لا توجد عناصر في هذه الفئة بعد.',
  menu_footnote: 'الأسعار تشمل ضريبة القيمة المضافة · قد يتفاوت توفر المنتجات الموسمية',

  wine_eyebrow: 'تشكيلة المشروبات', wine_h1: 'نبيذ و', wine_h2: 'راكي',
  wine_desc: 'نتوّج مائدتكم بتشكيلتنا المختارة بعناية من النبيذ التركي والعالمي إلى جانب مجموعة الراكي التقليدية.',
  wine_raki_col: 'تشكيلة الراكي', wine_wines_col: 'تشكيلة النبيذ',
  wine_recommended: 'موصى به',
  wine_disclaimer: 'الكحول يضر بالصحة · يحظر بيع الكحول لمن هم دون 18 عاماً',

  res_eyebrow: 'الحجز', res_h1: 'احجز', res_h2: 'طاولتك',
  res_desc: 'نتطلع إلى تحضير تجربة حصرية لكم. ستتلقون تأكيداً خلال 24 ساعة من طلب الحجز.',
  res_name: 'الاسم الكامل', res_email: 'البريد الإلكتروني',
  res_phone: 'رقم الهاتف', res_party: 'عدد الأشخاص',
  res_time: 'اختر الوقت', res_notes: 'طلبات خاصة أو حساسيات أو ملاحظات',
  res_submit: 'إرسال طلب الحجز', res_submitting: 'جارٍ الإرسال…',
  res_success_h: 'شكراً لكم',
  res_success_msg: 'تم استلام طلب حجزكم. سنرسل تأكيداً إلى بريدكم الإلكتروني خلال 24 ساعة.',
  res_party_sizes: ['شخصان', '3 أشخاص', '4 أشخاص', '5–6 أشخاص', '7–8 أشخاص', '8+ أشخاص (خاص)'],
  res_privacy: 'معلوماتكم في أمان · لا نرسل رسائل مزعجة',
  res_label_phone: 'الهاتف', res_label_email: 'البريد الإلكتروني',
  res_label_hours: 'ساعات العمل', res_hours_value: 'الإثنين–الأحد · 19:00 – 00:00',

  loc_eyebrow: 'تواصل معنا', loc_h1: 'ابحث', loc_h2: 'عنّا',
  loc_label_address: 'العنوان', loc_label_phone: 'الهاتف',
  loc_label_email: 'البريد الإلكتروني', loc_label_hours: 'ساعات العمل',
  loc_hours_value: 'الإثنين – الأحد\n19:00 – 00:00', loc_follow: 'تابعونا',

  footer_tagline: 'تجربة طعام فاخرة لا مثيل لها في قلب البحر الأبيض المتوسط، حيث تلتقي النار والنكهة.',
  footer_pages: 'الصفحات', footer_contact: 'تواصل معنا',
  footer_copy: 'جميع الحقوق محفوظة', footer_finedining: 'مطعم فاخر · أنطاليا · تركيا',
  footer_privacy: 'سياسة الخصوصية', footer_terms: 'شروط الاستخدام',
};

// ─── RUSSIAN ──────────────────────────────────────────────────────────────────
const ru: Translations = {
  locale: 'ru', dir: 'ltr', langLabel: 'RU',
  nav_story: 'История', nav_menu: 'Меню', nav_chef: 'Шеф-повар',
  nav_gallery: 'Галерея', nav_contact: 'Контакты', nav_reservation: 'Бронирование',

  hero_eyebrow: 'Ширинялы · Анталья · Турция',
  hero_tagline: 'Там, где огонь и вкус встречаются в сердце Средиземноморья',
  hero_cta_primary: 'Забронировать стол', hero_cta_secondary: 'Открыть меню',
  hero_scroll: 'Открыть', hero_corner_left: 'Изысканная кухня',
  hero_corner_right: 'Муратпаша · Анталья',

  story_eyebrow: 'Наша история', story_h1: 'Мастер', story_h2: 'огня,',
  story_h3: 'Архитектор', story_h4: 'вкуса',
  story_body1: 'ÂLÂ Ocakbaşı открыл свои двери в Ширинялы, в сердце живописного средиземноморского побережья Антальи, с мечтой представить средиземноморскую кухню в самом чистом виде. В каждом блюде — история, в каждом пламени — искусство.',
  story_body2: 'Шеф-повар Мехмет Али Озтурк, чьи корни уходят в огненные очаги Аданы, начал стоять рядом с отцом у гриля в возрасте семи лет. Окончив Le Cordon Bleu в Париже и проработав в ресторанах со звёздами Мишлен, он приехал в Анталью — и создал легенду.',
  story_body3: 'Сформированное тёплым средиземноморским духом Антальи, пространство представляет собой симфонию из необработанного бетона, тёмного дуба и золотых акцентов. Благодаря концепции открытой кухни гости могут наблюдать, как каждое блюдо рождается из рук шеф-повара.',
  story_founded: 'Основание', stat_years: 'Лет', stat_dishes: 'Авторских блюд',
  stat_tables: 'Частных столиков', stat_awards: 'Наград',

  dishes_eyebrow: 'Авторские блюда', dishes_h1: 'Лучшее', dishes_h2: 'с очага',
  dishes_view_all: 'Полное меню', dishes_details: 'Подробнее →',
  tag_chef: 'Выбор шефа', tag_slow: 'Часы приготовления',
  tag_traditional: 'Традиционное', tag_fresh: 'Ежедневно свежее',
  dish1_sub: 'Авторский кебаб', dish1_desc: 'Говяжий фарш ручной рубки, специальное пряное масло, жареный перец и свежие травы — кебаб с подписью шеф-повара.',
  dish2_sub: 'Особое приготовление', dish2_desc: 'Бараний окорок, маринованный 18 часов, медленно приготовленный в тандыре с дикими травами и соусом из красного вина.',
  dish3_sub: 'Османское наследие', dish3_desc: 'Пюре из жареных баклажанов, сыр кашар с тушёной говядиной сверху — османская классика.',
  dish4_sub: 'Средиземноморский вкус', dish4_desc: 'Свежий морской окунь из Эгейского моря, припущенный с оливковым маслом, каперсами, оливками и черри.',

  chef_eyebrow: 'Познакомьтесь с шефом', chef_role: 'Шеф-повар и основатель',
  chef_bio1: 'Мехмет Али вырос рядом с огненными очагами Аданы и начал стоять у отцовского гриля в семь лет. После окончания Le Cordon Bleu в Париже и сотрудничества с ресторанами Мишлен он приехал в Анталью — и создал легенду.',
  chef_bio2: 'Объединяя более 20 лет кулинарного опыта с традиционными средиземноморскими техниками, шеф вынес традицию очагбашы на мировую сцену. Каждая тарелка рождается из часов подготовки, тщательно отобранных ингредиентов и глубокой страсти.',
  chef_awards_label: 'Награды и признание',
  chef_quote: '«Каждый огонь — история; каждая струйка дыма — воспоминание.»',

  gallery_eyebrow: 'Галерея', gallery_h1: 'Почувствуйте', gallery_h2: 'атмосферу',

  menu_eyebrow: 'Меню', menu_h1: 'Каждое блюдо', menu_h2: 'история',
  menu_tab_starter: 'Закуски', menu_tab_main: 'Основные блюда',
  menu_tab_dessert: 'Десерты', menu_tab_drinks: 'Напитки',
  menu_empty: 'В этой категории пока нет блюд.',
  menu_footnote: 'Цены включают НДС · Сезонная доступность может варьироваться',

  wine_eyebrow: 'Напитки', wine_h1: 'Вино и', wine_h2: 'Ракы',
  wine_desc: 'Мы украшаем ваш стол тщательно подобранными турецкими и мировыми винами в сочетании с нашей традиционной коллекцией ракы.',
  wine_raki_col: 'Выбор ракы', wine_wines_col: 'Выбор вин',
  wine_recommended: 'Рекомендуем',
  wine_disclaimer: 'Алкоголь вреден для здоровья · Продажа алкоголя лицам до 18 лет запрещена',

  res_eyebrow: 'Бронирование', res_h1: 'Забронируйте', res_h2: 'Ваш стол',
  res_desc: 'Мы с нетерпением ждём возможности подготовить для вас эксклюзивный опыт. Вы получите подтверждение в течение 24 часов после запроса на бронирование.',
  res_name: 'ВАШЕ ПОЛНОЕ ИМЯ', res_email: 'ВАШ EMAIL',
  res_phone: 'ВАШ НОМЕР ТЕЛЕФОНА', res_party: 'КОЛИЧЕСТВО ГОСТЕЙ',
  res_time: 'ВЫБЕРИТЕ ВРЕМЯ', res_notes: 'ОСОБЫЕ ПОЖЕЛАНИЯ, АЛЛЕРГИИ ИЛИ ЗАМЕТКИ',
  res_submit: 'Отправить запрос на бронирование', res_submitting: 'Отправка…',
  res_success_h: 'Спасибо',
  res_success_msg: 'Ваш запрос на бронирование получен. Мы отправим подтверждение на ваш email в течение 24 часов.',
  res_party_sizes: ['2 человека', '3 человека', '4 человека', '5–6 человек', '7–8 человек', '8+ человек (Приватное)'],
  res_privacy: 'Ваши данные в безопасности · Без спама',
  res_label_phone: 'Телефон', res_label_email: 'Email',
  res_label_hours: 'Часы работы', res_hours_value: 'Пн–Вс · 19:00 – 00:00',

  loc_eyebrow: 'Свяжитесь с нами', loc_h1: 'Найдите', loc_h2: 'нас',
  loc_label_address: 'Адрес', loc_label_phone: 'Телефон',
  loc_label_email: 'Email', loc_label_hours: 'Часы работы',
  loc_hours_value: 'Понедельник – Воскресенье\n19:00 – 00:00', loc_follow: 'Подписывайтесь',

  footer_tagline: 'Несравненный опыт изысканной кухни в сердце Средиземноморья, где встречаются огонь и вкус.',
  footer_pages: 'Страницы', footer_contact: 'Контакты',
  footer_copy: 'Все права защищены', footer_finedining: 'Изысканная кухня · Анталья · Турция',
  footer_privacy: 'Политика конфиденциальности', footer_terms: 'Условия использования',
};

// ─── FRENCH ───────────────────────────────────────────────────────────────────
const fr: Translations = {
  locale: 'fr', dir: 'ltr', langLabel: 'FR',
  nav_story: 'Notre Histoire', nav_menu: 'Menu', nav_chef: 'Chef',
  nav_gallery: 'Galerie', nav_contact: 'Contact', nav_reservation: 'Réservation',

  hero_eyebrow: 'Şirinyalı · Antalya · Turquie',
  hero_tagline: 'Là où le feu et la saveur se rencontrent au cœur de la Méditerranée',
  hero_cta_primary: 'Réserver une table', hero_cta_secondary: 'Explorer le menu',
  hero_scroll: 'Découvrir', hero_corner_left: 'Fine Dining Experience',
  hero_corner_right: 'Muratpaşa · Antalya',

  story_eyebrow: 'Notre Histoire', story_h1: 'Maître', story_h2: 'du Feu,',
  story_h3: 'Architecte', story_h4: 'des Saveurs',
  story_body1: 'ÂLÂ Ocakbaşı a ouvert ses portes à Şirinyalı, au cœur du magnifique littoral méditerranéen d\'Antalya, avec le rêve de présenter la cuisine méditerranéenne dans sa forme la plus pure. Chaque plat recèle une histoire ; chaque flamme, une œuvre d\'art.',
  story_body2: 'Le chef Mehmet Ali Öztürk, dont les racines plongent dans les âtres ardents d\'Adana, a commencé à se tenir aux côtés du gril de son père à l\'âge de sept ans. Après l\'obtention de son diplôme du Cordon Bleu à Paris et sa collaboration avec des restaurants étoilés Michelin, il est venu à Antalya — et a créé une légende.',
  story_body3: 'Façonné par l\'âme méditerranéenne chaleureuse d\'Antalya, l\'espace est une symphonie de béton brut, de chêne sombre et d\'accents dorés. Grâce au concept de cuisine ouverte, les convives peuvent suivre chaque plat qui prend vie sous les mains du chef.',
  story_founded: 'Fondation', stat_years: 'Ans', stat_dishes: 'Plats signature',
  stat_tables: 'Tables privées', stat_awards: 'Récompenses',

  dishes_eyebrow: 'Plats Signature', dishes_h1: 'Les Plus Fins', dishes_h2: 'du Foyer',
  dishes_view_all: 'Voir le menu complet', dishes_details: 'Détails →',
  tag_chef: 'Sélection du Chef', tag_slow: 'Des heures de préparation',
  tag_traditional: 'Traditionnel', tag_fresh: 'Frais du jour',
  dish1_sub: 'Kebab signature', dish1_desc: 'Bœuf haché à la main, beurre épicé spécial, poivrons rôtis et herbes fraîches — le kebab signature du chef.',
  dish2_sub: 'Préparation spéciale', dish2_desc: 'Gigot d\'agneau mariné 18 heures, cuit lentement au tandoor avec des herbes sauvages et une sauce au vin rouge.',
  dish3_sub: 'Héritage ottoman', dish3_desc: 'Purée d\'aubergines rôties, fromage kaşar, garnie de bœuf braisé — un classique ottoman.',
  dish4_sub: 'Saveur méditerranéenne', dish4_desc: 'Bar frais de la mer Égée, poché à l\'huile d\'olive, câpres, olives et tomates cerises.',

  chef_eyebrow: 'Rencontrez le Chef', chef_role: 'Chef Exécutif & Fondateur',
  chef_bio1: 'Mehmet Ali a grandi auprès des foyers ardents d\'Adana et a commencé à se tenir à côté du gril de son père à l\'âge de sept ans. Après l\'obtention de son diplôme du Cordon Bleu à Paris et sa collaboration avec des restaurants étoilés Michelin, il est venu à Antalya — et a créé une légende.',
  chef_bio2: 'Mêlant plus de 20 ans d\'expérience culinaire aux techniques méditerranéennes traditionnelles, le chef a porté la tradition de l\'ocakbaşı sur la scène mondiale. Chaque assiette naît d\'heures de préparation, d\'ingrédients soigneusement sélectionnés et d\'une passion profonde.',
  chef_awards_label: 'Prix & Reconnaissances',
  chef_quote: '« Chaque flamme est une histoire ; chaque volute de fumée, un souvenir. »',

  gallery_eyebrow: 'Galerie', gallery_h1: 'Ressentez', gallery_h2: 'l\'Atmosphère',

  menu_eyebrow: 'Menu', menu_h1: 'Chaque Assiette', menu_h2: 'une Histoire',
  menu_tab_starter: 'Entrées', menu_tab_main: 'Plats principaux',
  menu_tab_dessert: 'Desserts', menu_tab_drinks: 'Boissons',
  menu_empty: 'Aucun article dans cette catégorie pour l\'instant.',
  menu_footnote: 'Prix TTC · La disponibilité saisonnelle peut varier',

  wine_eyebrow: 'Sélection de Boissons', wine_h1: 'Vin &', wine_h2: 'Rakı',
  wine_desc: 'Nous couronons votre table d\'une sélection soigneusement choisie de vins turcs et internationaux aux côtés de notre collection traditionnelle de rakı.',
  wine_raki_col: 'Sélection de Rakı', wine_wines_col: 'Sélection de Vins',
  wine_recommended: 'Recommandé',
  wine_disclaimer: 'L\'alcool est dangereux pour la santé · La vente d\'alcool aux moins de 18 ans est interdite',

  res_eyebrow: 'Réservation', res_h1: 'Réservez', res_h2: 'Votre Table',
  res_desc: 'Nous nous réjouissons de préparer une expérience exclusive pour vous. Vous recevrez une confirmation dans les 24 heures suivant votre demande de réservation.',
  res_name: 'VOTRE NOM COMPLET', res_email: 'VOTRE ADRESSE EMAIL',
  res_phone: 'VOTRE NUMÉRO DE TÉLÉPHONE', res_party: 'NOMBRE DE CONVIVES',
  res_time: 'CHOISIR L\'HEURE', res_notes: 'DEMANDES SPÉCIALES, ALLERGIES OU NOTES',
  res_submit: 'Envoyer la demande de réservation', res_submitting: 'Envoi en cours…',
  res_success_h: 'Merci',
  res_success_msg: 'Votre demande de réservation a été reçue. Nous vous enverrons une confirmation à votre email dans les 24 heures.',
  res_party_sizes: ['2 personnes', '3 personnes', '4 personnes', '5–6 personnes', '7–8 personnes', '8+ personnes (Privé)'],
  res_privacy: 'Vos informations sont sécurisées · Pas de spam',
  res_label_phone: 'Téléphone', res_label_email: 'Email',
  res_label_hours: 'Heures d\'ouverture', res_hours_value: 'Lun–Dim · 19h00 – 00h00',

  loc_eyebrow: 'Nous Contacter', loc_h1: 'Trouvez-', loc_h2: 'nous',
  loc_label_address: 'Adresse', loc_label_phone: 'Téléphone',
  loc_label_email: 'Email', loc_label_hours: 'Heures d\'ouverture',
  loc_hours_value: 'Lundi – Dimanche\n19:00 – 00:00', loc_follow: 'Suivez-nous',

  footer_tagline: 'Une expérience de fine dining incomparable au cœur de la Méditerranée, là où le feu et la saveur convergent.',
  footer_pages: 'Pages', footer_contact: 'Contact',
  footer_copy: 'Tous droits réservés', footer_finedining: 'Fine Dining · Antalya · Turquie',
  footer_privacy: 'Politique de confidentialité', footer_terms: 'Conditions d\'utilisation',
};

// ─── Lookup ───────────────────────────────────────────────────────────────────
const map: Record<Locale, Translations> = { tr, en, de, ar, ru, fr };

export function getTranslations(locale: string): Translations {
  return map[(locale as Locale)] ?? tr;
}
