type SkillEntry = {
  link?: string;
  text: string;
  image: string;
};

export type SkillGroup = {
  title?: string;
  entries: SkillEntry[];
};

export const SkillsGroups: SkillGroup[] = [
  {
    title: 'Core Stack',
    entries: [
      { link: '#', text: 'HTML5', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { link: '#', text: 'CSS3', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { link: '#', text: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { link: '#', text: 'TypeScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { link: '#', text: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
  },
  {
    title: 'Specialties',
    entries: [
      { link: '#', text: 'Next.js', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { link: '#', text: 'TailwindCSS', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { link: '#', text: 'Turborepo', image: '/logo/turborepo-logo.png' },
    ],
  },
  {
    title: 'AI',
    entries: [
      { link: '#', text: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { link: '#', text: 'PyTorch', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { link: '#', text: 'TensorFlow', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { link: '#', text: 'FastAPI', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { link: '#', text: 'Pandas', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { link: '#', text: 'NumPy', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { link: '#', text: 'OpenCV', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { link: '#', text: 'Gradio', image: '/logo/gradio-logo.png' },
    ],
  },
  {
    title: 'Etc.',
    entries: [
      { link: '#', text: 'Django', image: '/logo/django-logo.png' },
      { link: '#', text: 'Prettier', image: '/logo/prettier-logo.png' },
      { link: '#', text: 'ESLint', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg' },
      { link: '#', text: 'Husky', image: '/logo/husky-logo.png' },
      { link: '#', text: 'Electron', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg' },
      { link: '#', text: 'C++', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { link: '#', text: 'Java', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    ],
  },
];