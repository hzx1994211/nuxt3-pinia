import { useUserStore } from '@/store';
import md5 from 'js-md5';
import { Base64 } from 'js-base64';
export function useSocketParam() {
  const userStore = useUserStore();
  const language = computed(() => userStore.language);
  const token = computed(() => userStore.token);
  const uuid_token = computed(() => userStore.uuid_token);
  const country = computed(() => userStore.country);
  const publicParams = ref({
    channel: 'h5',
    country: country.value,
    deviceId: uuid_token.value,
    lang: language.value,
    param: {},
    notifyPlate: 'YM',
    plateForm: 4, //1 ios 2安卓 3pc 4h5 5其它
    st: new Date().getTime(),
    token: token.value,
    version: 1,
  });

  const socketParams = (param) => {
    publicParams.value.param = param;
    const signKey = md5('aomotech');
    console.log(publicParams, '-publicParams-');
    const sign = md5('/football/socket' + JSON.stringify(publicParams.value) + signKey); //签名
    const connectParam = `jsonParam=${Base64.encode(
      JSON.stringify(publicParams.value)
    )}&sign=${sign}`;
    return {
      connectParam,
    };
  };

  return {
    socketParams,
  };
}
