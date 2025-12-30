export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Demopeu(김동현)',
    'url': 'https://demopeu.vercel.app',
    'image': 'https://demopeu.vercel.app/my_profile.jpg',
    'jobTitle': 'Frontend Developer',
    'worksFor': {
      '@type': 'Organization',
      'name': 'Self-Employed',
    },
    'sameAs': ['https://github.com/Demopeu'],
    'description':
      'Frontend 개발자 김동현의 직접 만들고 기술을 시험해보는 블로그',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
