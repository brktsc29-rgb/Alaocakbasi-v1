import Link from 'next/link';
import { getLegal } from '@/locales/legal';

export default function KullanimKosullariPage({ params }: { params: { locale: string } }) {
  const l = getLegal(params.locale);
  const t = l.terms;

  return (
    <main className="min-h-screen bg-luxury-black text-luxury-cream">
      <div className="border-b border-luxury-gold/10 py-6 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/${params.locale}`} className="flex items-center gap-3">
            <span className="font-instrument italic text-luxury-gold text-2xl">ALA</span>
            <span className="w-px h-5 bg-luxury-gold/40" />
            <span className="font-instrument text-luxury-cream/80 text-sm tracking-[0.3em] uppercase">Ocakbaşı</span>
          </Link>
          <Link href={`/${params.locale}`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.2em] uppercase font-inter transition-colors duration-300">
            {l.back}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">{t.eyebrow}</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            {t.title1} <br />
            <span className="italic text-luxury-gold">{t.title2}</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">{l.lastUpdated}: {t.lastUpdated}</p>
        </div>

        <div className="space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">
          {t.sections.map((section, idx) => (
            <section key={section.heading}>
              <h2 className="font-instrument text-2xl text-luxury-cream mb-4">{section.heading}</h2>

              {/* Section 9 (idx=9): Contact — inline links */}
              {idx === 9 ? (
                <p>
                  {section.body?.split('alaocakbasiantalya@gmail.com')[0]}
                  <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                    alaocakbasiantalya@gmail.com
                  </a>
                  {section.body?.includes('+90') && (
                    <>
                      {section.body.split('alaocakbasiantalya@gmail.com')[1]?.split('+90 532 175 67 07')[0]}
                      <a href="https://wa.me/905321756707" target="_blank" rel="noopener noreferrer" className="text-luxury-gold">
                        +90 532 175 67 07
                      </a>
                    </>
                  )}
                </p>
              ) : /* Section 6 (idx=6): Privacy reference — inline link */
              idx === 6 ? (
                <p>
                  {section.body?.split(t.privacyLinkLabel)[0]}
                  <Link href={`/${params.locale}/gizlilik`} className="text-luxury-gold hover:underline">
                    {t.privacyLinkLabel}
                  </Link>
                  {section.body?.split(t.privacyLinkLabel)[1]}
                </p>
              ) : /* Sections with list */
              section.list ? (
                <ul className="list-none space-y-2 pl-0">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                section.body && <p>{section.body}</p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-luxury-gold/10">
          <Link href={`/${params.locale}`}
            className="inline-flex items-center gap-3 text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            {l.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
