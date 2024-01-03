<template>
  <div :class="['empty-box', regardFlag ? 'regard-height' : '']">
    <!-- nodata -->
    <svgIcon name="nodata" :size="130" />
    <p class="no-data">No data</p>
    <p class="no-data-text">No data, please try again later</p>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const regardFlag = computed(() => {
    const _rouetName: any = route.name;
    return ['regard', 'competition'].includes(_rouetName);
  });
</script>

<style lang="less" scoped>
  .empty-box {
    background-color: #edf1f5;
    text-align: center;
    height: calc(100vh - @header-height - @tabbar-height);
    padding-top: 177px;
    .no-data {
      font-size: 18px;
      font-weight: bold;
      color: #9699a8;
      margin: 10px 0 5px 0;
    }
    .no-data-text {
      font-size: 14px;
      color: #cdd0e0;
    }
  }
  .regard-height {
    height: calc(100vh - @header-height - @tabbar-height - 68px);
  }
</style>
