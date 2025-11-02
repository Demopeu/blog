'use client';

import { useSidebar } from '@/shared/ui/shadcn';
import { Button } from './Button';

export function SideBarToggle({ className }: { className?: string }) {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : state === 'expanded';

  return (
    <Button isOpen={isOpen} onToggle={toggleSidebar} className={className} />
  );
}
