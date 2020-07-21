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

        <!-- 用户 创建/参与 的话题列表 -->
        <topic-template

                        :title="topic.title"
                        :type="topic.type"
                        :topicList="userInfo[topic.listValue]"></topic-template>
        <!-- @goToArticle="goToArticle" -->
        <!-- @goToTopicList="goToTopicList" -->

      </scroll-view>

    </div>
  </div>
</template>

<script>
import TopicTemplate from "../topicTemplate";

export default {
  components: { TopicTemplate }, // 组件：用户 创建/参与 的话题列表
  methods: {
    // 页面跳转 - article
    goToArticle (obj) {
      wx.navigateTo({
        url: `/pages/article/main?id=${this.userInfo[obj.type][obj.i].id}`
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
