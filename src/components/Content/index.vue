<template>
  <div class="container-content">
    <div class="container-content-inner">

      <!-- 内容滑块 -->
      <swiper duration="300"
              circular
              skip-hidden-item-layout="true"
              :current="currentTab"
              class="swiper-box">
        <swiper-item>
          <div class="swiper-box-item">首页</div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-box-item">新手入门</div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-box-item">API</div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-box-item">关于</div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-box-item">注册</div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-box-item">登录</div>
        </swiper-item>
      </swiper>

    </div>
  </div>
</template>

<script>
// function
import Bus from '@/utils/bus';

export default {
  data () {
    return {
      // 当前所在滑块 index
      currentTab: 0
    };
  },
  created () {
    // 接收兄弟组件事件 - 标签切换
    Bus.$on('tabChange', index => {
      this.currentTab = index;
    });
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container-content {
  height: 100%;
  padding: 10px 5px;
  &-inner {
    background: #fff;
    border-radius: 5px;
    .swiper-box {
      display: block;
      width: 100%;
      overflow: hidden;
      &-item {
        // width: 355px;
        // height: 150px;
        // background: #000;
      }
    }
  }
}
</style>
