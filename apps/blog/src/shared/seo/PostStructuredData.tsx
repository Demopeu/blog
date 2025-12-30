import type { Post } from '@/entities/post';

export function PostStructuredData({ post }: { post: Post }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.description,
    'image': post.src,
    'datePublished': post.published_at,
    'dateModified': post.published_at,
    'author': {
      '@type': 'Person',
      'name': 'Demopeu(김동현)',
      'url': 'https://github.com/Demopeu',
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Demopeu(김동현)',
      'url': 'https://demopeu.vercel.app',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://demopeu.vercel.app/blog/post/${post.category}/${post.slug}`,
    },
    'keywords': post.tags.join(', '),
    'articleSection': post.category,
    'inLanguage': 'ko-KR',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
