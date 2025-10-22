export function LogoText({ className }: { className?: string }) {
  return (
    <h1
      className={`group font-poppins inline-block text-4xl font-bold tracking-tight select-none ${className} min-w-60`}
    >
      <span className="text-foreground">{`<D`}</span>
      <span className="inline-block w-0 overflow-hidden align-bottom transition-[width] duration-500 ease-out group-hover:w-38">
        emopeu
      </span>
      <span className="text-foreground">{`/>`}</span>
    </h1>
  );
}
