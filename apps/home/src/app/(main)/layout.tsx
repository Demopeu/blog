import { MainHeader } from '@/widgets/main-header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
