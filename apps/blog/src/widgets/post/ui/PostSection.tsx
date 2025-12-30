import { BackNav } from './BackNav';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import { PostMeta } from './PostMeta';
import { Post } from '@/entities/post';
import { renderMarkdown } from '@/shared/lib/render-markdown';
import { PostStructuredData } from '@/shared/seo/PostStructuredData';

export async function PostSection({ post }: { post: Post }) {
  const contentHtml = await renderMarkdown(post.content_md);
  return (
    <>
      <PostStructuredData post={post} />
      <section className="mx-auto max-w-5xl py-8">
        <BackNav />
        <article className="space-y-8">
          <PostHeader src={post.src} title={post.title} />
          <PostMeta category={post.category} tags={post.tags} />
          <PostContent contentHtml={contentHtml} />
        </article>
      </section>
    </>
  );
}
