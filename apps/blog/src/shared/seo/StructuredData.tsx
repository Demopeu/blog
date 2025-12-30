export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': '井 블로그 - 개발 이야기',
    'description':
      'Frontend 개발자 김동현의 기술 블로그. Next.js, React, TypeScript 등 웹 개발 경험을 공유합니다.',
    'url': 'https://demopeu.vercel.app/blog',
    'author': {
      '@type': 'Person',
      'name': 'Demopeu(김동현)',
      'url': 'https://github.com/Demopeu',
      'jobTitle': 'Frontend Developer',
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Demopeu(김동현)',
      'url': 'https://demopeu.vercel.app',
    },
    'inLanguage': 'ko-KR',
    'keywords':
      'Frontend, Next.js, React, TypeScript, 웹 개발, 개발 블로그, 기술 블로그',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
