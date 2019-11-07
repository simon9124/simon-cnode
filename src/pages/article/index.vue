<template>
  <div class="container">

    <!-- header -->
    <header-container></header-container>

    <!-- content -->
    <div class="container-content-common">

      <scroll-view scroll-y>

        <!-- content -->
        <div class='container-content-common-content'
             v-if="article">

          <!-- 标题 -->
          <div>
            <div class="cell-tag"
                 :style="{ background: article.top || article.good ? '#80bd01':'#e5e5e5',
                         color: article.top || article.good ? '#fff':'#999' }">
              {{article.top?'置顶':article.good?'精华':article.tab==='share'?'分享':article.tab==='ask'?'问答':article.tab==='job'?'招聘':''}}
            </div>
            <div class="article-title line-block">{{article.title}}</div>
          </div>
          <div>
            <div class="cell-time">发布于{{article.last_reply_time}}</div>
            <div class="cell-time">作者{{article.author.loginname}}</div>
            <div class="cell-time">{{article.visit_count}}次浏览</div>
            <div class="cell-time">来自{{article.tab}}</div>
          </div>

          <hr>

          <!-- 内容 -->
          <wxParse :content="article.content">
          </wxParse>

          <!-- 回复 -->

        </div>

      </scroll-view>

    </div>

  </div>
</template>

<script>
// components
import HeaderContainer from '@/components/Header';
// plugin
import wxParse from 'mpvue-wxparse';
// api
import { getArticle } from '@/api/article/index.js';

export default {
  components: { HeaderContainer, wxParse },
  data() {
    return {
      article: null
    };
  },
  created() {
    this.getData();
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
@import "~@/common/article.scss";
.container /deep/ {
  .container-content-common-content {
    padding: 0 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
  }
}
</style>
