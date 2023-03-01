<template>
  <div>
    <h1>nuxt第一个页面</h1>
    <div>{{ t("home.title") }}11</div>
    <!-- <NuxtLink to="/demo">333</NuxtLink> -->
    <NuxtLink to="/demo/d-333">4444</NuxtLink>
    <ul>
      <li>sss</li>
    </ul>
    <a href="javascript:;" @click="setLang('zh')">简体中文</a>
    <a href="javascript:;" @click="setLang('en')">English</a>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const userInfo = useUserStore().userInfo
console.log(userInfo,'---userInfo');
const setLang = (lang) => {
  locale.value = lang;
}
</script>