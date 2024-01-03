<template>
  <div class="live_anchor_warp">
    <ul class="live_list" v-if="liveS.length > 0">
      <li v-for="item in liveS" class="item" :key="item.userId" @click="handleClick(item)">
        <div class="item_img">
          <span class="item_type">{{
            $t(`Home.${TYPR_LIST[Number(item.broadcastCategory)]}`)
          }}</span>
          <img v-lazy="item.liveCover" alt="" />
          <div class="item_user">
            <span class="user_name">{{ item.userName }}</span>
            <div class="hot">
              <svgIcon name="hot" :size="10" />
              <span class="hotk">{{ item.hotK }}</span>
            </div>
          </div>
        </div>
        <div class="item_title text-ellipsis">{{ item.liveTitle }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { LiveListItem } from './type';
  import { Ref } from 'vue';
  import { TYPR_LIST } from './constant';
  const router = useRouter();
  const props = defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  });
  const liveS: Ref<Array<LiveListItem> | any> = ref([]);

  watch(
    () => props.list,
    (v) => {
      if (v) liveS.value = v;
    },
    {
      immediate: true,
    }
  );

  const handleClick = (item: LiveListItem) => {
    router.push({ name: 'landingPage' });
  };
</script>
<style lang="less" scoped>
  .live_anchor_warp {
    .live_list {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: calc(50% - 4px);
        margin: 8px 8px 0 0;
        background-color: #fff;
        box-sizing: border-box;
        .item_img {
          position: relative;
          width: 100%;
          height: 153px;
          .item_type {
            position: absolute;
            top: 5px;
            left: 5px;
            display: inline-block;
            padding: 2px 6px;
            background: #2e6bc4;
            border-radius: 9px;
            font-size: 12px;
            color: #ffffff;
          }
          img {
            width: 100%;
            height: 153px;
            object-fit: cover;
            border-radius: 6px 6px 0px 0px;
          }
          .item_user {
            width: 100%;
            padding: 6px 5px;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
            position: absolute;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ffffff;
            font-size: 10px;
            .hot {
              display: flex;
              align-items: center;
              .hotk {
                margin-left: 5px;
              }
            }
          }
        }

        &:nth-child(2n) {
          margin-right: 0px;
        }
        .item_title {
          padding: 10px 8px;
          font-size: 12px;
          color: #000000;
        }
      }
    }
  }
</style>
