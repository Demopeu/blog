import { SidebarHeader } from '@/shared/ui';
import { HoverImage } from '@/widgets/main-sidebar/ui/HoverImage';

export function Header() {
  return <SidebarHeader className='p-4 flex-row justify-between items-center'>
    <div className='flex'>
      <HoverImage src='/dummy.png' srcHover='/dummy2.png'/>
      <div className='my-auto ml-1'>
        <h1 className='text-xl font-semibold tracking-tight'><b>井</b>에서의 개발일지</h1>
        <p className='text-sm text-muted-foreground'>Demopeu</p>
      </div>
    </div>
  </SidebarHeader>;
}
