<template>
  <div v-for="p in 3" :key="p">
    <div class="regard_item_top">
      <div class="regard_item_l">
        <p class="regard_item_logo"></p>
        <p class="regard_item_text"> </p>
      </div>
    </div>
    <div class="home_box">
      <div class="regard_item_content" v-for="item in 3" :key="item">
        <div class="content_box">
          <ul class="time">
            <li class="time-top"></li>
            <li class="time-bot"> </li>
          </ul>
          <div class="info">
            <ul class="info-box" v-for="k in 2" :key="k">
              <li :class="['info-img', k == 1 ? 'mg_4' : '']"></li>
              <li class="info_rival_text"> </li>
            </ul>
          </div>
        </div>
        <div class="collection">
          <svgIcon name="shoucang" :size="20" color="#CDD0E0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .regard_item_top {
    display: flex;
    justify-content: space-between;

    padding: 12px 14px 8px 14px;
    .regard_item_l {
      display: flex;
      align-items: center;
      color: #808080;
      .regard_item_logo {
        width: 30px;
        height: 30px;
        margin-right: 14px;
        background: #edf1f5;
        object-fit: contain;
        border-radius: 50%;
      }
      .regard_item_text {
        width: 229px;
        height: 14px;
        background: #edf1f5;
      }
    }
  }
  .home_box {
    .regard_item_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px 10px 10px;
      border-bottom: 1px solid #eaeaea;
      .content_box {
        display: flex;

        .time {
          margin-right: 10px;
          color: #808080;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .time-top {
            width: 30px;
            height: 14px;
            background: #edf1f5;
          }
          .time-bot {
            margin-top: 4px;
            width: 18px;
            height: 14px;
            background: #edf1f5;
          }
        }
        .info {
          .info-box {
            display: flex;
            align-items: center;
          }
          .info-img {
            width: 22px;
            height: 22px;
            margin-right: 5px;
            background: #edf1f5;
            border-radius: 50%;
          }
          .mg_4 {
            margin-bottom: 4px;
          }
          .info_rival_text {
            width: 150px;
            height: 16px;
            background: #edf1f5;
          }
        }
      }
    }
    .collection {
      text-align: center;
    }
  }
</style>
