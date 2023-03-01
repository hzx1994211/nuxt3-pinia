import { createI18n } from 'vue-i18n'
import en_us from '../lang/en/en.js'
import zh_cn from '../lang/zh/zh.js'


// const i18n = {
//   locales: ['en', 'zh'],//有多少地区的语言就添加多少种
//   defaultLocale: 'en',//默认的地区语言
//   vueI18n: {
//     fallbackLocale: 'en',//回退策略，指定的locale中没有找到对应资源的情况下使用的locale
//     messages: { //要渲染的信息，有多少语言就添加多少种
//       en: en_us,
//       zh: zh_cn
//     }
//   }

// }

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh', //Cookies.get('lang') || 'zh'
    warnHtmlMessage: false,
    messages: { //要渲染的信息，有多少语言就添加多少种
        en: en_us,
        zh: zh_cn
      }
})



export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(i18n);
})
