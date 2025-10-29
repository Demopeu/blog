import { Home, FileText, NotebookPen } from 'lucide-react';
import { Github } from '@/shared/icon';

export const iconMap = {
  home: Home,
  resume: FileText,
  blog: NotebookPen,
  github: Github,
} as const;