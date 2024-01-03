<template>
  <div :id="domId" class="lottie_animations"></div>
</template>

<script setup lang="ts">
  import lottie from 'lottie-web';
  import Down from '@/assets/animations/Down.json';
  import UP from '@/assets/animations/UP.json';
  const props = defineProps({
    domId: {
      type: String,
      default: '',
    },
    isUp: {
      type: Boolean,
      default: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let animation: any = ref(null);
  const init = () => {
    animation.value = lottie.loadAnimation({
      container: document.getElementById(props.domId) as any,
      renderer: 'svg',
      loop: true, //循环播放 true/number/false
      autoplay: true,
      animationData: props.isUp ? UP : Down,
    });
  };
  onMounted(() => {
    init();
  });
</script>
<style lang="less" scoped>
  .lottie_animations {
    width: 5px;
    height: 9px;
    // overflow: hidden;
  }
</style>
