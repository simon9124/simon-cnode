<template>
  <scroll-view class="tabs"
               scroll-x>
    <view v-for="(item,index) in navList"
          :key="index"
          class="tabs-item"
          :data-current="index">{{item.title}}</view>
    <!-- @tap="swichNav" -->
  </scroll-view>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        { title: '首页', type: 'all' },
        { title: '新手入门', type: 'good' },
        { title: 'API', type: 'share' },
        { title: '关于', type: 'ask' },
        { title: '注册', type: 'job' },
        { title: '登录', type: 'dev' }
      ]
    };
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
