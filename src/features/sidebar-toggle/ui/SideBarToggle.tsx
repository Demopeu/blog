'use client';

import { useSidebar } from '@/shared/ui';
import { Button } from './Button';

export function SideBarToggle() {
  const { toggleSidebar, state } = useSidebar();
  const isOpen = state === 'expanded';

  return <Button isOpen={isOpen} onToggle={toggleSidebar} />;
}
