<template>
  <!-- 联赛头部信息 -->
  <div class="regard_item_top">
    <div class="regard_item_l">
      <img class="regard_item_logo" :src="item.logo ? item.logo : logoImg" alt="" />
      <div>
        <span v-if="!isCountry">{{ item.countryOrCatogoryName || countryName }}</span>
        <span v-if="!isCountry" class="triangle mg_8 triangle_bg"></span>
        <span>{{ item.leagueName }}</span>
      </div>
    </div>
    <!-- 联赛 -->
    <div class="regard_item_r" v-if="isCollect" @click="handleTopping"
      ><svgIcon
        :name="props.leagueIds.includes(item.leagueId) ? 'suoding' : 'weisuoding'"
        :size="22"
      ></svgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import logoImg from '@/assets/images/liansai.png';
  const emit = defineEmits(['handleTopping']);
  const props = defineProps({
    data: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    isCollect: {
      //联赛收藏
      type: Boolean,
      default: true,
    },
    //是否展示国家信息
    isCountry: {
      type: Boolean,
      default: false,
    },
    leagueIds: {
      type: Array,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => [],
    },
    countryName: {
      type: String,
      default: '',
    },
  });
  const item = computed(() => props.data);

  onMounted(() => {
    // nextTick(() => {
    //   if (props.leagueIds.includes(item.value.leagueId)) item.value.isCollect = true;
    // });
  });

  // state.leagueIds.includes(item.leagueId)
  const handleTopping = () => {
    if (props.isCollect) emit('handleTopping', item.value, props.countryName);
  };
</script>

<style lang="less" scoped>
  .regard_item_top {
    background: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    .regard_item_l {
      height: 100%;
      display: flex;
      font-size: 12px;
      align-items: center;
      color: #808080;
      .regard_item_logo {
        width: 26px;
        height: 26px;
        margin-right: 14px;
        object-fit: contain;
      }
    }
    .triangle_bg {
      border-left: 5px solid #808080;
    }
    .game_text {
      font-weight: bold;
      color: #000000;
      margin-top: 2px;
    }
  }
</style>
