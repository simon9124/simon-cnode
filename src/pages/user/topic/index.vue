<template>
  <div class="container">

    <!-- content -->
    <div class="container-content-common">

      <scroll-view scroll-y>

        <!-- header -->
        <div class='container-content-common-header'>
          <div class='breadcrumb'>
            <span href='/'
                  class="breadcrumb-dashboard"
                  @click="goBackHome">主页</span>
            <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
            <span class="breadcrumb-dashboard"
                  @click="goBackUser">{{user}}的主页</span>
          </div>
        </div>

        <!-- 用户 创建/参与 的话题列表 -->
        <topic-template :title="title"
                        :type="type"
                        :topicList="topicList"
                        :viewMore="false"
                        @goToArticle="goToArticle"></topic-template>

      </scroll-view>

    </div>
  </div>
</template>

<script>
// components
import TopicTemplate from "../topicTemplate";

export default {
  components: { TopicTemplate }, // 组件：用户 创建/参与 的话题列表
  data () {
    return {
      user: "", // 用户名
      type: "", // 类型 recent_topics or recent_replies
      topicList: [], // 话题列表
      title: "" // 顶部标题 XX 创建/参与 的话题
    };
  },
  onLoad () {
    this.user = this.$root.$mp.query.user;
    this.type = this.$root.$mp.query.type;
    const type = this.type === "recent_topics" ? " 创建" : " 参与";
    this.title = this.user + type + "的话题";
    this.topicList = JSON.parse(decodeURIComponent(this.$root.$mp.query.topicList));
  },
  methods: {
    // 页面返回 - home
    goBackHome () {
      wx.reLaunch({
        url: "/pages/index/main"
      });
    },
    // 页面返回 - user
    goBackUser () {
      var pages = getCurrentPages(); //当前页面
      var beforePage = pages[pages.length - 2]; //前一页
      wx.navigateBack();
    },
    // 页面跳转 - article
    goToArticle (obj) {
      wx.navigateTo({
        url: `/pages/article/main?id=${this.topicList[obj.i].id}`
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
@import '~@/common/user.scss';
.container {
  padding: 10px 5px;
  .container-content-common {
    // height: calc(100vh - 130px);
    overflow: auto;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }
}
</style>
