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
      25742, // 强风吹拂
      26146, // 多罗罗
      26281, // 约定的梦幻岛
      26297, // 路人超能100 II(灵能百分百 第二季)
      25681, // JOJO的奇妙冒险 黄金之风
      25510, // 刀剑神域 Alicization
      26289, // 同居人是猫
      26284, // 盾之勇者成名录
      25739, // 关于我转生变成史莱姆这档事
      26274, // 辉夜大小姐想让我告白~天才们的恋爱头脑战~
      26283, // 五等分的新娘
      25730, // 火之丸相扑
      26280, // 格林笔记 The Animation
      26303, // 不吉波普不笑
      25615, // 魔偶马戏团
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
