import {
  showToast
} from 'vant';
import {
  judgeBrand,
  objKeySort
} from '@/utils'
import {
  getUUID,
  getUseCookie
} from '@/utils/getCookie'

import md5 from 'js-md5';
//请求体封装
function useGetFetchOptions(options = {}) {
  const config = useRuntimeConfig();
  const baseURL = config.public.VITE_APP_API_BASE_URL;
  // 用户登录，默认传token
  const token = getUseCookie("token") ?? ''
  const publicParams = {
    channel: judgeBrand(navigator.userAgent.toLowerCase()), //渠道 华为 vivo
    country: getUseCookie('country') ?? 'CN', //国家(全局)ZH/US
    deviceId: getUUID(), //设备id
    lang: getUseCookie('lang') ?? 'ZH-CN', //zh中文 en英文 3粤语 后续添加
    notifyPlate: 'YM', //推送平台标识 友盟、极光等
    param: ['string', 'number'].includes(typeof config.data) ? options.data : objKeySort(options.data ?? ''),
    plateForm: 4, //1 ios 2安卓 3pc 4h5 5其它
    st: new Date().getTime(), //时间戳
    token: token ? token : '',
    version: 1, //版本号
  };
  options.baseURL = baseURL
  const signKey = md5('aomotech');
  const sign = md5(options.url + JSON.stringify(publicParams) + signKey);
  options.headers = {
    ...options.headers,
    sign
  }
  options.body = {
    ...publicParams,
  };

  return options
}

//http请求封装
export async function useHttp(url, options = {}) {
  options = useGetFetchOptions(options)
  if (options.$) {
    const data = ref(null)
    const error = ref(null)
    //客户端请求
    return await $fetch(url, options).then(res => {
      data.value = res
      let errMessage = '';
      switch (res.code) {
        case 400:
          errMessage = res.msg;
          break;
        case 500:
          errMessage = res.msg;
          break;
        case 1001:
          errMessage = res.msg;
          break;
      }
      if (errMessage) {
        showToast(errMessage, 400);
      }
      return res
    }).catch(err => {
      const msg = err?.data?.data
      if (process.client) {
        showToast(msg || '服务端错误')
      }
      error.value = msg
      return {
        data,
        error
      }
    })
  }
  //服务端
  let res = await useFetch(url, {
    ...options,
    // 相当于响应拦截器
    transform: (res) => {
      return res
    },
  })

  // 客户端错误处理
  if (process.client && res.error.value) {
    const msg = res.error.value?.data?.data
    showToast(msg || '服务端错误')
  }
  let errMessage = '';
  switch (res.code) {
    case 400:
      errMessage = res.msg;
      break;
    case 500:
      errMessage = res.msg;
      break;
    case 1001:
      errMessage = res.msg;
      break;
  }
  if (errMessage) {
    showToast(errMessage, 400);
  }
  return res
}

// GET请求
export function useHttpGet(url, options = {}) {
  options.method = "GET"
  return useHttp(url, options)
}

// POST请求
export function useHttpPost(url, options = {}) {
  options.method = "POST"
  return useHttp(url, options)
}