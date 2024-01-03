<template>
  <div class="emial-inpt">
    <van-field
      v-model.trim="userEmail"
      :type="inputType"
      @focus="handleFocus()"
      @blur="handleBlur"
      @change="handleChange"
      @clear="handleClear"
      :class="[
        isUserEmail ? 'field__body__color' : '',
        emailFocus ? 'field__input__border__color' : '',
      ]"
      :clearable="typeName == 'text'"
      :placeholder="placeholder"
    >
      <template #button v-if="isIcon">
        <van-icon @click="onShowPassword" :name="showPassword ? 'eye-o' : 'closed-eye'" />
      </template>
    </van-field>
    <p v-if="tipText != ''">{{ tipText }}</p>
    <ul class="email-box" v-show="isEmailBox && emailBoxFlag">
      <li
        class="text-ellipsis"
        @click="changeEmail(filterEmailText, item)"
        v-for="item in emailList"
        :key="item"
      >
        {{ filterEmailText }} {{ item }}</li
      >
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    //value
    email: {
      type: String,
      default: '',
    },
    //input类型
    typeName: {
      type: String,
      default: 'text',
    },
    //校验边框
    isUserEmail: {
      type: Boolean,
      default: false,
    },
    //提示语
    tipText: {
      type: String,
      default: '',
    },
    //默认文字
    placeholder: {
      type: String,
      default: '',
    },
    //是否展示邮箱下拉框
    isEmailBox: {
      type: Boolean,
      default: false,
    },
    //是否需要展示Icon
    isIcon: {
      type: Boolean,
      default: false,
    },
  });

  watch(
    () => props.email,
    (val) => {
      userEmail.value = val;
    }
  );
  watch(
    () => props.typeName,
    (val) => {
      nextTick(() => {
        inputType.value = val;
      });
    },
    {
      immediate: true,
    }
  );
  const userEmail = ref('');

  const emit = defineEmits(['updateEmail']);
  const emailBoxFlag = ref(false);
  const emailFocus = ref(false);
  const showPassword = ref(false);
  const inputType = ref<any>('text');
  const emailList = [
    '@qq.com',
    '@163.com',
    '@126.com',
    '@gmail.com',
    '@sina.com',
    '@hotmail.com',
    '@outlook.com',
    '@icloud.com',
  ];

  const filterEmailText = computed(() => {
    const textS = userEmail.value.split('@');

    return textS ? textS[0] : textS;
  });

  const onShowPassword = () => {
    showPassword.value = !showPassword.value;
    inputType.value = showPassword.value ? 'text' : 'password';
  };

  const handleClear = () => emit('updateEmail', '');
  const handleChange = (targer: any) => {
    const { value } = targer.target;
    emit('updateEmail', value);
  };
  const changeEmail = (text: string, item: string) => {
    emit('updateEmail', `${text}${item}`);
  };

  const handleBlur = () => {
    emailFocus.value = false;
    setTimeout(() => {
      emailBoxFlag.value = false;
    });
  };
  const handleFocus = () => {
    emailFocus.value = true;
    emailBoxFlag.value = true;
  };
</script>

<style lang="less" scoped>
  .emial-inpt {
    margin-bottom: 30px;
    font-size: 12px;

    color: #808080;
    position: relative;
    p {
      margin-top: 8px;
    }

    .email-box {
      position: absolute;
      top: 45px;
      width: 100%;
      background: #fff;
      z-index: 99;
      border: 1px solid #d3d4d5;
      border-radius: 10px;
      // padding: 10px 0;
      li {
        padding: 6px 20px;
        &:hover {
          background: #e8e8e9;
        }
      }
    }
  }
</style>
