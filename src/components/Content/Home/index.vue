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

        <!-- 文章列表 -->
        <div class="cell relative"
             v-for="article in articles"
             :key="article.id">
          <img :src="article.author.avatar_url">
          <div class="cell-tag"
               :style="{ background: article.top || article.good ? '#80bd01':'#e5e5e5',
                         color: article.top || article.good ? '#fff':'#999' }">
            {{article.top?'置顶':article.good?'精华':article.tab==='share'?'分享':article.tab==='ask'?'问答':article.tab==='job'?'招聘':''}}
          </div>
          <div class="cell-title">{{article.title}}
            <div class="cell-reply absolute">
              <span>{{article.reply_count}}</span>
              <span> / </span>
              <span>{{article.visit_count}}</span>
            </div>
          </div>
          <div class="cell-time absolute"
               @click="timeClick">{{article.last_reply_time}}</div>
        </div>

        <!-- 分页 -->

      </div>

    </scroll-view>

  </div>
</template>

<script>
// function
import { getTimeFromNow } from '@/utils/filters';
// api
import { getHomeContent } from '@/api/content/index.js';

export default {
  data() {
    return {
      // 页码
      page: 1,
      // 每一页的主题数量
      limit: 20,
      // 主题分类：all/ask/share/job/good/dev
      tab: 'all',
      articles: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.articles = (await getHomeContent('', '', '')).data;
      // 数据处理
      this.articles.map(article => {
        this.$set(
          article,
          'last_reply_time',
          getTimeFromNow(article.last_reply_at)
        );
      });
    },
    go() {
      wx.navigateTo({
        url: '/pages/article/main?id=5cbfd9aca86ae80ce64b3175'
      });
    },
    timeClick() {
      console.log('1');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
.container-content-common /deep/ {
  .container-content-common-content {
    padding: 0;
  }
}
</style>
