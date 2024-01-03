<template>
  <div>
    <div class="data-per-second">
      <div v-for="(i, index) in timeS" class="div-dom" :key="index">
        <span class="time">{{ i.time }}'</span>
        <p v-if="i.info">
          <span v-for="(k, n) in i.info" class="icons" :style="infoStyle(i, k, n)" :key="n">
            <svgIcon :name="typeS[k.type]" :size="12"></svgIcon>
          </span>
        </p>
      </div>
    </div>

    <svg class="svg-box" width="calc(100%)" height="80" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect width="calc(100%)" x="0" y="0" height="40" fill="rgba(46, 107, 196, 0.05) "></rect>
        <rect width="calc(100%)" x="0" y="20" height="20" fill="rgba(46, 107, 196, 0.1)"></rect>
        <rect width="calc(100%)" x="0" y="40" height="40" fill="rgba(251, 190, 0, 0.05)"></rect>
        <rect width="calc(100%)" x="0" y="40" height="20" fill="rgba(251, 190, 0, 0.1)"></rect>
      </g>
      <g class="bg">
        <rect
          v-for="(item, index) in list"
          :key="index"
          :x="item.x"
          :y="item.y"
          :height="item.height"
          :width="widthVlaue"
          :fill="item.type == 1 ? 'rgba(251, 190, 0, 1)' : 'rgba(46, 107, 196, 1)'"
          storke-width="1"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue';
  import { typeS, typeList } from './data';
  import { ListItem, BarInfo, ListDtoItem, ListDtoSubItem, TimeInfo } from './type';
  const props = defineProps({
    barInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    timeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  });
  const pDomWidth = ref(0);

  const timeS: Ref<Array<TimeInfo> | any> = ref([]);

  const infoStyle = computed(() => {
    return (parent: TimeInfo, item: ListDtoSubItem, index: number) => {
      let w = 0;
      //如果有多个事件
      if (parent.info) {
        let n = 0;
        parent.info.forEach((i: any) => {
          if (i.time == item.time) n++;
        });
        // w ++
        if (n > 1) w = [29, 30].includes(item.type) ? index : index / 2;
      }

      let target: any = list.value.find((i: ListItem, index: number) => index == item.time);

      let l = target.x - 8 + w; //此处减8
      return `position: absolute;left:${l}px;top:${item.position == 1 ? 20 : 125}px`;
    };
  });

  const widthVlaue: any = computed(() => pDomWidth.value / 15);

  // const x = computed(() => {
  //   return (index: number) => {
  //     if (index == 0) return 1;
  //     const n = widthVlaue.value * index;
  //     return n + index;
  //   };
  // });

  const list = ref([] as Array<ListItem>);

  const barInfo: any = inject('barInfo');

  watch(
    () => barInfo.value,
    (val: BarInfo) => {
      timeS.value = props.timeList;
      timeS.value.forEach((e: TimeInfo) => (e.info = []));
      const { listDto } = val;

      nextTick(() => {
        const pDom = document.querySelectorAll('.div-dom');
        if (pDom.length > 0) pDomWidth.value = pDom[0].clientWidth - 15;
        if (listDto) {
          let arr: Array<ListItem> = [];
          listDto.forEach((e: ListDtoItem, index: number) => {
            // 处理数据趋势图逻辑
            const flag = e.trend > 0; //true主队 false客队
            let h = String((Math.abs(e.trend) / 100) * 40); //计算比例
            h = Number(h) > 40 ? '40' : h;

            // x轴
            const x = widthVlaue.value * index;

            arr.push({
              y: flag ? 40 - parseInt(h) : 40, //主队40-高度 客队默认高度40
              height: parseInt(h),
              type: flag ? 2 : 1, //2主队 1客队
              x: index == 0 ? 1 : x + index,
            });

            //处理每分钟对应的状态
            if (e.list) {
              e.list.forEach((k: ListDtoSubItem) => {
                timeS.value.forEach((p: any, index: number) => {
                  const nextItem = timeS.value[index + 1]; //拿到下一个时间
                  //判断time 当前时间是否处于下一个时间内
                  const _currentFlag = k.time >= p.time && nextItem && k.time < nextItem.time;
                  if (_currentFlag && !p.info.includes(k) && typeList.includes(k.type)) {
                    p.info.push(k);
                  }
                });
              });
            }
          });
          list.value = arr;
        }
      });
    },

    {
      immediate: true,
    }
  );
</script>
<style lang="less" scoped>
  .data-per-second {
    display: flex;
    position: relative;
    // justify-content: space-between;
    div {
      flex: 1;
      color: #9699a8;
      font-size: 12px;

      .time {
        position: relative;
        left: -4px;
        &:after {
          content: '';
          height: 76px;
          border-right: 1px solid #eceff4;
          // top: 38px;
          top: 40px;
          left: 4px;
          position: absolute;
          z-index: 99;
          opacity: 0.6;
        }
      }
    }

    div:last-child {
      flex: 0;
    }
  }

  .bg {
    display: flex;

    .rect {
      flex: 1;
    }
  }

  .svg-box {
    // margin-top: 38px;
    margin-top: 26px;
    z-index: 9999;
  }

  .icons {
    position: absolute;
  }

  svg {
    overflow: visible !important;
  }
</style>
