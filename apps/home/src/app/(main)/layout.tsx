import { Particles } from '@repo/ui/react-bits';
import { SidebarProvider } from '@repo/ui/shadcn/sidebar';
import { MainFooter } from '@/widgets/main-footer';
import { MainHeader } from '@/widgets/main-header';
import { MainSidebar } from '@/widgets/main-sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Particles
          particleColors={['#000000', '#ffffff', '#4f39f6', '#eb4034']}
          particleCount={200}
          particleSpread={30}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <SidebarProvider defaultOpen={false} className="flex-col">
        <MainHeader />
        <MainSidebar />
        {children}
        <MainFooter />
      </SidebarProvider>
    </>
  );
}
