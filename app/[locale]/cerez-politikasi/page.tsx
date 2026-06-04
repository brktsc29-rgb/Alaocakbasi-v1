import Link from 'next/link';
import { getLegal } from '@/locales/legal';

export default function CerezPolitikasiPage({ params }: { params: { locale: string } }) {
  const l = getLegal(params.locale);
  const c = l.cookie;

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
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">{c.eyebrow}</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            {c.title1} <br />
            <span className="italic text-luxury-gold">{c.title2}</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">{l.lastUpdated}: {c.lastUpdated}</p>
        </div>

        <div className="space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">
          {c.sections.map((section, idx) => (
            <section key={section.heading}>
              <h2 className="font-instrument text-2xl text-luxury-cream mb-4">{section.heading}</h2>

              {/* Contact section: inline email link */}
              {idx === 3 ? (
                <p>
                  {section.body?.split('alaocakbasiantalya@gmail.com')[0]}
                  <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                    alaocakbasiantalya@gmail.com
                  </a>
                </p>
              ) : /* Cookie types section */
              section.types ? (
                <div className="space-y-6 mt-4">
                  {section.types.map((item) => (
                    <div key={item.type} className="pl-4 border-l border-luxury-gold/20">
                      <p className="text-luxury-gold text-sm font-medium mb-1">{item.type}</p>
                      <p className="text-luxury-cream/60 text-sm mb-1">{item.desc}</p>
                      <p className="text-luxury-cream/30 text-xs">
                        {params.locale === 'tr' ? 'Örnek' : params.locale === 'de' ? 'Beispiel' : params.locale === 'ar' ? 'مثال' : params.locale === 'ru' ? 'Пример' : params.locale === 'fr' ? 'Exemple' : 'Example'}: {item.examples}
                      </p>
                    </div>
                  ))}
                </div>
              ) : /* Manage section: body + list */
              section.list ? (
                <>
                  {section.body && <p>{section.body}</p>}
                  <ul className="list-none space-y-2 mt-4 pl-0">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                section.body && <p>{section.body}</p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-luxury-gold/10 flex flex-wrap gap-6">
          <Link href={`/${params.locale}/gizlilik`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            {l.privacyLabel}
          </Link>
          <Link href={`/${params.locale}/kullanim-kosullari`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            {l.termsLabel}
          </Link>
          <Link href={`/${params.locale}`}
            className="text-luxury-cream/40 hover:text-luxury-gold text-xs tracking-[0.3em] uppercase font-inter transition-colors duration-300">
            {l.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
