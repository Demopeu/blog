import { ModeToggle } from '@/components/theme-toggle';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <main className="min-h-dvh p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">shadcn + next-themes 데모</h1>
        <ModeToggle />
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>빠른 시작</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              다크/라이트 모드는 우상단 버튼으로 전환할 수 있어요.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="outline">shadcn/ui</Badge>
              <Badge>Tailwind v4</Badge>
            </div>
            <div className="flex gap-2">
              <Input placeholder="아무거나 입력…" />
              <Button>액션</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>상태 예시</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              shadcn 컴포넌트가 테마 토큰을 자동으로 따라가서, 다크/라이트 전환
              시 색이 함께 바뀝니다.
            </p>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
