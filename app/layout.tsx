import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ALA Ocakbaşı — Akdeniz'in Kalbinde Ateşin ve Lezzetin Buluştuğu Yer",
  description:
    'İstanbul\'un kalbinde, Akdeniz mutfağının en seçkin lezzetlerini sunan ALA Ocakbaşı. Açık ateş üzerinde pişirilen imza yemekler, özel şarap koleksiyonu ve eşsiz bir deneyim.',
  keywords: 'ALA Ocakbaşı, İstanbul restoran, Akdeniz mutfağı, fine dining, kebap, ocakbaşı, lüks restoran',
  openGraph: {
    title: 'ALA Ocakbaşı',
    description: 'Akdeniz\'in Kalbinde Ateşin ve Lezzetin Buluştuğu Yer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-luxury-black text-luxury-cream font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
