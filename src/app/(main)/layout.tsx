import { MainHeader } from '@/widgets/main-header';
import { Particles } from '@/shared/motion';
import { SidebarProvider } from '@/shared/ui/shadcn';
import { MainSidebar } from '@/widgets/main-sidebar';
import { MainFooter } from '@/widgets/main-footer';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Particles
          particleColors={['#000000', '#ffffff', '#4f39f6', '#eb4034']}
          particleCount={500}
          particleSpread={30}
          speed={0.2}
          particleBaseSize={500}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <SidebarProvider defaultOpen={false} className="md:flex-col">
        <MainHeader />
        <MainSidebar />
        {children}
        <MainFooter />
      </SidebarProvider>
    </>
  );
}
