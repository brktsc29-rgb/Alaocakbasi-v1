'use client';

import { createContext, useContext } from 'react';
import { getTranslations, type Translations } from '@/locales/translations';

const I18nContext = createContext<Translations>(getTranslations('tr'));

export function I18nProvider({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: Translations;
}) {
  return (
    <I18nContext.Provider value={translations}>{children}</I18nContext.Provider>
  );
}

export function useT(): Translations {
  return useContext(I18nContext);
}
