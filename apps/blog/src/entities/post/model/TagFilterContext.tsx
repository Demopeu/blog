'use client';

import { createContext, useState, useCallback } from 'react';

interface TagFilterContextValue {
  selectedTags: Set<string>;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
}

export const TagFilterContext = createContext<TagFilterContextValue | null>(
  null
);

export function TagFilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }, []);

  const clearTags = useCallback(() => {
    setSelectedTags(new Set());
  }, []);

  const value: TagFilterContextValue = {
    selectedTags,
    toggleTag,
    clearTags,
  };

  return <TagFilterContext value={value}>{children}</TagFilterContext>;
}
