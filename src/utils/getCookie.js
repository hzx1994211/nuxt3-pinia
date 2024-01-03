import {
  v4 as uuidv4
} from 'uuid';

import {
  useCookie
} from "nuxt/app";
export const getUUID = () => {
  // 先从本地存储获取uuod
  let uuid_token = useCookie('UUIDTOKEN');
  // 如果没有则生成
  if (!uuid_token.value) {
    // 生成游客临时身份
    uuid_token.value = uuidv4();
  }
  // 切记要有返回值，没有则是undefined
  return uuid_token.value;
};

//获取token
export const getUseCookie = (type,value) => {
  let key = useCookie(type);
  if (!key.value) {
    key.value = value;
  }
  return key.value;
};