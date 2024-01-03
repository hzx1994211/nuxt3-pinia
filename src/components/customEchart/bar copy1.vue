<template>
  <div>
    <div class="data-per-second">
      <div v-for="(i, index) in timeList" class="div-dom" :key="index">
        <span :class="['time', index == 0 ? 'isTime' : '']">{{ i.time }}'</span>
      </div>
    </div>

    <svg class="svg-box" width="calc(100%)" height="80" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect width="calc(100%)" x="0" y="0" height="40" fill="rgba(46, 107, 196, 0.05) "></rect>
        <rect width="calc(100%)" x="0" y="20" height="20" fill="rgba(46, 107, 196, 0.1)"></rect>
        <rect width="calc(100%)" x="0" y="40" height="40" fill="rgba(251, 190, 0, 0.05)"></rect>
        <rect width="calc(100%)" x="0" y="40" height="20" fill="rgba(251, 190, 0, 0.1)"></rect>
      </g>
      <g>
        <line
          v-for="(i, index) in timeList"
          :key="index"
          :x1="findLine(i.time, index)"
          y1="0"
          :x2="findLine(i.time, index)"
          y2="80"
          style="stroke: rgb(112, 112, 112, 0.1); stroke-width: 1"
        ></line>
      </g>
      <g>
        <rect
          v-for="(item, index) in list"
          :key="index"
          :x="item.x"
          :y="item.y"
          :height="item.height"
          :width="widthVlaue"
          :fill="item.type == 1 ? 'rgba(251, 190, 0, 1)' : 'rgba(46, 107, 196, 1)'"
          storke-width="1"
          paint-order="markers"
        ></rect>
      </g>
      <g>
        <svgIcon
          v-for="(i, n) in typeIconS"
          :x="findX(i)"
          :y="findY(i)"
          :name="typeS[i.type]"
          :size="12"
          :key="n"
          width="12"
          opacity="1"
        ></svgIcon>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { timeArr, typeS } from './data';
  import { ListItem, BarInfo, ListDtoItem, ListDtoSubItem } from './type';
  const pDomWidth = ref(0);
  const timeList = ref(timeArr);
  nextTick(() => {
    const pDom = document.querySelectorAll('.div-dom');
    pDomWidth.value = pDom[0].clientWidth - 15;
  });
  const widthVlaue: any = computed(() => pDomWidth.value / 15);
  const findX = computed(() => {
    return (item: ListDtoSubItem) => {
      if (list.value.length > 0) {
        const target: any = list.value.find((i: ListItem, index: number) => index == item.time);
        return target.x - 4;
      }
    };
  });

  const findLine = computed(() => {
    return (item: number, index: number) => {
      const n = 360 / 7;
      return n * (index + 1);
      // if (list.value.length > 0) {
      //   const target: any = list.value.find((i: ListItem, k: number) => k == item);
      //   return target.x;
      // }
    };
  });

  const findY = computed(() => {
    return (item: any) => {
      return item.position == 1 ? -54 : 54;
    };
  });

  const list = ref([] as Array<ListItem>);

  const typeIconS: any = ref([]);

  const barInfo: any = inject('barInfo');

  watch(
    () => barInfo.value,
    (val: BarInfo) => {
      const { listDto } = val;
      if (listDto) {
        let arr: Array<ListItem | any> = [];

        const iconSArr: any = [];
        listDto.forEach((e: ListDtoItem, index: number) => {
          // 处理数据趋势图逻辑
          const flag = e.trend > 0; //true主队 false客队
          let h = String((Math.abs(e.trend) / 100) * 40); //计算比例
          h = Number(h) > 40 ? '40' : h;

          const n = widthVlaue.value * index;

          arr.push({
            y: flag ? 40 - parseInt(h) : 40, //主队40-高度 客队默认高度40
            height: parseInt(h),
            type: flag ? 2 : 1, //2主队 1客队
            x: index == 0 ? 0.5 : n + index,
          });

          e.list &&
            e.list.forEach((k: ListDtoSubItem) => {
              iconSArr.push(k);
            });
        });

        typeIconS.value = iconSArr;
        list.value = arr;
      }
    },
    {
      immediate: true,
    }
  );
</script>
<style lang="less" scoped>
  .data-per-second {
    display: flex;
    // justify-content: space-between;

    div {
      flex: 1;
      color: #9699a8;
      font-size: 12px;
      position: relative;

      // &:after {
      //   content: '';
      //   height: 76px;
      //   border-right: 1px solid #eceff4;
      //   top: 43px;
      //   left: 0px;
      //   position: absolute;
      // }
      .time {
        margin-left: -6px;
      }
      .isTime {
        margin-left: -2px;
      }
    }
    div:last-child {
      flex: 0.3;
    }
  }

  .svg-box {
    margin-top: 26px;
  }

  svg {
    overflow: visible !important;
  }
</style>
