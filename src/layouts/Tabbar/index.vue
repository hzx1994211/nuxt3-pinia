<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route @change="onChange">
      <van-tabbar-item :name="matchRoute" :to="`/${matchRoute}`">
        <span :class="['title', ['matchs', 'home'].includes(active) ? 'title-text' : '']">
          {{ $t('Home.gameTitle') }}
        </span>
        <template #icon="props">
          <svgIcon
            :name="props.active || ['matchs', 'home'].includes(active) ? 'matchs_active' : 'matchs'"
            :size="32"
          ></svgIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        v-for="item in rouetList"
        :key="item.active"
        :name="item.active"
        :to="`/${item.active}`"
      >
        <span :class="['title', active == item.active ? 'title-text' : '']">
          {{ $t(`Home.${item.text}`) }}
        </span>
        <template #icon="props">
          <svgIcon :name="props.active ? item.iconAcitve : item.icon" :size="32"></svgIcon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
  import { useMatchStore } from '@/store';
  import { setLocal } from '@/utils';
  const matchStore = useMatchStore();
  const route = useRoute();
  const active= ref('home');
  const rouetList = ref([
    { text: 'tips', active: 'tips', icon: 'tips', iconAcitve: 'tips_active' },
    { text: 'lives', active: 'lives', icon: 'live', iconAcitve: 'live_active' },
    { text: 'community', active: 'community', icon: 'community', iconAcitve: 'community_active' },
    { text: 'regardTitle', active: 'regard', icon: 'favorites', iconAcitve: 'favorites_acitve' },
  ]);
  watch(
    () => route.name,
    (val) => {
      setLocal('tabActive', val);
      active.value = val;
    },
    {
      immediate: true,
    }
  );
  const matchRoute = computed(() => {
    let _R = 'matchs';
    if (matchStore.currentRoute == 'home') _R = 'home';
    return _R;
  });
  const onChange = (val) => {
    active.value = val;
    setLocal('tabActive', val);
  };
</script>

<style lang="less" scoped>
  .tabbar {
    .van-nav-bar {
      background-color: @green;
    }
    .title {
      font-weight: bold;
      color: #959595;
    }
    .title-text {
      color: #2e6bc4;
    }
  }
</style>
