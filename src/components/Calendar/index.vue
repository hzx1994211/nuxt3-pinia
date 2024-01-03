<template>
  <div>
    <vue-hash-calendar
      ref="calendar"
      v-model:visible="isShow"
      format="YY-MM-DD"
      @change="onChange"
      @click="onClick"
      :lang="lang"
    >
      <template #action>
        <div class="calendar_action">
          <div class="title">
            <div @click="today">{{ $t('day') }}</div>
            <div @click="emit('onCancelShow')">{{ $t('cancel') }}</div>
          </div>
          <div class="month">
            <div @click="lastMonth">
              <svgIcon
                class="arrow_o rotate_90"
                fill="rgb(255, 255, 255)"
                name="jiantou"
                :size="14"
              />
            </div>
            <div>{{ formDate }}</div>
            <div @click="nextMonth">
              <svgIcon
                class="arrow_o rotate_270"
                fill="rgb(255, 255, 255)"
                name="jiantou"
                :size="14"
              />
            </div>
          </div>
        </div>
      </template>
    </vue-hash-calendar>
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue';
  import { useUserStore } from '@/store';

  const props = defineProps({
    isShow: {
      type: Boolean,
      defalut: false,
    },
  });

  const isShow = computed(() => props.isShow);
  const { proxy }: any = getCurrentInstance();
  const lang: Ref<string | any> = ref('CN');
  const userStore = useUserStore();
  const calendar: any = ref(null);
  const formDate = computed(() => userStore.date);
  const emit = defineEmits(['onCancelShow']);
  const lastMonth = () => {
    calendar.value.lastMonth();
  };
  const nextMonth = () => {
    calendar.value.nextMonth();
  };
  const today = () => {
    calendar.value.today();
    emit('onCancelShow');
    userStore.updateDate(proxy.$dayjs().format('YYYY-MM-DD'));
  };
  const onChange = (data: any) => {
    userStore.updateDate(data);
  };
  const onClick = () => emit('onCancelShow');
</script>
<style lang="less" scoped>
  .calendar_action {
    background-color: #ffffff;
    width: 100%;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #f7f7f7;
    }
    .month {
      display: flex;
      padding: 10px 32px;
      justify-content: space-between;
      .rotate_90 {
        transform: rotate(90deg);
      }
    }
  }
</style>
