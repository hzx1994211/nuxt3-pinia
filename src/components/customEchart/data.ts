const l = [
  {
    y: '40', //往下面摆放是y40开始
    height: '30',
    type: 1,
  },
  {
    y: '40',
    height: '40',
    type: 1,
  },
  {
    y: '40',
    height: '40',
    type: 1,
  },
  {
    y: '0', //往上摆放y是 和 height加起来40
    height: '40',
    type: 2,
  },
];

const timeArr: any = [
  {
    time: 0, //父级
    info: [
      // {
      //   time: 1, //子级的时间
      //   k: 2, //状态
      //   position: 1, 1-主队、2-客队
      // },
    ],
  },
  {
    time: 15,
    info: [],
  },
  {
    time: 30,
    info: [],
  },
  {
    time: 45,
    info: [],
  },
  {
    time: 60,
    info: [],
  },
  {
    time: 75,
    info: [],
  },
  {
    time: 90,
    info: [],
  },
];
/**
 * 1进球  2角球  3黄牌  4红牌  5越位  6任意球  7球门球
 * 8点球  9换人  10比赛开始  11中场  12结束  13半场比分
 * 15两黄变红   16点球未进  17乌龙球  18助攻  19伤停补时  21射正  22射偏
 * 23进攻  24危险进攻  25控球率  26加时赛结束  27点球大战结束   28VAR
 * 29点球  30点球未进
 */
const typeS: { [key: number]: string | any } = {
  1: 'jinqiu',
  2: 'jiaoqiu',
  3: 'huangpai',
  4: 'hongpai',
  8: 'dianqiu',
  9: 'huanren',
  15: 'huang_2_hong_1',
  16: 'dianqiuweijin',
  17: 'wulong',
  28: 'var',
  29: 'dianqiu',
  30: 'dianqiuweijin',
};

const typeList: Array<number> = [1, 2, 3, 4, 8, 9, 15, 16, 17, 28, 29, 30];

export { timeArr, l, typeS, typeList };
