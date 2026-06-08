export default function RestaurantSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'ÂLÂ Ocakbaşı',
    image: 'https://www.alaocakbasi.com.tr/og-image.jpg',
    url: 'https://www.alaocakbasi.com.tr',
    telephone: '+905321756707',
    email: 'alaocakbasiantalya@gmail.com',
    description: 'Akdeniz\'in kalbinde, ateşin ve lezzetin buluştuğu eşsiz bir fine dining ocakbaşı deneyimi.',
    servesCuisine: ['Turkish', 'Mediterranean', 'Fine Dining'],
    priceRange: '₺₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1539. Sk. No:4',
      addressLocality: 'Şirinyalı, Muratpaşa',
      addressRegion: 'Antalya',
      postalCode: '07160',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.8574,
      longitude: 30.7344,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '19:00',
        closes: '00:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/alaocakbasi',
      'https://www.facebook.com/share/18iChwtzMT/',
    ],
    hasMap: 'https://maps.app.goo.gl/alaocakbasi',
    reservations: 'https://www.alaocakbasi.com.tr/tr#reservation',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
