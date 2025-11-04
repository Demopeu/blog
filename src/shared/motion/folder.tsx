'use client';

import React, { useEffect, useState } from 'react';

interface FolderProps {
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const Folder: React.FC<FolderProps> = ({
  size = 1,
  items = [],
  className = '',
}) => {
  const maxItems = Math.min(3, items.length);
  const papers = items.slice(0, maxItems);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    []
  );

  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = Array.from(
        { length: maxItems },
        (_, k) => prev[k] ?? { x: 0, y: 0 }
      );
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = Array.from(
        { length: maxItems },
        (_, k) => prev[k] ?? { x: 0, y: 0 }
      );
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const scaleStyle: React.CSSProperties = {
    transform: `scale(${size})`,
    transformOrigin: 'top left',
    width: `${100 / size}%`,
  };

  const getOpenTransform = (index: number, count: number) => {
    if (count <= 1) {
      return 'translate(-50%, -90%) rotate(0deg)';
    }
    if (count === 2) {
      return index === 0
        ? 'translate(-100%, -80%) rotate(-12deg)'
        : 'translate(0%, -80%) rotate(12deg)';
    }
    if (count >= 3) {
      if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
      if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
      if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    }
    return '';
  };

  return (
    <div
      className={` ${open ? 'mt-40' : ''} mx-auto mt-4 mb-4 w-2/3 hover:mb-0 ${className}`}
    >
      <div style={scaleStyle}>
        <div
          className={`group relative cursor-pointer transition-all duration-200 ease-in ${
            !open ? 'hover:-translate-y-2' : ''
          }`}
          style={{
            transform: open ? 'translateY(-8px)' : undefined,
          }}
          onClick={handleClick}
        >
          <div className="rounded-tl-0 bg-highlight relative aspect-[5/4] w-full rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]">
            <span className="rounded-bl-0 rounded-br-0 bg-highlight absolute bottom-[98%] left-0 z-0 h-[12.5%] w-[30%] rounded-tl-[5px] rounded-tr-[5px]"></span>
            {papers.map((item, i) => {
              let sizeClasses = '';
              if (i === 0)
                sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';
              if (i === 1)
                sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
              if (i === 2)
                sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';

              const transformStyle = open
                ? `${getOpenTransform(i, papers.length)} translate(${paperOffsets[i]?.x ?? 0}px, ${paperOffsets[i]?.y ?? 0}px)`
                : undefined;

              return (
                <div
                  key={i}
                  onMouseMove={(e) => handlePaperMouseMove(e, i)}
                  onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                  className={`absolute bottom-[10%] left-1/2 z-20 transition-all duration-300 ease-in-out ${
                    !open
                      ? '-translate-x-1/2 translate-y-[10%] transform group-hover:translate-y-0'
                      : 'hover:scale-110'
                  } ${sizeClasses} bg-foreground/90 text-background 3xl:text-3xl p-3 text-center text-2xl font-bold break-keep whitespace-normal md:p-4 md:text-xs lg:text-lg xl:text-xl 2xl:text-2xl`}
                  style={{
                    ...(!open ? {} : { transform: transformStyle }),
                    borderRadius: '10px',
                  }}
                >
                  {item}
                </div>
              );
            })}
            <div
              className={`absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out ${
                !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
              } bg-highlight`}
              style={{
                borderRadius: '5px 10px 10px 10px',
                ...(open && { transform: 'skew(15deg) scaleY(0.6)' }),
              }}
            ></div>
            <div
              className={`absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out ${
                !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
              } bg-highlight`}
              style={{
                borderRadius: '5px 10px 10px 10px',
                ...(open && { transform: 'skew(-15deg) scaleY(0.6)' }),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
