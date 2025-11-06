'use client';
import { Activity } from 'react';

type MultiActivityPaneProps<T extends string | number> = {
  active: T;
  types: readonly T[];
  render: (id: T) => React.ReactNode | null;
};

/**
 * MultiActivityPane — `<Activity>`로 여러 뷰를 숨김/표시.
 *
 * Props
 * - active: 현재 활성 id (T).
 * - types: 렌더 순서 id 배열 — 리터럴 유지하려면 `as const`.
 * - render(id): 해당 id의 노드 반환.
 *
 * 팁
 * - `types`는 모듈 상수/`useMemo([])`로 고정.
 * - 심볼 id 비권장(키 제약). 필요 시 문자열 변환.
 */
export function MultiActivityPane<T extends string | number>({
  active, types, render,
}: MultiActivityPaneProps<T>) {
  return (
    <>
      {types.map((id) => (
        <Activity key={String(id)} mode={active === id ? 'visible' : 'hidden'}>
          {render(id)}
        </Activity>
      ))}
    </>
  );
}
