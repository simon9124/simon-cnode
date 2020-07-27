<template>
  <span class="breadcrumb-dashboard"
        @click="goBackHome">主页</span>
</template>

<script>
// function
import Bus from "@/utils/bus";
import appJson from "@/app.json";

export default {
  methods: {
    goBackHome () {
      var pages = getCurrentPages(); //当前页面
      // console.log(pages[pages.length - 1]);
      if (pages[pages.length - 1].route === appJson.homePage) {
        // 在主页：切换标签回home -> 传递给兄弟组件
        Bus.$emit("tabChange", 0);
        // 登录页面切换回 "isLogin" 状态
        Bus.$emit("isLogin", true);
      } else {
        // 不在主页：页面返回 - home
        wx.reLaunch({
          url: "/pages/index/main"
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
