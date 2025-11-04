"use client";

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

const FlowingMenuContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={className}>{children}</div>;
};
  

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], groups, className, enableLink = true }) => {
  const resolvedGroups = React.useMemo(() => {
    if (groups && groups.length) {
      const first = (groups as Group[])[0];
      if (Array.isArray(first)) {
        return (groups as MenuEntry[][]).map((entries) => ({ entries })) as Group[];
      }
      return groups as Group[];
    }
    if (items && items.length) return items.map((it) => ({ entries: [it] })) as Group[];
    return [] as Group[];
  }, [groups, items]);

  return (
    <FlowingMenuContainer className={className}>
      <div className="w-full h-full overflow-hidden">
        <nav className="flex flex-col h-full m-0 p-0">
          {resolvedGroups.map(({ entries, title }, idx) => (
            <MenuItem key={idx} entries={entries} title={title} enableLink={enableLink} />
          ))}
        </nav>
      </div>
    </FlowingMenuContainer>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ entries, enableLink = true, title }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    gsap.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' });
    gsap.set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
    gsap.to([marqueeRef.current, marqueeInnerRef.current], { y: '0%', ...animationDefaults });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    gsap.timeline({ defaults: animationDefaults })
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
              <span className="text-background uppercase font-black text-4xl md:text-5xl leading-[1] text-center ml-[2vw]">{e.text}</span>
              <div className='w-20'>
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
      className="flex-1 relative overflow-hidden text-center shadow-[0_-3px]"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {enableLink && !title && entries[0]?.link ? (
        <a
          className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-background text-[4vh] hover:text-foreground focus:text-foreground focus-visible:text-foreground"
          href={entries[0].link}
        >
          {displayText}
        </a>
      ) : (
        <span className="flex items-center justify-center h-full relative uppercase font-black text-foreground text-4xl md:text-5xl">
          {displayText}
        </span>
      )}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-foreground translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
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
