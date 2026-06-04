import Link from 'next/link';
import { getLegal } from '@/locales/legal';

export default function GizlilikPage({ params }: { params: { locale: string } }) {
  const l = getLegal(params.locale);
  const p = l.privacy;

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
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-4 font-inter">{p.eyebrow}</p>
          <h1 className="font-instrument text-5xl md:text-6xl text-luxury-cream mb-4">
            {p.title1} <br />
            <span className="italic text-luxury-gold">{p.title2}</span>
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mt-6" />
          <p className="text-luxury-cream/40 text-xs font-inter mt-4">{l.lastUpdated}: {p.lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-12 font-inter font-light text-luxury-cream/70 leading-relaxed">
          {p.sections.map((section, idx) => (
            <section key={section.heading}>
              <h2 className="font-instrument text-2xl text-luxury-cream mb-4">{section.heading}</h2>

              {/* Section 0: Data controller — inline email link */}
              {idx === 0 ? (
                <p>
                  {section.body?.split('alaocakbasiantalya@gmail.com')[0]}
                  <a href="mailto:alaocakbasiantalya@gmail.com" className="text-luxury-gold">
                    alaocakbasiantalya@gmail.com
                  </a>
                </p>
              ) : /* Section 6: Rights — list + email */
              idx === 6 ? (
                <>
                  {section.body && <p>{section.body}</p>}
                  <ul className="list-none space-y-2 mt-4 pl-0">
                    {section.list?.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    {p.rightsEmail && (
                      <>
                        <a href={`mailto:${p.rightsEmail}`} className="text-luxury-gold">
                          {p.rightsEmail}
                        </a>
                      </>
                    )}
                  </p>
                </>
              ) : /* Sections with list */
              section.list ? (
                <>
                  {section.body && <p>{section.body}</p>}
                  <ul className="list-none space-y-2 mt-4 pl-0">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-luxury-gold mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                section.body && <p>{section.body}</p>
              )}
            </section>
          ))}

          {/* Cookie section */}
          <section>
            <h2 className="font-instrument text-2xl text-luxury-cream mb-4">
              {`${p.sections.length + 1}. ${p.cookiePolicyLabel}`}
            </h2>
            <p>
              {p.cookiePolicyText}{' '}
              <Link href={`/${params.locale}/cerez-politikasi`} className="text-luxury-gold hover:underline">
                {p.cookiePolicyLabel}
              </Link>
              .
            </p>
          </section>
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
