// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from "vite";
const envScript = process.env.npm_lifecycle_script.split(" ");
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, "env");
export default defineNuxtConfig({
  publicRuntimeConfig: envData, // 把env放入这个里面，通过useRuntimeConfig获取
  srcDir: "src/",
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/default.scss";',
        },
      },
    },
    envDir: "~/env", // 指定env文件夹
  },
  css: [
    '@/assets/styles/app.scss',
  ],
  server: {
    open: true,
    autoOpenBrowser: true,
  },
});
