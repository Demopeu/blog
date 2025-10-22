import { MainHeader } from '@/widgets';
import { Particles } from '@/shared/motion';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flow-root">
      <div className="fixed inset-0 z-0 h-full w-full">
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
      <div className="relative z-10">
        <MainHeader />
        {children}
      </div>
    </div>
  );
}
