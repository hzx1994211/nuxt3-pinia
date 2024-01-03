// https://nuxt.com/docs/api/configuration/nuxt-config
import {
  loadEnv
} from "vite";

import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import path from 'path'
const envScript = process.env.npm_lifecycle_script.split(" ");
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, "env");

const pathResolve = (dir) => path.resolve(__dirname, dir);

export default defineNuxtConfig({

  srcDir: "src/",
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1",
      title: "HolaSports",
      meta: [{
          name: "description",
          content: "HolaSports",
        },
        {
          name: "Keywords",
          content: "HolaSports",
        },
      ],
      // link: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],// icon
    },
  },

  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), './src/assets/svg')],
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/styles/default.less";',
        },
      },
    },
    envDir: "~/env", // 指定env文件夹

  },
  css: [
    '@/assets/styles/app.less',
  ],
  server: {
    open: true,
    autoOpenBrowser: true,
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", '@vant/nuxt', ],
  vant: {
    /** Options */
  },

  resolve: {
    alias: {
      '@': pathResolve('src'),

    },
  },
  /**
   * 定义 Runtime Config 公共变量 
   * 在客户端直接使用 process.env 访问环境变量是拿不到.env里的内容的，在服务端node环境才可以，
   * 所以一定得配合useRuntimeConfig来使用.env里的配置。
   */
  runtimeConfig: {
    // apiSecret 只能在服务器端上访问
    apiSecret: '123',
    // public 命名空间中定义的，在服务器端和客户端都可以普遍访问
    public: {
      ...envData, // 把env放入这个里面，通过useRuntimeConfig获取
    }
  },
  devServer: {
    port: 8001, //端口
    host: process.env.VITE_NODE_ENV == 'dev' ? 'localhost' : '0.0.0.0', // default: localhost  process.env.VITE_PACK_ENV == 'dev' ? 'localhost' : 
  },
  postcss: {
    // 这个工具可以实现自动添加CSS3前缀
    autoprefixer: {
      overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8'],
    },
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: (file) => {
          // 兼容vant 375px的默认值
          return file.indexOf('vant') !== -1 ? 375 : 390;
        }, // 设计稿的视口宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'], // 能转化为vw的属性列表
        viewportUnit: 'vw', // 希望使用的视口单位
        fontViewportUnit: 'vw', // 字体使用的视口单位
        selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, //  是否直接更换属性值，而不添加备用属性
        exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
      },
    },
  },
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    sourcemap: process.env.VITE_BUILD_SOURCEMAP === 'true',
    // minify默认esbuild，esbuild模式下terserOptions将失效
    // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: process.env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
        drop_debugger: true, // 去除 debugger
      },
    },
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
  },


});