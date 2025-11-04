'use client';

import React from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface MenuEntry {
  link?: string;
  text: string;
  image: string;
}

interface MenuItemProps {
  entries: MenuEntry[];
  enableLink?: boolean;
  title?: string;
}

type Group = { title?: string; entries: MenuEntry[] };

interface FlowingMenuProps {
  items?: MenuEntry[];
  groups?: MenuEntry[][] | Group[];
  className?: string;
  enableLink?: boolean;
}

const FlowingMenuContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  groups,
  className,
  enableLink = true,
}) => {
  const resolvedGroups = React.useMemo(() => {
    if (groups && groups.length) {
      const first = (groups as Group[])[0];
      if (Array.isArray(first)) {
        return (groups as MenuEntry[][]).map((entries) => ({
          entries,
        })) as Group[];
      }
      return groups as Group[];
    }
    if (items && items.length)
      return items.map((it) => ({ entries: [it] })) as Group[];
    return [] as Group[];
  }, [groups, items]);

  return (
    <FlowingMenuContainer className={className}>
      <div className="h-full w-full overflow-hidden">
        <nav className="m-0 flex h-full flex-col p-0">
          {resolvedGroups.map(({ entries, title }, idx) => (
            <MenuItem
              key={idx}
              entries={entries}
              title={title}
              enableLink={enableLink}
            />
          ))}
        </nav>
      </div>
    </FlowingMenuContainer>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  entries,
  enableLink = true,
  title,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    gsap.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' });
    gsap.set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
    gsap.to([marqueeRef.current, marqueeInnerRef.current], {
      y: '0%',
      ...animationDefaults,
    });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .set(marqueeInnerRef.current, { y: 0 });
  };

  const displayText = title ?? entries[0]?.text ?? '';

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, loopIdx) => (
      <React.Fragment key={loopIdx}>
        {entries.map((e, idx) => (
          <React.Fragment key={`${loopIdx}-${idx}`}>
            <div className="flex items-center gap-[2vw]">
              <span className="text-background ml-[2vw] text-center text-4xl leading-[1] font-black uppercase md:text-5xl">
                {e.text}
              </span>
              <div className="w-20">
                <Image src={e.image} alt={e.text} width={200} height={200} />
              </div>
            </div>
          </React.Fragment>
        ))}
      </React.Fragment>
    ));
  }, [entries]);

  return (
    <div
      className="divide-foreground relative flex-1 divide-y-2 overflow-hidden text-center"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {enableLink && !title && entries[0]?.link ? (
        <a
          className="text-background hover:text-foreground focus:text-foreground focus-visible:text-foreground relative flex h-full cursor-pointer items-center justify-center text-[4vh] font-semibold uppercase no-underline"
          href={entries[0].link}
        >
          {displayText}
        </a>
      ) : (
        <span className="text-foreground relative flex h-full items-center justify-center text-4xl font-black uppercase md:text-5xl">
          {displayText}
        </span>
      )}
      <div
        className="bg-foreground pointer-events-none absolute top-0 left-0 h-full w-full translate-y-[101%] overflow-hidden"
        ref={marqueeRef}
      >
        <div className="flex h-full w-[200%]" ref={marqueeInnerRef}>
          <div className="animate-marquee relative flex h-full w-[200%] items-center will-change-transform">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };
