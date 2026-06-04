import dynamic from 'next/dynamic';
import { LOCALES } from '@/locales/translations';

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Story = dynamic(() => import('@/components/Story'));
const SignatureDishes = dynamic(() => import('@/components/SignatureDishes'));
const ChefExperience = dynamic(() => import('@/components/ChefExperience'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const MenuShowcase = dynamic(() => import('@/components/MenuShowcase'));
const WineRaki = dynamic(() => import('@/components/WineRaki'));
const Reservation = dynamic(() => import('@/components/Reservation'));
const Location = dynamic(() => import('@/components/Location'));
const Footer = dynamic(() => import('@/components/Footer'));

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navigation locale={params.locale} />
      <main>
        <Hero />
        <Story />
        <SignatureDishes />
        <ChefExperience />
        <Gallery />
        <MenuShowcase />
        <WineRaki />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}
