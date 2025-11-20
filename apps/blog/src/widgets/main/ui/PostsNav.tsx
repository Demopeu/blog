'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { categories } from '../consts/nav';

export function PostsNav() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const activeIndex = categories.findIndex((cat) => cat.href === pathname);
    if (activeIndex === -1) return;

    const activeButton = navRef.current.children[activeIndex] as HTMLElement;
    if (!activeButton) return;

    setIndicatorStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    });
  }, [pathname]);

  return (
    <nav className="relative border-b">
      <div ref={navRef} className="flex gap-8">
        {categories.map((category) => {
          const isActive = pathname === category.href;
          return (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                'text-muted-foreground hover:text-foreground relative px-5 py-4 text-base font-medium transition-colors hover:scale-105 md:px-3',
                isActive ? 'text-foreground' : ''
              )}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
      {/* 슬라이딩 바 */}
      <div
        className="bg-highlight absolute bottom-0 h-1 transition-all duration-300 ease-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </nav>
  );
}
