<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color, fill, fontSize: size }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
  },
  fill: {
    type: String,
  },
});
const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return 'svg-icon';
});
</script>
<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
