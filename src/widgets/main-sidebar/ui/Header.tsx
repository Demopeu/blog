import { SidebarHeader } from '@/shared/ui/shadcn';
import { HoverImage } from '@/widgets/main-sidebar/ui/HoverImage';

export function Header() {
  return (
    <SidebarHeader className="flex-row items-center justify-between gap-0 p-4">
      <div className="flex w-full border-b-2">
        <HoverImage src="/dummy.png" srcHover="/dummy2.png" />
        <div className="my-auto ml-1">
          <h1 className="text-xl font-semibold tracking-tight">
            <b>井</b>에서의 개발일지
          </h1>
          <p className="text-muted-foreground text-sm">Demopeu</p>
        </div>
      </div>
    </SidebarHeader>
  );
}
