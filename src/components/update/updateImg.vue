<template>
  <div class="update-img">
    <input
      ref="uploadInput"
      :class="className"
      @change="handleChange"
      id="camera"
      type="file"
      accept="image/*"
    />

    <van-popup v-model:show="imgShow" :style="{ height: '50%' }">
      <div class="img-corpper">
        <!-- 图片裁切插件 -->
        <VuePictureCropper :boxStyle="boxStyle" :img="pic" :options="options" />
        <div class="img-corpper-btn">
          <span class="cancell" @click="clear">取消</span>
          <span class="confirm" @click="getResult">确定</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-nocheck

  import { useToast } from '@/hooks/useToast';
  import { useI18n } from 'vue-i18n';

  import { uploadPicture } from '@/api/common';
  import VuePictureCropper, { cropper } from 'vue-picture-cropper';

  const props = defineProps({
    className: {
      type: String,
      default: '',
    },
    boxStyle: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          margin: 'auto',
        };
      },
    },
    options: {
      type: Object,
      default: () => {
        return {
          viewMode: 1,
          dragMode: 'crop',
        };
      },
    },
  });

  const { toastMsg, loading, closeLoading } = useToast();
  const { t } = useI18n();
  const emit = defineEmits(['updateChangeImg']);
  const pic = ref('');
  const uploadInput = ref<HTMLInputElement | null>(null);
  const imgShow = ref(false);

  const handleChange = async (e: any) => {
    const isLt5M = e.target.files[0].size / 1024 / 1024 < 5;

    if (!isLt5M) return toastMsg(t('User.imageSize'));

    // 如果有多个裁剪框，也需要重置掉裁剪目标的值，避免使用同一张图片无法触发watch
    pic.value = '';
    // 获取选取的文件
    const target = e.target as HTMLInputElement;
    const { files } = target;
    if (!files) return;
    const file: File = files[0];
    // 转换为base64传给裁切组件
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => {
      // 更新裁切弹窗的图片源
      pic.value = String(reader.result);
      // 显示裁切弹窗
      imgShow.value = true;
      // 清空已选择的文件
      if (!uploadInput.value) return;
      uploadInput.value.value = '';
    };
  };

  const getResult = async (): Promise<void> => {
    // 获取生成的file文件信息
    const file = await cropper.getFile();
    try {
      const param = {
        file: file,
        pictureType: 'validDocuments',
      };
      loading();
      const { code, data, msg } = await uploadPicture(param);
      const flag = code == 200;
      if (flag) {
        imgShow.value = false;
        pic.value = '';
        emit('updateChangeImg', data.pictureUrl);
      } else {
        closeLoading();
        toastMsg(msg, 400);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clear = (): void => {
    imgShow.value = false;
    pic.value = '';
    cropper.clear();
    cropper.reset();
  };
</script>

<style lang="less" scoped>
  .update-img {
    height: 100%;
    font-size: 16px;
    background-color: #edf1f5;
    color: #000000;
    .input {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      cursor: pointer;
      height: 100%;
    }
    :deep(.cropper-bg) {
      background-image: none !important;
    }
  }

  .img-corpper {
    width: 100vw;
    height: 100%;
    background-color: #000000;
    position: relative;
    .img-corpper-btn {
      padding: 0 20px;
      z-index: 9999;
      color: #fff;
      position: absolute;
      bottom: 10px;
      width: 100vw;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .confirm {
        width: 68px;
        height: 32px;
        background: #2e6bc4;
        text-align: center;
        line-height: 32px;
        border-radius: 6px;
      }
    }
  }
</style>
