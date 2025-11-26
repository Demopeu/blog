interface PostContentProps {
  contentHtml: string;
}

export function PostContent({ contentHtml }: PostContentProps) {
  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
