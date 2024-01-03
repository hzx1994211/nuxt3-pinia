//球队字段
const TEAM_FIELD_LISTt = [
  {
    logo: 'homeLogo',
    name: 'homeName',
    red: 'homeRed',
    penalty: 'homePenalty',
    score: 'homeScore',
    state: 'matchState',
  },
  {
    logo: 'guestLogo',
    name: 'guestName',
    red: 'guestRed',
    penalty: 'guestPenalty',
    score: 'guestScore',
    state: 'matchState',
  },
];

const NOT_START = 1; //未开赛
const FIRST_HALF = 2; //上半场
const MIDFIELDER = 3; //中场休息
const LAST_HALF = 4; //下半场
const OVERTIME = 5; //加时赛
const PENALTY_SHOOTOUT = 7; //点球决战
const FINISH = 8; //完场
const DELAY = 9; //推迟
const INTERRUPT = 10; //中断
const CUT_IN_HALF = 11; //腰斩
const CANCEL = 12; //取消
const UNDETERMINED = 13; //待定

const ABNORMAL_FIELDS: any = {
  //比赛异常状态
  9: 'postpone',
  10: 'interrupt',
  11: 'cutting',
  12: 'canceled',
  13: 'pending',
};
//比赛异常
const ABNORMAL_STATUS = [DELAY, INTERRUPT, CUT_IN_HALF, CANCEL, UNDETERMINED];

const EVENT_STATUS: any = {
  //中场 点球 完场
  3: 'HT',
  7: 'PEN',
  8: 'FT',
};

//进行中 不包含中场
const LIVE_START = [FIRST_HALF, LAST_HALF, OVERTIME, PENALTY_SHOOTOUT];

//进行中 包含中场
const LIVE_START_ALL = [FIRST_HALF, MIDFIELDER, LAST_HALF, OVERTIME, PENALTY_SHOOTOUT];

//未开赛
const NOT_LIST = [NOT_START, DELAY, INTERRUPT, CUT_IN_HALF, CANCEL, UNDETERMINED];

const TITLE_TYPES: any = {
  1: ['host', 'gentle', 'guest'],
  2: ['concedePoints', 'golds'],
  3: ['concedePoints', 'corner'],
};
// odds字段
const ODDS_FIELDS: any = {
  2: [
    // 亚盘
    {
      up: 'asiaHandicap', //亚盘O盘口赔率
      down: 'asiaHandicap', //亚盘U盘口赔率
      upOdds: 'asiaUp', //亚盘下盘变化趋势
      downOdds: 'asiaDown', //亚盘盘口
      close: 'asiaClose', //亚盘封盘
      result: 'aisaResult', //1 3 分别表示大球 小球
      push_type: 2,

      leftChange: 'asiaUpChange',
      rightChange: 'asiaDownChange',

      leftAni: 'isAsiaUpAni',
      rightAni: 'isAsiaDownAni',
    },
    // 总进球
    {
      up: 'totalHandicap', //总进球O盘口赔率
      down: 'totalHandicap', //总进球U盘口赔率
      upOdds: 'totalUp', //总进球下盘变化趋势
      downOdds: 'totalDown', //总进球盘口
      close: 'totalClose', //总进球封盘
      result: 'totalResult', //1 3 分别表示大球 小球
      push_type: 3,

      leftChange: 'totalUpChange',
      rightChange: 'totalDownChange',

      leftAni: 'isTotalUpAni',
      rightAni: 'isTotalDownAni',
    },
  ],
  3: [
    // 亚盘
    {
      up: 'asiaHandicap', //亚盘O盘口赔率
      down: 'asiaHandicap', //亚盘U盘口赔率
      upOdds: 'asiaUp', //亚盘下盘变化趋势
      downOdds: 'asiaDown', //亚盘盘口
      close: 'asiaClose', //亚盘封盘
      result: 'aisaResult', //1 3 分别表示大球 小球
      push_type: 2,

      leftChange: 'asiaUpChange',
      rightChange: 'asiaDownChange',

      leftAni: 'isAsiaUpAni',
      rightAni: 'isAsiaDownAni',
    },
    // 角球
    {
      up: 'cornerHandicap', //角球O盘口赔率
      down: 'cornerHandicap', //角球U盘口赔率
      upOdds: 'cornerUp', //角球下盘变化趋势
      downOdds: 'cornerDown', //角球盘口
      close: 'cornerClose', //角球封盘
      result: 'cornerResult', //1 3 分别表示大球 小球
      push_type: 4,

      leftChange: 'cornerUpChange',
      rightChange: 'cornerDownChange',

      leftAni: 'isCornerUpAni',
      rightAni: 'isCornerDownAni',
    },
  ],
};

//胜平负或者叫欧赔
const TOTAL_GOLDS: any = [
  {
    fields: 'win',
    close: 'europeClose',
    type: 'h',
    push_type: 1,
    leftChange: 'winChange',
    leftAni: 'isWinAni',
  },
  {
    fields: 'standard',
    close: 'europeClose',
    type: 'o',
    push_type: 1,
    midChange: 'standardChange',
    midAni: 'isStandardAni',
  },
  {
    fields: 'lose',
    close: 'europeClose',
    type: 'g',
    push_type: 1,
    rightChange: 'loseChange',
    rightAni: 'isLoseAni',
  },
];

export {
  TEAM_FIELD_LISTt,
  NOT_START,
  OVERTIME,
  ABNORMAL_FIELDS,
  EVENT_STATUS,
  LIVE_START,
  ABNORMAL_STATUS,
  NOT_LIST,
  TITLE_TYPES,
  TOTAL_GOLDS,
  ODDS_FIELDS,
  LIVE_START_ALL,
  PENALTY_SHOOTOUT,
};
