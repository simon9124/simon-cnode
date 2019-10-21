<template>
  <div class="container-content">
    <div class="container-content-inner">

      <!-- 内容滑块 -->
      <swiper duration="300"
              circular
              :skip-hidden-item-layout="true"
              :current="currentTab"
              class="swiper-box">
        <swiper-item>
          <home-page></home-page>
        </swiper-item>
        <swiper-item>
          <new-page></new-page>
        </swiper-item>
        <swiper-item>
          <api-page></api-page>
        </swiper-item>
        <swiper-item>
          <about-page></about-page>
        </swiper-item>
        <swiper-item>
          <register-page></register-page>
        </swiper-item>
        <swiper-item>
          <login-page></login-page>
        </swiper-item>
      </swiper>

    </div>
  </div>
</template>

<script>
// function
import Bus from '@/utils/bus';
// components
import HomePage from '@/components/Content/Home';
import NewPage from '@/components/Content/new';
import ApiPage from '@/components/Content/api';
import AboutPage from '@/components/Content/about';
import RegisterPage from '@/components/Content/register';
import LoginPage from '@/components/Content/login';

export default {
  components: {
    HomePage,
    NewPage,
    ApiPage,
    AboutPage,
    RegisterPage,
    LoginPage
  },
  data() {
    return {
      // 当前所在滑块 index
      currentTab: 3
    };
  },
  created() {
    // 接收兄弟组件事件 - 标签切换
    Bus.$on('tabChange', index => {
      this.currentTab = index;
    });
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
</style>
