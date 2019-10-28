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

        <wxParse v-if="article"
                 :content="article.content">
        </wxParse>

      </div>

    </scroll-view>

  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse';
// api
import { getArticle } from '@/api/article/index.js';

export default {
  components: { wxParse },
  data() {
    return {
      article: null
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    async getData() {
      this.article = (await getArticle('5cbfd9aca86ae80ce64b3175')).data;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
</style>
