<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <home-back></home-back>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>Node.js 新手入门</span>
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

            <!-- 副标题下属内容 -->
            <div class="txt">

              <!-- 链接名称 -->
              <p class="article bold">{{topic.txt}}</p>

              <!-- 链接地址 -->
              <p v-if="topic.example!==undefined">
                <a :href="topic.example">{{topic.example}}</a>
              </p>

            </div>
          </div>

          <!-- 主标题下属内容：txt_main -->
          <div v-if="item.txt_main!==undefined"
               class="txt txt-content">
            <p v-html="item.txt_main">
            </p>
          </div>

        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// components
import HomeBack from "@/components/homeBack"; // 组件：返回首页
// mockData
import { NewData } from "./mockContent";

export default {
  components: { HomeBack },
  data () {
    return {
      content: NewData
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
