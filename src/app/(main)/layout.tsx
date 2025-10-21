import { MainHeader } from '@/widgets/header';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
