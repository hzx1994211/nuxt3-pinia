<template>
  <div class="no-live-events">
    <svgIcon :name="iconName" :size="size" />
    <p :class="['no-data', textClass]">{{ $t(`Home.${text}`) }}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      default: 'live',
    },
    iconName: {
      type: String,
      default: 'no_event',
    },
    size: {
      type: Number,
      default: 50,
    },
    text: {
      type: String,
      default: 'noLiveEvents',
    },
    textClass: {
      type: String,
      default: '',
    },
  });
</script>
<style lang="less" scoped>
  .no-live-events {
    // border-bottom: 1px solid #eaeaea;
    text-align: center;
    padding: 30px 0;
    // background-color: #edf1f5;
    .no-data {
      font-size: 14px;
      font-weight: bold;
      color: #9699a8;
      margin-top: 5px;
    }
  }
</style>
