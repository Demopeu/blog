interface PostMetaProps {
  category: string;
  tags: string[];
}

export function PostMeta({ category, tags }: PostMetaProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="bg-highlight text-highlight-foreground rounded-full px-3 py-1 text-sm font-medium">
        {category}
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
