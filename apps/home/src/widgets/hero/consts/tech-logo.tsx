import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrettier,
  SiPnpm,
  SiTurborepo,
  SiShadcnui,
} from 'react-icons/si';
import Image from 'next/image';

export type TechLogo = {
  node: React.ReactNode;
  title: string;
  href: string;
};

export const techLogos: TechLogo[] = [
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
  { node: <SiTurborepo />, title: 'Turborepo', href: 'https://turborepo.org' },
  { node: <SiShadcnui />, title: 'Shadcn UI', href: 'https://ui.shadcn.com' },
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
      <div className="h-15 flex items-center justify-center">
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
