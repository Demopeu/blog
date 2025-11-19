import { Home, FileText, NotebookPen } from 'lucide-react';
import { Github } from '@repo/ui/icon';

export const iconMap = {
  home: Home,
  resume: FileText,
  blog: NotebookPen,
  github: Github,
} as const;
