<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <span href='/'
                class="breadcrumb-dashboard">主页</span>
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
              <rich-text class="article"
                         :nodes="topic"
                         @tap="navigate"></rich-text>
              <p v-html="topic"></p>
            </div>
          </div>

        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// mockData
import { AboutData } from "./mockContent";

export default {
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
