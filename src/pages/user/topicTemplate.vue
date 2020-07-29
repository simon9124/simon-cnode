<!--
  组件：用户 创建/参与 的话题列表
-->

<template>
  <div class="reply">
    <div class="reply-count">{{title}}</div>

    <!-- 文章列表 -->
    <div class="cell relative"
         v-for="(article,i) in topicList"
         :key="article.id">
      <img :src="article.author.avatar_url"
           @click="goToUser(article.author.loginname)">
      <div class="cell-title"
           :style="{color:topicColor}"
           @click="goToArticle(i)">{{article.title}}
      </div>
      <div class="cell-time absolute">{{article.last_reply_time}}</div>
    </div>

    <div v-if="viewMore"
         class="reply-more"
         @click="goToTopicList()">查看更多»</div>

  </div>
</template>

<script>
export default {
  props: {
    // 标题：最近XX的话题
    title: {
      type: String,
      default: ""
    },
    // 类型：recent_topics or recent_replies
    type: {
      type: String,
      default: ""
    },
    // topic列表
    topicList: {
      type: Array,
      default: () => []
    },
    // 是否显示 - 查看更多
    viewMore: {
      type: Boolean,
      default: true
    },
    topicColor: {
      type: String,
      default: "#333"
    }
  },
  methods: {
    // 子组件事件回调：页面跳转 - user
    goToUser (name) {
      this.$emit("goToUser", name);
    },
    // 子组件事件回调：页面跳转 - article
    goToArticle (i) {
      this.$emit("goToArticle", { type: this.type, i: i });
    },
    // 子组件事件回调：页面跳转 - topicList
    goToTopicList (i) {
      this.$emit("goToTopicList", this.type);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/user.scss';
</style>
