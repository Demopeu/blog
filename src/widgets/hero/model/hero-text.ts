type HeroText = {
  name: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string[];
  fourthLine: string;
  fifthLine: string[];
  sixthLine: string;
};

const name = '김동현';

export const heroText: HeroText = {
  name,
  firstLine: '오리엔탈 샐러드처럼',
  secondLine: '어우러지는',
  thirdLine: ['팀을', '코드를', '결과물을', '사용자 경험을'],
  fourthLine: '만드는 개발자🥗',
  fifthLine: ['FRONT-END 개발자', '입니다.'],
  sixthLine: '서비스의 흐름과 사용자 경험을 함께 설계하는 것을 지향합니다.',
};
