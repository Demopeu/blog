'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { categories } from '../consts/nav';

export function PostsNav() {
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const activeIndex = categories.findIndex((cat) => cat.href === pathname);
    if (activeIndex === -1) return;

    const activeItem = itemsRef.current[activeIndex];
    if (!activeItem || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    setIndicatorStyle({
      left:
        itemRect.left - containerRect.left + containerRef.current.scrollLeft,
      width: activeItem.offsetWidth,
    });
  }, [pathname]);

  const checkScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const scrollAmount = 200;
    const newScrollLeft =
      direction === 'left'
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount;

    containerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', () => {
      updateIndicator();
      checkScroll();
    });
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator, checkScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    container.addEventListener('scroll', updateIndicator);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      container.removeEventListener('scroll', updateIndicator);
    };
  }, [checkScroll, updateIndicator]);

  return (
    <nav className="relative border-b">
      <div className="relative">
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="from-background via-background absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gradient-to-r to-transparent p-2 hover:opacity-80"
            aria-label="이전"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={containerRef}
          className={cn(
            'scrollbar-none relative flex gap-4 overflow-x-auto',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
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
                draggable={false}
              >
                {category.name}
              </Link>
            );
          })}
          <div
            className="bg-highlight pointer-events-none absolute bottom-0 h-1 transition-all duration-300 ease-out"
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
            }}
          />
        </div>

        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="from-background via-background absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gradient-to-l to-transparent p-2 hover:opacity-80"
            aria-label="다음"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </nav>
  );
}
