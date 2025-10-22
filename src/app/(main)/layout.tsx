import { MainHeader } from '@/widgets';
import { Particles } from '@/shared/motion';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flow-root">
      <div className="fixed inset-0 z-0 h-full w-full">
        <Particles
          particleColors={['#ffffff', '#4f39f6']}
          particleCount={400}
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
