<template>
  <div class="list_title">
    <div class="title_left">
      <svgIcon :name="icon" :size="size" />
      <h3>{{ $t(title) }}</h3>
    </div>
    <span class="more" v-if="isMore" @click="handleLanding">
      <span class="text">{{ $t(more) }}</span>
      <svgIcon class="rotate_270" fill="rgb(237, 241, 245)" name="jiantou" :size="10" />
    </span>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter();
  const props = defineProps({
    icon: {
      type: String,
      default: 'live_recom',
    },
    title: {
      type: String,
      default: 'Live.liveBroadcast',
    },
    size: {
      type: Number,
      default: 18,
    },
    isMore: {
      type: Boolean,
      default: true,
    },
    more: {
      type: String,
      default: 'Live.more',
    },
  });

  const handleLanding = () => {
    router.push({ name: 'landingPage' });
  };
</script>
<style lang="less" scoped>
  .list_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    .title_left {
      display: flex;
      align-items: center;
    }
    h3 {
      margin-left: 5px;
    }
    .more {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      color: #9799a8;
      .text {
        margin-right: 5px;
      }
    }
  }
</style>
