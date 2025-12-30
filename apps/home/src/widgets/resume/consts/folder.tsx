import {
  Code2,
  BrainCircuit,
  Database,
  MonitorCog,
  ChartColumnStacked,
  Cpu,
  Trophy,
  Medal,
  type LucideIcon,
} from 'lucide-react';

export type FolderItem = {
  label: string;
  Icon?: LucideIcon;
};

export type FoldersProps = {
  title: string;
  items: FolderItem[];
};

export const foldersConfig: FoldersProps[] = [
  {
    title: 'Education',
    items: [
      { label: '데이터베이스', Icon: Database },
      { label: '인공지능응용', Icon: BrainCircuit },
      { label: '컴퓨터 프로그래밍', Icon: Code2 },
    ],
  },
  {
    title: 'Licenses',
    items: [
      { label: 'ADsP', Icon: ChartColumnStacked },
      { label: '컴퓨터 활용능력', Icon: Cpu },
      { label: '정보처리기사', Icon: MonitorCog },
    ],
  },
  {
    title: 'Awards',
    items: [
      { label: 'SSAFY 부울경 우수상', Icon: Trophy },
      {
        label: '스파로스 기업연계 우수상',
        Icon: Medal,
      },
    ],
  },
];
