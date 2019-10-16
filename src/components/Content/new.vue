<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <span href='/'
                class="breadcrumb-dashboard">主页</span>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>新手入门</span>
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

          <div class="title title-main bold"
               style="margin-bottom:15px">Node.js 服务器</div>
          <div class="txt">
            <p>新手搭建 Node.js 服务器，推荐使用无需备案的
              <a href="https://www.digitalocean.com/">DigitalOcean(https://www.digitalocean.com/)</a>
            </p>
          </div>

        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// api
import { getContentApi } from '@/api/content/index.js';
// mockData
import { NewData } from './mockContent';

export default {
  data() {
    return {
      content: NewData
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      console.log((await getContentApi()).data);
      // this.content = (await getContentApi()).data;
      // console.log(this.content);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
.container-content-common /deep/ {
  .container-content-common-content {
    .title-main {
      margin-bottom: 0;
    }
  }
}
</style>
