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
  title: 'ÂLÂ Ocakbaşı',
  description: 'Fine Dining · Antalya',
  metadataBase: new URL('https://www.alaocakbasi.com.tr'),
  verification: {
    google: '_iisCXTGsbDCjDMAyllxo3FAvxGFt_vroYju0x7Mi_w',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${instrumentSerif.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-luxury-black text-luxury-cream font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
