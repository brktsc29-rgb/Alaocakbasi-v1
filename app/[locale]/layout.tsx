import { LOCALES, getTranslations } from '@/locales/translations';
import { I18nProvider } from '@/contexts/I18nContext';
import HtmlAttributes from '@/components/HtmlAttributes';
import RestaurantSchema from '@/components/RestaurantSchema';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.alaocakbasi.com.tr';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = getTranslations(locale);

  const titles: Record<string, string> = {
    tr: 'ÂLÂ Ocakbaşı — Akdeniz\'in Kalbinde Ateşin ve Lezzetin Buluştuğu Yer',
    en: 'ÂLÂ Ocakbaşı — Where Fire and Flavor Meet in the Heart of the Mediterranean',
    de: 'ÂLÂ Ocakbaşı — Wo Feuer und Geschmack im Herzen des Mittelmeers aufeinandertreffen',
    ar: 'آلا أوجاق باشي — حيث تلتقي النار والنكهة في قلب البحر الأبيض المتوسط',
    ru: 'ÂLÂ Ocakbaşı — Там, где огонь и вкус встречаются в сердце Средиземноморья',
    fr: 'ÂLÂ Ocakbaşı — Là où le feu et la saveur se rencontrent au cœur de la Méditerranée',
  };

  const descriptions: Record<string, string> = {
    tr: 'Antalya Şirinyalı\'da fine dining ocakbaşı deneyimi. Michelin eğitimli şef Mehmet Ali Öztürk\'ün imza yemekleri, seçkin şarap ve rakı listesi. Rezervasyon için arayın.',
    en: 'Fine dining ocakbaşı experience in Antalya Şirinyalı. Signature dishes by Michelin-trained chef Mehmet Ali Öztürk, curated wine and rakı selection. Book your table.',
    de: 'Fine-Dining-Ocakbaşı-Erlebnis in Antalya Şirinyalı. Signature-Gerichte von Michelin-ausgebildetem Küchenchef Mehmet Ali Öztürk. Jetzt reservieren.',
    ar: 'تجربة أوجاق باشي الفاخرة في شيرينيالي أنطاليا. أطباق مميزة للشيف محمد علي أوزتورك المدرب في مطاعم ميشلان. احجز طاولتك.',
    ru: 'Изысканный ресторан окакбашы в Ширинялы, Анталья. Авторские блюда шеф-повара Мехмета Али Озтурка с обучением Мишлен. Забронируйте столик.',
    fr: 'Restaurant ocakbaşı fine dining à Şirinyalı, Antalya. Plats signature du chef Mehmet Ali Öztürk formé Michelin. Réservez votre table.',
  };

  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title: titles[locale] ?? titles['tr'],
    description: descriptions[locale] ?? descriptions['tr'],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: titles[locale] ?? titles['tr'],
      description: descriptions[locale] ?? descriptions['tr'],
      url: canonicalUrl,
      siteName: 'ÂLÂ Ocakbaşı',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'ÂLÂ Ocakbaşı — Fine Dining Antalya',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] ?? titles['tr'],
      description: descriptions[locale] ?? descriptions['tr'],
      images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const translations = getTranslations(locale);

  return (
    <I18nProvider translations={translations}>
      <HtmlAttributes locale={locale} dir={translations.dir} />
      <RestaurantSchema />
      {children}
    </I18nProvider>
  );
}
