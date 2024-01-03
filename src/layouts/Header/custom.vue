<template>
  <div class="header">
    <van-nav-bar :left-arrow="isLeftArrow" @click-left="handleLeft">
      <template #right v-if="['home', 'verifyEmail', 'matchs', 'lives'].includes(strNmae)">
        <!-- 联赛 -->
        <div v-if="route.name == 'home'" class="right" @click.stop="show = true">
          <svgIcon name="rili" :size="22" />
          <span class="date">{{ day }}</span>
        </div>
        <!-- 赛事 -->
        <div v-if="route.name == 'matchs'" class="right" @click="handleGoSreachM">
          <svgIcon name="sreach_matchs" :size="22" />
        </div>
        <!-- 验证码 -->
        <div @click="handleSkip" v-if="route.name == 'verifyEmail' && 'firstSDKlogin' != '1'" class="skip">
          {{ $t(`User.skip`) }}
        </div>

        <!-- 直播 -->
        <div v-if="route.name == 'lives'" @click.stop="">
          <svgIcon name="live_msg" :size="22" class="ilve_msg_icon" />
          <svgIcon name="sign_in" :size="22" />
        </div>
      </template>
      <template #title>
        <span class="nav-title">
          <svgIcon v-if="route.name == 'lives'" name="live_logo" :size="22" class="live_logo" />
          <!-- <span v-if="route.name == 'anchorGrowth'">{{ nav_Title['ZH-CN'] }}</span> -->

          <!-- <span v-else>{{ $t(`Home.${route?.meta?.title}`) }}</span> -->
        </span>
      </template>
      <template #left v-if="flag">
        <svgIcon name="sreach" :size="22" @click.stop="handleLeft" />
        <span v-if="route.name == 'lives'" @click.stop="">
          <svgIcon name="sreach_live" :size="22" class="sreach_live" />
        </span>
      </template>
    </van-nav-bar>
    <van-popup position="top" v-model:show="show">
      <Calendar @onCancelShow="onCancelShow" :isShow="show" />
    </van-popup>
  </div>
</template>

<script setup>
// import { nav_Title } from '../../pages/anchorGrowth/constant';
import { useUserStore } from '@/store';
import Calendar from '@/components/Calendar/index.vue';
import { Dialog } from 'vant';
import { fixGoBack, setLocal, getLocal } from '@/utils';
import { useI18n } from 'vue-i18n';
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const show = ref(false);
const { t, locale } = useI18n();
const strNmae = computed(() => route.name);

let homeRouteName = ['home', 'regard', 'matchs', 'tips', 'lives', 'community', 'regard'];

const flag = computed(() => homeRouteName.includes(strNmae.value));

const isLeftArrow = computed(() => {
  let name = route.name;
  return !['home', 'matchs'].includes(name);
});

const currentRouteName = ref('');

watch(
  () => router.currentRoute.value.name,
  (newValue, oldValue) => {
    if (oldValue) currentRouteName.value = String(oldValue);
  },
  { immediate: true }
);

const firstSDKlogin = ref('')
onMounted(() => {
  firstSDKlogin.value = getLocal('firstSDKlogin')
})

const handleLeft = () => {
  let routeName = ['verifyAccount', 'verifyPassword', 'setPassword', 'modifyPassword'];
  const confirmFlag = routeName.includes(strNmae.value);

  //修改密码&&设置密码 返回二次确认
  if (confirmFlag) {
    let verifyName = ['verifyAccount', 'verifyPassword'];
    Dialog.confirm({
      message: t(`User.${verifyName.includes(strNmae.value) ? 'exitPrompt' : 'exitPassword'}`),
    })
      .then(() => {
        //解决手机中返回无效
        fixGoBack(router);
      })
      .catch(() => {
        // on cancel
      });
    return;
  }

  //如果是首页 或者 个人中心
  if (flag.value || route.name == 'user') {
    let backRoute = '/matchs';
    let path = '/user';
    //如果是个人中心 跳回首页
    if (route.name == 'user') {
      //如果上个页面是从首页
      if (homeRouteName.includes(currentRouteName.value)) backRoute = currentRouteName.value;
      path = backRoute;
    }

    return router.push({
      path,
    });
  }
  fixGoBack(router);
};
//关闭日历
const onCancelShow = () => (show.value = false);

const day = computed(() => new Date(userStore.date).getDate());

const handleSkip = () => {
  Dialog.confirm({
    message: t('User.bindYourEmailExitTip'),
  })
    .then(() => {
      router.push({
        path: '/matchs',
      });
      setLocal('firstSDKlogin', '1');
    })
    .catch(() => {
      // on cancel
    });
};
const handleGoSreachM = () => {
  router.push({ path: '/league' });
};
</script>

<style lang="less" scoped>
.header {
  .nav-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #000000;

    .live_logo {
      margin-right: 5px;
    }
  }
}

.right {
  width: 22px;
  height: 22px;
  position: relative;

  .date {
    position: absolute;
    bottom: -6px;
    width: 21px;
    left: 1px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    color: #000000;
  }
}

.ilve_msg_icon {
  margin-right: 14px;
}

.sreach_live {
  margin-left: 20px;
}

.skip {
  font-size: 16px;
  color: #9699a8;
}
</style>
