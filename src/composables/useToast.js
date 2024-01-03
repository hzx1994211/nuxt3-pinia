import {
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  closeToast
} from 'vant';

export function useToast() {
  const success = (msg) => {
    showSuccessToast(msg);
  };
  const fail = (msg) => {
    showFailToast(msg);
  };
  const toastMsg = (message, time = 0, p = 'bottom', duration = 2000) => {
    setTimeout(() => {
      showLoadingToast({
        message,
        position: p,
        duration,
      });
    }, time);
  };
  const loading = (msg = 'Loading...', duration = 2000) => {
    showLoadingToast({
      message: msg,
      forbidClick: true,
      duration,
    });
  };

  const closeLoading = () => {
    closeToast();
  };

  return {
    success,
    fail,
    loading,
    toastMsg,
    closeLoading,
  };
}