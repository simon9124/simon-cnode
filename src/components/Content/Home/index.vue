<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <scroll-view scroll-x
                       class="tabs">
            <span class="breadcrumb-tab"
                  v-for="tabItem in tabList"
                  :key="tabItem.type"
                  @click="tab=tabItem.type;page=1;getData()"
                  :style="{color:tabItem.type===tab?'#fff':'#80bd01',
                         backgroundColor:tabItem.type===tab?'#80bd01':'transparent',
                         }">
              {{tabItem.title}}
            </span>
          </scroll-view>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'
           v-if="articles">

        <!-- 文章列表 -->
        <div class="cell relative"
             v-for="(article,i) in articles"
             :key="article.id">
          <img :src="article.author.avatar_url"
               @click="goToUser(article.author.loginname)">
          <div v-if="article.top||article.good||article.tab!==undefined"
               class="cell-tag"
               :style="{ background: article.top || article.good ? '#80bd01':'#e5e5e5',
                         color: article.top || article.good ? '#fff':'#999' }">
            {{article.top?'置顶':article.good?'精华':article.tab==='share'?'分享':article.tab==='ask'?'问答':article.tab==='job'?'招聘':article.tab==='dev'?'测试':''}}
          </div>
          <div class="cell-title"
               @click="goToArticle(i)">{{article.title}}
            <div class="cell-reply absolute">
              <span>{{article.reply_count}}</span>
              <span> / </span>
              <span>{{article.visit_count}}</span>
            </div>
          </div>
          <div class="cell-time absolute">{{article.last_reply_time}}</div>
        </div>

        <!-- 分页 -->
        <pagination :total="pages[tab]*limit"
                    :limit="limit"
                    :page="page"
                    @page-change="pageChange"></pagination>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// components
import Pagination from "@/components/pagination"; // 组件：分页
// data
import { tabList } from "@/common/data";
// function
import { getTimeFromNow } from "@/utils/filters";
// api
import { getHomeContent } from "@/api/content/index.js";

export default {
  components: { Pagination },
  data () {
    return {
      articles: null,// 文章列表
      tabList: tabList,// 主题列表
      pages: {
        all: 49,
        good: 18,
        share: 24,
        ask: 25,
        job: 9,
        dev: 30
      },// 每个主题分别对应的页数（找不到官方api，暂在此处写成固定值）
      tab: "all", // 当前主题分类：all/ask/share/job/good/dev
      page: 1,// 当前页码
      limit: 40 // 当前每一页的主题数量
    };
  },
  onLoad () {
    this.getData();
  },
  methods: {
    // 获取文章列表
    async getData () {
      wx.showLoading({
        title: "加载中"
      });
      this.articles = (await getHomeContent(
        this.tab,
        this.limit,
        this.page
      )).data;
      // 数据处理
      this.articles.map(article => {
        // 格式化时间："x分钟前"/"x小时前"/"x天前"/"x月前"...
        this.$set(
          article,
          "last_reply_time",
          getTimeFromNow(article.last_reply_at)
        );
      });
      wx.hideLoading();
    },
    // 分页
    pageChange (page) {
      this.page = page;
      this.getData();
    },
    // 页面跳转 - article
    goToArticle (i) {
      wx.navigateTo({
        url: `/pages/article/main?id=${this.articles[i].id}`
      });
    },
    // 页面跳转 - user
    goToUser (name) {
      wx.navigateTo({
        url: `/pages/user/main?name=${name}`
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
.container-content-common /deep/ {
  .tabs {
    width: 100%;
    position: relative;
    white-space: nowrap;
    border: none !important;
  }
  .container-content-common-content {
    padding: 0;
    border-top: none;
  }
}
</style>
