<template>
  <div class="container">

    <!-- content -->
    <div class="container-content-common">

      <scroll-view scroll-y>

        <!-- header -->
        <div class='container-content-common-header'>
          <div class='breadcrumb'>
            <home-back></home-back>
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
                        @goToUser="goToUser"
                        @goToArticle="goToArticle"></topic-template>

        <!-- 分页 -->
        <pagination :total="topicListOrg.length"
                    :page="page"
                    @getData="getData"></pagination>

      </scroll-view>

    </div>
  </div>
</template>

<script>
// components
import TopicTemplate from "../topicTemplate"; // 组件：用户 创建/参与 的话题列表
import HomeBack from "@/components/homeBack"; // 组件：返回首页
import Pagination from "@/components/pagination"; // 组件：分页

const dataStack = []; // 解决mpvue相同组件数据不更新问题，建立栈堆

export default {
  components: { TopicTemplate, HomeBack, Pagination },
  data () {
    return {
      user: "", // 用户名
      type: "", // 类型 recent_topics / recent_replies / topic_collect
      title: "", // 顶部标题 XX 创建/参与 的话题
      topicListOrg: [], // 话题列表 - 全部
      topicList: [], // 话题列表 - 当页
      page: 1,// 当前页码
      limit: 10, // 每页主题数量
    };
  },
  onLoad () {
    dataStack.push({ ...this.$data }); // 备份
    this.initData();
  },
  onUnload () {
    Object.assign(this.$data, dataStack.pop()); //恢复
  },
  methods: {
    // 数据渲染
    initData () {
      this.user = this.$root.$mp.query.user;
      this.type = this.$root.$mp.query.type;
      const type =
        this.type === "recent_topics" ? " 创建" :
          this.type === "recent_replies" ? " 参与" : " 收藏";
      this.title = this.user + type + "的话题";
      this.topicListOrg = JSON.parse(decodeURIComponent(this.$root.$mp.query.topicList));
      this.getData(this.page);
    },
    // 分页
    getData (page) {
      this.page = page;
      this.topicList = this.topicListOrg.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    // 页面返回 - user
    goBackUser () {
      var pages = getCurrentPages(); //当前页面
      var beforePage = pages[pages.length - 2]; //前一页
      wx.navigateBack();
    },
    // 页面跳转 - user
    goToUser (name) {
      if (name === this.user) {
        this.goBackUser();
      } else {
        wx.navigateTo({
          url: `/pages/user/main?name=${name}`
        });
      }
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
