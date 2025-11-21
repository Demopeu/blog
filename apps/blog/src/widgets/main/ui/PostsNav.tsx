'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { categories } from '../consts/nav';

export function PostsNav() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const activeIndex = categories.findIndex((cat) => cat.href === pathname);
    if (activeIndex === -1) return;

    const activeItem = itemsRef.current[activeIndex];
    if (!activeItem) return;

    setIndicatorStyle({
      left: activeItem.offsetLeft,
      width: activeItem.offsetWidth,
    });
  }, [pathname]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <nav className="relative border-b">
      <div className="relative flex gap-4">
        {categories.map((category, index) => {
          const isActive = pathname === category.href;
          return (
            <Link
              key={category.href}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              href={category.href}
              className={cn(
                'text-muted-foreground hover:text-foreground whitespace-nowrap px-5 py-4 text-base font-medium transition-colors hover:scale-105',
                isActive ? 'text-foreground' : ''
              )}
            >
              {category.name}
            </Link>
          );
        })}
        {/* 슬라이딩 바 */}
        <div
          className="bg-highlight absolute bottom-0 h-1 transition-all duration-300 ease-out"
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.left}px)`,
          }}
        />
      </div>
    </nav>
  );
}
