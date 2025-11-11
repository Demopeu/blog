// FlipFaceImage.tsx
"use client";

import Image from "next/image";

type FlipFaceImageProps = {
  src: string;
  alt: string;
  back?: boolean;              // 뒷면이면 true → rotate-y-180
  onClick?: () => void;        // 클릭 시 토글
};

export function FlipFaceImage({ src, alt, back, onClick }: FlipFaceImageProps) {
  return (
    <div
      className={[
        "absolute inset-0 overflow-hidden rounded-lg",
        "[backface-visibility:hidden]",
        back ? "rotate-y-180" : "",
      ].join(" ")}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-pressed={!!back}
      // 클릭 가능 표시 및 드래그 선택 방지
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {/* 1:1 비율로 꽉 채우고 넘치는 부분은 자르기 */}
      <div className="relative w-full aspect-square">
        <Image src={src} alt={alt} fill className="object-cover" draggable={false} />
      </div>
    </div>
  );
}
