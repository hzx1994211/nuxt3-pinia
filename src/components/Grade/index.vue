<template>
  <div :class="['grade-warp', iconName]">
    <img class="grade-icon user-levels_img" v-if="iconName" :src="USER_LEVELS[iconName]" alt="" />
    <span class="text">
      {{ isLevelRange ? styleGradeLvRange(anchorLevel) : `Lv${anchorLevel}` }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import USER_LEVELS from './constant';
  const props = defineProps({
    //是否展示等级范围
    isLevelRange: {
      type: Boolean,
      default: false,
    },
    //等级
    anchorLevel: {
      type: Number || String,
      default: 1,
    },
  });
  const iconName = ref('lv_10');
  watch(
    () => props.anchorLevel,
    (value) => {
      //用户等级
      let userLevels = [
        'user_lv1',
        'user_lv10',
        'user_lv20',
        'user_lv30',
        'user_lv40',
        'user_lv50',
        'user_lv60',
        'user_lv70',
        'user_lv80',
        'user_lv90',
        'user_lv100',
      ];

      let index = parseInt(String(value / 10));
      iconName.value = userLevels[Number(index)];
      console.log(iconName.value);
    },
    { immediate: true }
  );
  const styleGradeLvRange = computed(() => {
    return function (value: number) {
      //用户等级范围
      let LvRange = [
        'Lv1 - Lv9',
        'Lv10 - Lv19',
        'Lv20 - Lv29',
        'Lv30 - Lv39',
        'Lv40 - Lv49',
        'Lv50 - Lv59',
        'Lv60 - Lv69',
        'Lv70 - Lv79',
        'Lv80 - Lv89',
        'Lv90 - Lv99',
        'Lv100',
      ];
      let index = Math.floor(value / 10);
      return LvRange[index];
    };
  });
</script>
<style lang="less" scoped>
  .grade-warp {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 16px;
    padding: 2px 5px 2px 10px;
    margin-left: 14px;
    font-size: var(--text-12);
    border-radius: 0 4px 4px 0;
    font-weight: bold;
    .grade-icon {
      position: absolute;
      left: -10px;
      top: -2px;
    }

    .user-levels_img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      // z-index: 9;
    }

    .text {
      display: inline-block;
      color: #fff;
      margin-left: 5px;
      font-weight: bold;
    }
  }
</style>
