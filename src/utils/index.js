/* eslint-disable prefer-const */
import dayjs from 'dayjs';
import {
  getCurrentInstance
} from 'vue';

export const toPhoneCall = (mobile) => {
  const url = `tel:${mobile}`;
  window.location.href = url;
};

/**
 * 动态设置css全局变量实现旋转
 * transform: rotate(var(--image-rotate))
 * @param deg 旋转角度
 * @param prop css变量, 默认'--image-rotate'
 */
export const setRotate = (deg, prop = '--image-rotate') => {
  let rotate = document.documentElement.style.getPropertyValue(prop) || '0deg';
  if (typeof deg === 'string') {
    rotate = deg;
  } else {
    rotate = parseInt(rotate) + 90 + 'deg';
  }
  document.documentElement.style.setProperty(prop, rotate);
};

/**
 * 动态获取当前日期
 * @param type 过去atd 未来btd
 * @param dateArr 获取未来[1,2,3]/过去的数据[-1,-2,-3]
 * @returns [{date: '2023-04-06', week: '星期四'},{date: '2023-04-06', week: '星期四'}]
 */
export const getDateWeek = (type, dateArr) => {
  //获取当天日期
  const td = dayjs().format('YYYY-MM-DD');
  const filterWeek = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  const tdWeek = `星期${filterWeek[new Date(td).getDay()]}`;
  //默认当天
  const arrDate = [{
    date: td,
    week: tdWeek
  }];
  dateArr.forEach((item) => {
    const date =
      type == 'atd' ?
      dayjs().add(item, 'day').format('YYYY-MM-DD') :
      dayjs().subtract(item, 'day').format('YYYY-MM-DD');
    const week = `星期${filterWeek[new Date(date).getDay()]}`;
    type == 'atd' ? arrDate.unshift({
      date,
      week
    }) : arrDate.push({
      date,
      week
    });
  });
  return arrDate;
};

export const getLocal = (type) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(type);
  }

};
export const setLocal = (type, content) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(type, content);
  }

};
export const removeLocal = (type) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(type);
  }
};

// 节流
// eslint-disable-next-line @typescript-eslint/ban-types
export const throttle = (fn, time) => {
  let timer = null;
  time = time || 1000;
  return function (...args) {
    if (timer) {
      return;
    }

    const _this = getCurrentInstance();
    timer = setTimeout(() => {
      timer = null;
    }, time);
    fn.apply(_this, args);
  };
};

// 防抖
export const debounce = (fn, time) => {
  time = time || 200;
  // 定时器
  let timer = null;
  return function (...args) {
    const _this = getCurrentInstance();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(_this, args);
    }, time);
  };
};

export const judgeBrand = (sUserAgent) => {
  const isIphone = sUserAgent.match(/iphone/i) == 'iphone';
  const isHuawei = sUserAgent.match(/huawei/i) == 'huawei';
  const isHonor = sUserAgent.match(/honor/i) == 'honor';
  const isOppo = sUserAgent.match(/oppo/i) == 'oppo';
  const isOppoR15 = sUserAgent.match(/pacm00/i) == 'pacm00';
  const isVivo = sUserAgent.match(/vivo/i) == 'vivo';
  const isXiaomi = sUserAgent.match(/mi\s/i) == 'mi ';
  const isXiaomi2s = sUserAgent.match(/mix\s/i) == 'mix';
  const isRedmi = sUserAgent.match(/redmi/i) == 'redmi';
  const isSamsung = sUserAgent.match(/sm-/i) == 'sm-';
  const isLG = sUserAgent.match(/lg/i) == 'lg';
  if (isIphone) {
    return 'iPhone';
  } else if (isHuawei || isHonor) {
    return 'Huawei';
  } else if (isOppo || isOppoR15) {
    return 'Oppo';
  } else if (isVivo) {
    return 'vivo';
  } else if (isXiaomi || isRedmi || isXiaomi2s) {
    return 'mi';
  } else if (isSamsung) {
    return 'Samsung';
  } else if (isLG) {
    return 'LG';
  } else {
    return 'h5';
  }
};

//入参排序
export const objKeySort = (arys) => {
  if (!arys) return {}
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newkey = Object.keys(arys).sort();
  const newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]] ? arys[newkey[i]] : '';
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
};

//调用h5相机/相册
export const getH5Photograph = (eleId, canvasId, cb) => {
  const camera = document.getElementById(eleId);
  const canvas = document.getElementById(canvasId);

  camera.addEventListener('change', handleChange);

  function handleChange(e) {
    const file = e.target.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
      const {
        result
      } = reader;
      img.src = result;
      img.onload = function () {
        const context = canvas.getContext('2d');
        context.scale(0.4, 0.4);
        canvas.width = img.width * 0.4;
        canvas.height = img.height * 0.4;
        canvas.style.display = 'inline-block';
        context.drawImage(img, 0, 0, img.width * 0.4, img.height * 0.4);
        /**
         * 返回一个包含图片展示的 data URI
         *  - 第一个参数为图片格式，默认为 image/png
         *  - 第二个参数，在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间         *    内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略
         *
         * 所以可以通过第二个参数控制画质
         **/
        const imgDataURI = canvas.toDataURL(file.type, 0.5);
        // 转文件流以便上传
        const blob = dataURLtoBlob(imgDataURI);
        cb(blob, file);
      };
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  /**
   * 将 dataUrl 转为 blob 格式
   */
  function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }
};

/**
 * 解决路由返回不生效  ps:返回的时候在手机上 不刷新
 * 临时解决方案
 */
export const fixGoBack = (router) => {
  router.back();
};