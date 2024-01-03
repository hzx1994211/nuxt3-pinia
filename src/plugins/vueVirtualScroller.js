import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'; // 引入它的 css


export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueVirtualScroller);
})