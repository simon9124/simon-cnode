<template>
  <div class="container">

    <!-- content -->
    <div class="container-content-common">

      <scroll-view scroll-y>

        <!-- header -->
        <div class='container-content-common-header'>
          <div class='breadcrumb'>
            <span href='/'
                  class="breadcrumb-dashboard">主页</span>
            <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
            <span></span>
          </div>
        </div>

        <!-- content -->
        <div class='container-content-common-content'
             v-if="userInfo">

          <!-- 动态内容 -->
          <!-- 123 -->
        </div>

        <!-- TA的创建 -->
        <div class="reply"
             v-if="userInfo">
          <div class="reply-count">TA的创建</div>

          <!-- 文章列表 -->
          <div class="cell relative"
               v-for="(article,i) in userInfo.recent_topicsTop5"
               :key="article.id">
            <img :src="article.author.avatar_url"
                 @click="goToUser(article.author.loginname)">
            <div class="cell-title"
                 @click="goToArticle(i)">{{article.title}}
            </div>
            <div class="cell-time absolute">{{article.last_reply_time}}</div>
          </div>

          <div class="reply-more">查看更多»</div>

        </div>

      </scroll-view>

    </div>
  </div>
</template>

<script>
// components
import HeaderContainer from "@/components/Header";
// function
import { getTimeFromNow } from "@/utils/filters";
// api
import { getUser } from "@/api/user/index.js";

export default {
  components: { HeaderContainer },
  data () {
    return {
      userInfo: null
    };
  },
  onLoad () {
    this.getData();
  },
  onUnload () {
    this.userInfo = null;
  },
  methods: {
    // 数据渲染
    async getData () {
      wx.showLoading({ title: "加载中" });
      const name = "hyj1991";
      // const { name } = this.$root.$mp.query;
      this.userInfo = (await getUser(name)).data;
      console.log(this.userInfo);

      /* 数据处理 */
      // 1.本页只获取前5篇文章
      this.userInfo.recent_topicsTop5 =
        this.userInfo.recent_topics.length > 5
          ? this.userInfo.recent_topics.slice(0, 5) : this.userInfo.recent_topics;
      // 2.格式化时间："x分钟前"/"x小时前"/"x天前"/"x月前"...
      this.userInfo.recent_topicsTop5.map(article => {
        this.$set(
          article,
          "last_reply_time",
          getTimeFromNow(article.last_reply_at)
        );
      });

      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    },
    // 页面跳转 - article
    goToArticle (i) {
      wx.navigateTo({
        url: `/pages/article/main?id=${this.userInfo.recent_topics[i].id}`
      });
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
@import '~@/common/user.scss';
.container {
  padding: 10px;
  .container-content-common {
    // height: calc(100vh - 130px);
    overflow: auto;
    border: 1px solid #e5e5e5;
  }
}
</style>
