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
  videos: { id: number, name: string, source: 'bilibili' | 'youku' }[];
  eating: Array<food>;
} = {
  videos: [
    {
      id: 26875,
      source: 'bilibili',
      name: 'CAROLE & TUESDAY',
    },
    {
      id: 26146,
      name: '多罗罗',
      source: 'bilibili',
    },
    {
      id: 26801,
      name: '鬼灭之刃',
      source: 'bilibili',
    },
    {
      id: 25681,
      name: 'JOJO的奇妙冒险 黄金之风',
      source: 'bilibili',
    },
    {
      id: 434128,
      name: '一拳超人 2',
      source: 'youku',
    },
    {
      id: 26870,
      name: '川柳少女',
      source: 'bilibili',
    },
    {
      id: 26284,
      name: '盾之勇者成名录',
      source: 'bilibili',
    },
    {
      id: 26767,
      name: '我们无法一起学习',
      source: 'bilibili',
    },
    {
      id: 26802,
      name: '皿三昧',
      source: 'bilibili',
    },
    {
      id: 25615,
      name: '魔偶马戏团',
      source: 'bilibili',
    },
    {
      id: 26794,
      name: '贤者之孙',
      source: 'bilibili',
    },
    {
      id: 26818,
      name: '一个人的〇〇小日子',
      source: 'bilibili',
    },
  ],
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
