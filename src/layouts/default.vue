<template>
  <div class="layout">
    <customHeader v-if="!isNavBar" />
    <div :class="[
      flag ? 'content' : 'tabbar-content',
      isNavBar ? 'detail-content' : '',
      isMargin ? 'padding-16' : '',
    ]">
      <NuxtPage v-slot="{ Component }">
        <keep-alive :include="cacheRouter">
          <component :is="Component" />
        </keep-alive>
      </NuxtPage>
    </div>
    <Tabbar v-show="flag" />
    <div v-if="!isNavBar" class="download_app" @click="handleDownload">{{ $t('downloadAPP') }}</div>
  </div>
</template>

<script setup >
import customHeader from './Header/custom.vue';
import Tabbar from './Tabbar/index.vue';
import { useI18n } from 'vue-i18n';
import { getConfigs } from '@/api/userApi';
import { setLocal, getLocal } from '@/utils';
import { getUseCookie } from '@/utils/getCookie';
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { toastMsg } = useToast();
const cacheRouter = ref([]); //'competition', 'home'
//判断是否首页 赛事 关注页面
const flag = computed(() => {
  const strNmae = String(route.name);
  return ['home', 'regard', 'matchs', 'tips', 'lives', 'community', 'regard'].includes(strNmae);
});

//去掉navBar
const isNavBar = computed(() => {
  const strNmae = String(route.name);
  const NoNavBarName = [
    'matchsDetail',
    'matchsDetailLive',
    'matchsDetailIframeAnimation',
    'landingPage',
    'anchorGrowth',
    'userLevel',
  ];
  return NoNavBarName.includes(strNmae);
});

//赛事详情页去掉padding:16px像素和margin-top像素
const isMargin = computed(() => {
  const strNmae = String(route.name);
  return ['personalCenter', 'anchorGrowth'].includes(strNmae);
});
watch(
  route,
  (val) => {
    const { name, meta } = val;
    if (meta.keepAlive && !cacheRouter.value.includes(name)) {
      cacheRouter.value.push(name);
    }
  },
  { immediate: true }
);

const handleDownload = () => {
  router.push({ name: 'landingPage' });
};

onMounted(() => {
  updateConfig();
});
//获取默认国家/语言
const updateConfig = async () => {
  const { code, data, msg } = await getConfigs();
  const flag = code == 200;
  console.log(data, flag);
  if (flag) {
    const country = useCookie('country')
    const lang = useCookie('lang')
    if (!country.value) country.value = data.defaultCountryCode
    if (!lang.value) {
      lang.value = data.defaultLangCode
      locale.value = data.defaultLangCode;
    } else {
      locale.value = String(lang.value);
    }
  } else {
    toastMsg(msg);
  }
};
</script>

<style lang="less" scoped>
.layout {
  position: absolute;
  width: 100%;
  height: 100%;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @header-height;
    z-index: 2001;
  }

  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: @tabbar-height;
    z-index: 2001;
  }

  .content {
    // padding: 20px;
    margin: @header-height 0 @tabbar-height 0;
    height: calc(100% - @header-height - @tabbar-height);
    overflow: auto;
  }

  .tabbar-content {
    padding: 16px;
    margin: @header-height 0 @tabbar-height 0;
    height: calc(100% - @header-height);
    overflow: auto;
  }

  .padding-16 {
    padding: 0;
  }

  .detail-content {
    padding: 0;
    margin-top: 0;
    height: 100vh;
    overflow: auto;
  }

  .download_app {
    position: fixed;
    left: 50%;
    font-size: 12px;
    background: #3c4cea;
    display: inline-block;
    color: #fff;
    padding: 10px 15px;
    box-shadow: 0px 0px 10px 1px rgba(60, 76, 234, 0.2);
    border-radius: 22px;
    transform: translate(-50%, -50%);
    bottom: calc(@tabbar-height + 20px);
  }
}
</style>
