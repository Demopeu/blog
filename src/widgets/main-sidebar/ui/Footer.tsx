import { SidebarFooter } from '@/shared/ui';
import { Github } from '@/shared/icon';
import Link from 'next/link';

export function Footer() {
  return (
    <SidebarFooter className="flex items-start p-4">
      <div className="ml-auto flex items-center justify-end">
        <Link href="https://github.com/demopeu">
          <Github className="size-6" aria-hidden />
        </Link>
      </div>
      <p className="text-foreground/50 text-xs">
        © 2025 Demopeu. All rights reserved.
      </p>
    </SidebarFooter>
  );
}
