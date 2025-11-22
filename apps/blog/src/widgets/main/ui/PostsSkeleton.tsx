export function PostsSkeleton() {
  return (
    <div className="mt-10 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-6 p-4">
          <div className="bg-muted h-48 w-60 shrink-0 animate-pulse rounded-2xl" />
          <div className="flex flex-1 flex-col justify-center space-y-3">
            <div className="bg-muted h-4 w-20 animate-pulse rounded" />
            <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
