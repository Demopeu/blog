import { infoConfig } from '../consts/info';
import Link from 'next/link';
import { Github } from '@/shared/icon';

export function MainFooter() {
  return (
    <footer className="px-bgx border-t-foreground/50 py-sgx inset-x-0 mt-auto hidden w-full items-center justify-between border-t md:flex">
      <div className="space-y-2">
        <p className="text-foreground/50 text-sm font-semibold">
          {infoConfig.naver}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="https://github.com/demopeu">
          <Github className="size-8" aria-hidden />
        </Link>
      </div>
      <p className="text-foreground/50 text-xs">
        © 2025 Demopeu. All rights reserved.
      </p>
    </footer>
  );
}
