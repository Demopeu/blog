export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="border-highlight border-l-5 pl-2 text-2xl font-black md:text-3xl md:pl-4">
      {title}
    </h2>
  );
}
