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
    <div className="w-80 md:w-128 lg:w-160">
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
