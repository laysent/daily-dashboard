enum weekdays {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
};

interface food {
  name: string;
  weight: number;
  restrict?: {
    day?: Array<weekdays>;
    meal?: 'dinner' | 'lunch';
  };
}

const config: {
  video: {
    bilibili: Array<number>;
  };
  eating: Array<food>;
} = {
  video: {
    bilibili: [
      26875, // CAROLE & TUESDAY
      26146, // 多罗罗
      26801, // 鬼灭之刃
      25681, // JOJO的奇妙冒险 黄金之风
      26870, // 川柳少女
      26284, // 盾之勇者成名录
      26767, // 我们无法一起学习
      26802, // 皿三昧
      25615, // 魔偶马戏团
      26794, // 贤者之孙
      26818, // 一个人的〇〇小日子
    ],
  },
  eating: [
    {
      name: '牛丼',
      weight: 1 / 5,
    },
    {
      name: '鸡丼',
      weight: 1 / 5,
    },
    {
      name: '豚骨拉面',
      weight: 3 / 20,
    },
    {
      name: '鸭粉丝',
      weight: 1 / 10,
    },
    {
      name: '麦辣鸡腿堡',
      weight: 1 / 10,
      restrict: {
        meal: 'lunch',
      },
    },
    {
      name: '羊腿手抓饭',
      weight: 1 / 44,
    },
    {
      name: '披萨',
      weight: 1/ 22,
      restrict: {
        day: [weekdays.tuesday, weekdays.wednesday],
        meal: 'dinner',
      },
    },
    {
      name: '牛排',
      weight: 2 / 66,
      restrict: {
        meal: 'dinner',
      },
    },
    {
      name: '牛肉粉丝',
      weight: 1 / 22,
      restrict: {
        meal: 'lunch',
      },
    },
    {
      name: '蛋黄馄炖',
      weight: 1 / 5,
      restrict: {
        meal: 'dinner',
      },
    },
    {
      name: '千张包饭',
      weight: 2 / 5,
      restrict: {
        meal: 'dinner',
      },
    },
    {
      name: '羊杂粉',
      weight: 1 / 5,
      restrict: {
        meal: 'dinner',
      },
    },
  ],
};

export default config;
