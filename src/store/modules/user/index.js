import {
  defineStore
} from 'pinia';
import {
  getUUID
} from '~~/src/utils/getCookie';
import {
  setLocal,
  getLocal,
  removeLocal
} from '@/utils';

const getToken = getLocal('token');
const getUserInfo = getLocal('userInfo');
const getEmail = getLocal('email');

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      uuid_token: getUUID(), //临时游客
      language: 'zh', //国际化语音  zh en
      country: 'CN', //国家
      warningAudioDom: null,
      index: 0,
      date: '', //日期
      infor: {},
      email: {},
    };
  },

  actions: {
    updateAudioDom(dom) {
      this.warningAudioDom = dom;
    },
    updateIndex(index) {
      this.index += Number(index);
    },
    //更新国际化语言
    updateAudioLanguage(index) {
      this.language = index;
    },
    updateDate(date) {
      this.date = date;
    },
    updateUserInfor(info) {
      setLocal('userInfo', JSON.stringify(info));
      setLocal('token', info.token);
      this.infor = info;
      this.token = info.token;
    },

    //修改头像和昵称
    modifyUserInfor(info) {
      console.log(info, '---ddd');
      const user = {
        ...this.infor,
        ...info,
      };
      this.infor = user;
      setLocal('userInfo', JSON.stringify(this.infor));
    },

    removeUserInfor() {
      this.infor = null;
      this.token = null;
      removeLocal('userInfo');
      removeLocal('token');
    },
    updateEmail(email) {
      setLocal('email', JSON.stringify(email));
      this.email = email;
    },
    removeEmail() {
      removeLocal('email');
      this.email = null;
    },
  },
});