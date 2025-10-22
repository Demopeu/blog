import { LogoLoop } from '@/shared/motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrettier,
  SiPnpm,
} from 'react-icons/si';
import Image from 'next/image';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  {
    node: <SiTypescript />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  { node: <SiPrettier />, title: 'Prettier', href: 'https://prettier.io' },
  { node: <SiPnpm />, title: 'pnpm', href: 'https://pnpm.io' },
  {
    node: (
      <Image
        src="/logo/ssgoi-logo.webp"
        alt="@ssgoi/react"
        width={48}
        height={48}
      />
    ),
    title: '@ssgoi/react',
    href: 'https://ssgoi.dev/ko/',
  },
  {
    node: (
      <Image src="/logo/husky-logo.png" alt="husky" width={48} height={48} />
    ),
    title: 'husky',
    href: 'https://typicode.github.io/husky/',
  },
  {
    node: (
      <Image src="/logo/embla-logo.svg" alt="embla" width={48} height={48} />
    ),
    title: 'embla-carousel',
    href: 'https://www.embla-carousel.com/',
  },
  {
    node: (
      <div className="flex h-15 items-center justify-center">
        <Image
          src="/logo/fsd-logo.png"
          alt="feature-sliced design"
          width={48}
          height={48}
        />
      </div>
    ),
    title: 'feature-sliced design',
    href: 'https://feature-sliced.design/kr/',
  },
];

export default function UseStackLogoLoop() {
  return (
    <div className="w-160">
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
