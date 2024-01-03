<template>
  <div class="live-animation live-a">
    <div class="live-c"></div>
    <div class="live-c live-d"></div>
    <div class="live-e"><img class="live-f" :src="src" alt="LiveIcon" /></div>
    <div class="live-text">
      <span>LIVE</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
    },
  });
</script>
<style lang="less" scoped>
  .live-animation {
    align-items: center;
    display: flex;
    height: 62px;
    justify-content: center;
    position: relative;
    width: 62px;
  }

  .live-animation .live-c {
    border: 1.5px solid #1480ff;
  }

  .live-animation .live-c {
    border: 1.5px solid #e41010;
    border-radius: 50%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .live-animation .live-d {
    animation: aKbSlHZH 1s linear infinite;
  }

  .live-a {
    height: 42px;
    width: 42px;
  }

  .live-a .live-e {
    height: 38px;
    width: 38px;
  }

  .live-a .live-e {
    animation: sBNZrvc_ 1s linear infinite;
    left: 2px;
    position: absolute;
    top: 2px;
  }

  .live-a .live-e .live-f {
    height: 38px;
    width: 38px;
    border-radius: 50%;
    object-fit: cover;
  }

  .live-e {
    animation: none !important;
  }

  .live-text {
    position: absolute;
    bottom: -2px;
    width: 28px;
    height: 12px;
    background: #b4382e;
    border-radius: 2px;
    border: 1px solid #ffffff;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #ffffff;

    span {
      text-align: center;
      display: inline-block;
      width: 24px;
      line-height: 12px;
      font-size: 8px;
    }
  }

  @keyframes sBNZrvc_ {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }

    to {
      transform: scale(1);
    }
  }

  @keyframes aKbSlHZH {
    0% {
      border-color: #e41010;
      border-width: 1.5px;
      transform: scale(1);
    }

    80% {
      border-color: rgba(254, 44, 85, 0);
      border-width: 0;
      transform: scale(1.15);
    }

    to {
      border-color: rgba(254, 44, 85, 0);
      border-width: 0;
      transform: scale(1.15);
    }
  }
</style>
