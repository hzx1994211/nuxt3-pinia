<template>
  <div class="matchs_box">
    <ul class="matchs_list">
      <!-- 联赛内容 -->
      <li
        class="matchs_item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleDetail(item)"
      >
        <div class="item_top">
          <div class="item_top_l">
            <div class="left_time">
              <!-- 未开赛 1 -->
              <span
                v-if="
                  item.matchState == NOT_START ||
                  item.matchState == 8 ||
                  ABNORMAL_STATUS.includes(item.matchState)
                "
              >
                {{ time(item.matchTime) }}
              </span>
              <!-- 比赛中2上半场 4下半场 5加时 7点球 -->
              <p v-if="LIVE_START.includes(item.matchState)" class="live_start">
                <!-- 加时赛 -->
                <span v-if="item.matchState == OVERTIME" class="et">{{ $t('Live.ET') }}</span>
                <!-- 点球 -->
                <span v-if="item.matchState == PENALTY_SHOOTOUT" class="et">
                  {{ $t('Live.PEN') }}
                </span>
                <span class="time" v-else>{{ item.currentTime }}</span>
                <span class="in-progress">'</span>
              </p>
              <!--  9推迟 10中断 11腰斩 12取消 13待定 -->
              <span v-if="ABNORMAL_STATUS.includes(item.matchState)" class="abnormal mg_l5">
                {{ $t(`Live.${ABNORMAL_FIELDS[item.matchState]}`) }}
              </span>
              <!-- 中场休息/完场 -->
              <span
                :class="[item.matchState == 3 ? 'second_blur' : '', 'mg_l5']"
                v-if="[3, 8].includes(item.matchState)"
              >
                {{ $t(`Live.${EVENT_STATUS[item.matchState]}`) }}
              </span>
              <svgIcon
                v-if="item.matchState != 8"
                class="mg_l5"
                :name="item.stream == 0 ? 'noshipin' : 'shipin'"
                :size="14"
              />
            </div>
            <div class="corner_kick" v-if="!NOT_LIST.includes(item.matchState)">
              <svgIcon class="jq_icon" name="jiaoqiu" :size="18" />
              <span>{{ item.homeCorner }}</span>
              <span>-</span>
              <span>{{ item.guestCorner }}</span>
            </div>
          </div>
          <div class="item_top_r">
            <span v-for="i in TITLE_TYPES[oddsType]" :key="i">{{ $t(`Live.${i}`) }}</span>
            <!-- 收藏 -->
            <div @click.stop="handleColle(item)" class="collection">
              <svgIcon
                :name="item.followFlag || isFollowFlag ? 'yishoucang' : 'shoucang'"
                :size="18"
              />
            </div>
          </div>
        </div>
        <div class="item_info">
          <div class="item_team text-ellipsis">
            <!-- 球队信息 -->
            <div
              :class="['item_team_info', field.name == 'homeName' ? 'home_info' : '']"
              v-for="field in TEAM_FIELD_LISTt"
              :key="field.name"
            >
              <p class="text-ellipsis">
                <img
                  :src="item[field.logo] || (field.name == 'homeName' ? teamLogo : guestLogo)"
                  alt=""
                />
                <span class="team_name text-ellipsis">{{ item[field.name] }}</span>
                <span class="red" v-if="item[field.red] > 0">{{ item[field.red] }}</span>
              </p>
              <p class="team_score">
                {{ filterScore(item[field.penalty], item[field.score], item[field.state]) }}
              </p>
            </div>
          </div>
          <!-- odds -->
          <div class="item_odds">
            <!-- 胜平负 -->
            <ul v-if="oddsType == 1" class="total_golds">
              <li
                v-for="i in TOTAL_GOLDS"
                :key="i.fields"
                :class="filteBorder(item.europeResult, i.type)"
              >
                <span
                  v-if="item.europeClose == 0 && item[i.fields]"
                  :class="colorStyle(item, i, i.type)"
                >
                  {{ item[i.fields] }}
                </span>
                <svgIcon v-else name="fengpan" :size="14" />
                <lottieWeb
                  v-if="showAnimation(item, i, i.type)"
                  :class="['lottie_web']"
                  :isUp="colorStyle(item, i, i.type) == 'lottie_web_green'"
                  :domId="Math.random().toString(16).slice(-10)"
                />
              </li>
            </ul>
            <!-- 大小球 角球 亚盘 -->
            <ul v-else class="odds-exponent">
              <li
                :class="['odds_item', 'odds_home']"
                v-for="(odds, k) in ODDS_FIELDS[oddsType]"
                :key="odds.up"
              >
                <!-- 主 -->
                <div :class="['odds_item_t', filteBorder(item[odds.result], 'h')]">
                  <p v-if="item[odds.close] == 0 && item[odds.up]">
                    <span>
                      <span class="odds_tip">{{ k == 1 ? $t('Live.o') : '' }}</span>
                      {{ item[odds.up] || 0 }}
                    </span>
                    <span :class="['odds_num', colorStyle(item, odds, 'h')]">
                      {{ item[odds.upOdds] }}
                    </span>
                  </p>
                  <p class="fp_icon" v-else>
                    <svgIcon name="fengpan" :size="14" />
                  </p>
                  <lottieWeb
                    v-if="showAnimation(item, odds, 'h') && item[odds.close] == 0 && item[odds.up]"
                    class="lottie_web"
                    :isUp="colorStyle(item, odds, 'h') == 'lottie_web_green'"
                    :domId="Math.random().toString(16).slice(-10)"
                  />
                </div>

                <!-- 客 -->
                <div :class="['odds_item_b', filteBorder(item[odds.result], 'g')]">
                  <p v-if="item[odds.close] == 0 && item[odds.down]">
                    <span>
                      <span class="odds_tip">{{ k == 1 ? $t('Live.u') : '' }}</span>
                      {{
                        (odds.up == 'asiaHandicap' ? filteSub(item[odds.down]) : item[odds.down]) ||
                        0
                      }}
                    </span>
                    <span :class="['odds_num', colorStyle(item, odds, 'g')]">
                      {{ item[odds.downOdds] }}
                    </span>
                  </p>
                  <p v-else class="fp_icon">
                    <svgIcon name="fengpan" :size="14" />
                  </p>
                  <lottieWeb
                    v-if="
                      showAnimation(item, odds, 'g') && item[odds.close] == 0 && item[odds.down]
                    "
                    class="lottie_web"
                    :isUp="colorStyle(item, odds, 'g') == 'lottie_web_green'"
                    :domId="Math.random().toString(16).slice(-10)"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import {
    TEAM_FIELD_LISTt,
    ABNORMAL_STATUS,
    LIVE_START,
    NOT_START,
    OVERTIME,
    ABNORMAL_FIELDS,
    EVENT_STATUS,
    NOT_LIST,
    TITLE_TYPES,
    TOTAL_GOLDS,
    ODDS_FIELDS,
    PENALTY_SHOOTOUT,
  } from './constant';
  import { useI18n } from 'vue-i18n';
  import { useMatchStore } from '@/store';
  import { followMatch, cancelFollow } from '@/api/league/index';
  import { IMatchListItem } from '@/components/types/matchType';

  import lottieWeb from '@/components/LottieWeb/index.vue';
  // import type { ComponentInternalInstance } from 'vue';
  import guestLogo from '@/assets/images/guestLogo.png';
  import teamLogo from '@/assets/images/teamLogo.png';

  const matchStore = useMatchStore();
  const router = useRouter();
  const { toastMsg } = useToast();
  const { locale, t: _i18n_t } = useI18n();
  const $emit = defineEmits(['updateColle']);
  const props = defineProps({
    //选中的odds type
    oddsType: {
      type: Number,
      default: 1,
    },
    details: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    //兼容关注模块
    isFollowFlag: {
      type: Boolean,
      default: false,
    },
    oddsFlag: {
      type: Boolean,
      default: false,
    },
  });

  const { proxy } = getCurrentInstance() as any;
  const list = computed(() => props.details.matches);

  const filteSub = computed(() => {
    return (item: string) => {
      if (!item) return `0`;
      //原始值
      let flag_ = item.indexOf('-') != -1;
      let flag_a = item.indexOf('+') != -1;
      if (flag_) return item.replace(`-`, `+`);
      if (flag_a) return item.replace(`+`, `-`);
    };
  });
  const filteBorder = computed(() => {
    return (r: number, type: string) => {
      let _name = '';
      if (r == 1 && type == 'h') _name = 'border_color';
      if (r == 2 && type == 'o') _name = 'border_color';
      if (r == 3 && type == 'g') _name = 'border_color';
      return _name;
    };
  });
  const filterScore = computed(() => {
    //penalty：点球比分 score：比分 matchState：状态
    return (penalty: number, score: number, matchState: number) => {
      const falg = matchState == 7 || (matchState == 8 && penalty);
      let n = [1, 9, 11, 12, 13];
      if (n.includes(matchState)) return '';
      return `${score}${falg ? `(${penalty || 0})` : ''}`;
    };
  });

  const showAnimation = computed(() => {
    return (item: any, fields_item: any, type: string) => {
      if (type == 'h' && item[fields_item.leftAni]) return true; //左
      if (type == 'o' && item[fields_item.midAni]) return true; //中
      if (type == 'g' && item[fields_item.rightAni]) return true; //右
      return false;
    };
  });

  const colorStyle = computed(() => {
    return (item: any, fields_item: any, type: string) => {
      let color = '';
      if (type == 'h' && item[fields_item.leftAni]) {
        let _l = item[fields_item.leftChange] == -1;
        return (color = _l ? 'lottie_web_red' : 'lottie_web_green');
      }

      if (type == 'o' && item[fields_item.midAni]) {
        let _m = item[fields_item.midChange] == -1;
        return (color = _m ? 'lottie_web_red' : 'lottie_web_green');
      }

      if (type == 'g' && item[fields_item.rightAni]) {
        let _r = item[fields_item.rightChange] == -1;
        return (color = _r ? 'lottie_web_red' : 'lottie_web_green');
      }

      return color;
    };
  });

  //时间处理
  const time = computed(() => {
    return (date: string) => {
      //当天时间
      const specificDate = proxy.$dayjs().format('YYYY-MM-DD');
      const playingDate = date && date.split(' ')[0];

      const hour = proxy.$dayjs(date).hour();
      const minute = proxy.$dayjs(date).minute();

      const t = `${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}`;

      const d = playingDate && playingDate.split('-');

      return specificDate == playingDate ? t : `${d[1]}/${d[2]} ${t}`;
    };
  });

  //收藏比赛
  const handleColle = async (item: IMatchListItem) => {
    const { matchId } = item;
    const param: number = matchId;
    const { code, msg } =
      item.followFlag || props.isFollowFlag ? await cancelFollow(param) : await followMatch(param);
    const type = code == 200;
    if (code) $emit('updateColle');
    toastMsg(msg, 400);
    type && (item.followFlag = !item.followFlag);

    matchStore.updateMatchIds({
      matchId,
      followFlag: item.followFlag,
    });
  };
  const handleDetail = (item: IMatchListItem) => {
    const { matchId } = item;
    if (props.oddsFlag) return;
    router.push({
      name: 'matchsDetail',
      query: {
        matchId,
      },
    });
    // $emit('handleClick', item);
  };
</script>

<style lang="less" scoped>
  @import './league.less';
</style>
