//注册接口
export const confirmVerifyRegister = (params) => {
  return useHttpPost('/user/confirmVerifyRegister', params);
};

//获取找回密码 => 验证码
export const getRetrievePasswordCode = (params) => {
  return useHttpPost('/user/getRetrievePasswordCode', params);
};

//用户登录
export const login = (params) => {
  return useHttpPost('/user/login', {
    ...params,
    $: true,
  });
};

//忘记密码 => 修改密码
export const modifyPassword = (params) => {
  return useHttpPost('/user/modifyPassword', params);
};

//获取用户注册 => 验证码
export const register = (params) => {
  return useHttpPost('/user/register', params);
};

//退出
export const userLogout = (params) => {
  return useHttpPost('/user/userLogout', params);
};

//验证找回密码 => 验证码
export const verifyRetrievePasswordCode = (params) => {
  return useHttpPost('/user/verifyRetrievePasswordCode', params);
};

//获取验证码接口 => 统一接口
export const getVerificationCode = (params) => {
  return useHttpPost('/user/getVerificationCode', params);
};

//核查验证码接口
export const checkVerificationCode = (params) => {
  return useHttpPost('/user/checkVerificationCode', params);
};

//绑定邮箱接口
export const userBindEmail = (params) => {
  return useHttpPost('/user/bindEmail', params);
};

//用户信息
export const getUserInfor = (params) => {
  return useHttpPost('/user/getPersonalInformationByQuery', params);
};
//修改密码
export const setOrModifyPassword = (params) => {
  return useHttpPost('/user/setOrModifyPassword', params);
};
//修改个人信息
export const modifyInfor = (params) => {
  return useHttpPost('/user/modifyPersonalInformation', params);
};

//关注列表
export const getFollowMatch = async (params) => {
  return await useHttpPost('/match/follow/getFollowMatch', params);
};

//关注的主播列表
export const getFavoriteStreamer = async (params) => {
  return await useHttpPost('/live/broadcast/subscribe/favoriteStreamer', params);
};

//关注的动态
export const getSubscribedArchorArticle = async (params) => {
  return await useHttpPost('/user/article/subscribedArchorArticle', params);
};
//获取默认国家地区
export const getConfigs = () => {
  return useHttpPost('/config/v1/configs', {
    $: true,
  });
};
//语言地区列表初始化、切换
export const getSwitchLang = async () => {
  return await useHttpPost('/config/v1/switchLang', {
    $: true,
  });
};