export type MainSliderProps = {
  title: string;
  description: string;
  Category: string;
  Tag: string[];
  src: string;
  id: number;
};

export const dummyMainSlider: MainSliderProps[] = [
  {
    title: 'embla library를 사용해보자.',
    description:
      '대충 설명을 아주 길게 하는 글. 엄청 엄청 길게 쓰면 ...이 되고 싶은 느낌이랄까 최대 3줄이상은 보여줘야할껏 같은 기분이랄까',
    Category: 'Tech',
    Tag: ['embla', 'library'],
    src: '/blog/posts/PROGRAMMERS.png',
    id: 1,
  },
  {
    title: '브라우저 인터페이스',
    description:
      '대충 설명을 아주 길게 하는 글. 엄청 엄청 길게 쓰면 ...이 되고 싶은 느낌이랄까 최대 3줄이상은 보여줘야할껏 같은 기분이랄까 대충 설명을 아주 길게 하는 글. 엄청 엄청 길게 쓰면 ...이 되고 싶은 느낌이랄까 최대 3줄이상은 보여줘야할껏 같은 기분이랄까',
    Category: 'CS',
    Tag: ['브라우저 인터페이스'],
    src: '/blog/posts/BAEKJOON.png',
    id: 2,
  },
  {
    title: '42627/디스크 컨트롤러/javascript',
    description:
      '대충 설명을 아주 길게 하는 글. 엄청 엄청 길게 쓰면 ...이 되고 싶은 느낌이랄까 최대 3줄이상은 보여줘야할껏 같은 기분이랄까',
    Category: '문제풀이',
    Tag: ['Algorithm', 'Programmers', 'javascript', 'heap'],
    src: '/blog/posts/PROGRAMMERS.png',
    id: 3,
  },
  {
    title: 'Turbo repo 설정 1',
    description:
      '대충 설명을 아주 길게 하는 글. 엄청 엄청 길게 쓰면 ...이 되고 싶은 느낌이랄까 최대 3줄이상은 보여줘야할껏 같은 기분이랄까',
    Category: 'Development',
    Tag: ['Turbo repo', '설정'],
    src: '/blog/posts/BAEKJOON.png',
    id: 4,
  },
];
