<template>
  <div class="container-content-common">

    <scroll-view scroll-y
                 :scroll-top="scrollTop"
                 scroll-with-animation
                 @scroll="scroll">

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <home-back></home-back>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>关于</span>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'>

        <!-- 动态内容 -->
        <div class="block"
             v-for="(item,index) in content"
             :key="item.title_main">

          <!-- 主标题 -->
          <div class="title title-main bold">{{item.title_main}}</div>

          <!-- 主标题下属内容：topic -->
          <div v-for="(topic,_index) in item.topic"
               :key="_index">
            <div class="txt txt-content">
              <p v-html="topic"></p>
            </div>
          </div>

        </div>

      </div>

    </scroll-view>

    <back-to-top :backToTopDisplay="backToTopDisplay"
                 @back-top="scrollTop=10;scrollTop=0">
    </back-to-top>

  </div>
</template>

<script>
// components
import HomeBack from "@/components/homeBack"; // 组件：返回首页
import BackToTop from "@/components/backToTop"; // 组件：回到顶部
// mockData
import { AboutData } from "./mockContent";

export default {
  components: { HomeBack, BackToTop },
  data () {
    return {
      content: AboutData,
      propsContent: null
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
.container-content-common /deep/ {
  .container-content-common-content {
    .title-main {
      margin-bottom: 0;
    }
  }
}
</style>
