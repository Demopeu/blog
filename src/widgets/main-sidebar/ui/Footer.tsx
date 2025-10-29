import { SidebarFooter } from '@/shared/ui';
import {Github} from '@/shared/icon';

export function Footer() {
  return <SidebarFooter>
    <Github className="size-6 mt-1" aria-hidden />
  </SidebarFooter>;
}
