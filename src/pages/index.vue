<template>
  <div>
    <h1>nuxt第一个页面</h1>

    <!-- <NuxtLink to="/demo">333</NuxtLink> -->
    <NuxtLink to="/demo/d-333">4444</NuxtLink>
    <ul>
      <li>sss</li>
    </ul>
    <a href="javascript:;" @click="setLang('zh')">简体中文</a>
    <a href="javascript:;" @click="setLang('en')">English</a>
    <svgIcon name="followCom" :size="24" />
    <h1> Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">
      reset
    </button>
    <button @click="counter--">
      -
    </button>
    <button @click="counter++">
      +
    </button>

    <div class="dynamic-scroller-demo">
      <DynamicScroller v-if="filterList" :items="filterList" :min-item-size="50" ref="refDynamic" :buffer="600"
        key-field="index" class="scroller">
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item]" :data-index="index"
            :data-active="active" @click.stop="">
            <div class="competition_box">
              {{ item.text }}
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>

  </div>
</template>
<script setup>
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();


const counter = useCookie('counter')
counter.value = counter.value || 0

const setLang = (lang) => {
  locale.value = lang;
}

const filterList = [

]
for (let index = 0; index < 1000; index++) {
  filterList.push({ index: index, text: index + 1 })

}

</script>
<style lang="less">
.title {
  font-size: 18px;
}

.dynamic-scroller-demo {
  height: 50vh;
  // padding-top: 70px;
  position: relative;

  .scroller {
    height: calc(100%);

    :deep(.vue-recycle-scroller__item-wrapper) {
      background-color: #edf1f5;
    }
  }
}
</style>