<template>
  <div class="country" v-for="item in 19" :key="item">
    <ul class="country_box">
      <li class="country_logo"></li>
      <li class="country_title"></li>
      <li class="country_icon"></li>
    </ul>
    <div class="country_box">
      <span class="country_text"></span>
      <svgIcon name="arrow_o" :size="14" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .country {
    padding: 11px 18px 11px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #edf1f5;
    .country_box {
      display: flex;
      align-items: center;
    }

    .country_logo {
      width: 24px;
      height: 24px;
      display: inline-block;
      background: #edf1f5;
      border-radius: 50%;
      margin-right: 20px;
    }

    .country_title {
      width: 154px;
      height: 17px;
      background: #edf1f5;
      margin-right: 10px;
    }
    .country_icon {
      width: 17px;
      height: 17px;
      background: #edf1f5;
    }

    .country_text {
      display: inline-block;
      width: 37px;
      height: 17px;
      background: #edf1f5;
      margin-right: 10px;
    }
  }
</style>
