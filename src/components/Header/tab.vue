<template>
  <scroll-view class="tabs"
               scroll-x>

    <!-- 标签 -->
    <view v-for="(item,index) in navList"
          :key="index"
          class="tabs-item"
          :data-current="index"
          @tap="swichNav(index)">
      {{item.title}}
    </view>

  </scroll-view>
</template>

<script>
// function
import Bus from '@/utils/bus';
import { navList } from '@/common/data.js';

export default {
  data() {
    return {
      // 标签list
      navList: navList
    };
  },
  methods: {
    // 切换标签 -> 传递给兄弟组件
    swichNav(index) {
      Bus.$emit('tabChange', index);
      // 登录页面切换回 "isLogin" 状态
      Bus.$emit('isLogin', true);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs {
  width: 100%;
  position: relative;
  white-space: nowrap;
  &-item {
    font-size: 13px;
    color: #fff;
    padding: 10px 15px;
    text-align: center;
    display: inline-block;
  }
}
</style>
