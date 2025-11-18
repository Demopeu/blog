import { LogoLoop } from '@/shared/motion';

export function UseStackLogoLoop({
  techLogos,
}: {
  techLogos: {
    node: React.ReactNode;
    title: string;
    href: string;
  }[];
}) {
  return (
    <div className="md:w-lg lg:w-160 w-72 sm:w-80">
      <LogoLoop
        logos={techLogos}
        speed={30}
        direction="left"
        logoHeight={44}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        ariaLabel="Technology partners"
        className="scrollbar-none"
      />
    </div>
  );
}
