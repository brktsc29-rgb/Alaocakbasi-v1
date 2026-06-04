import { LOCALES, getTranslations } from '@/locales/translations';
import { I18nProvider } from '@/contexts/I18nContext';
import HtmlAttributes from '@/components/HtmlAttributes';
import type { Metadata } from 'next';

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
  return {
    title: titles[locale] ?? titles['tr'],
    description: t.footer_tagline,
    openGraph: {
      title: 'ÂLÂ Ocakbaşı',
      description: t.hero_tagline,
      type: 'website',
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
      {children}
    </I18nProvider>
  );
}
