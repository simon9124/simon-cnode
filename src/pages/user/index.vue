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
            <span></span>
          </div>
        </div>

        <!-- userInfo -->
        <div class='container-content-common-content userInfo'
             v-if="userInfo">
          <img class="userInfo-avatar"
               :src="userInfo.avatar_url"
               :alt="userInfo.loginname">
          <span class="userInfo-name">{{userInfo.loginname}}</span>
          <div class="userInfo-score">{{userInfo.score}} 积分</div>

          <!-- userCollectList -->
          <div v-if="userCollectList!==null && userCollectList.length!==0"
               class="userInfo-collect"
               @click="goToCollectList">{{userCollectList.length}}个话题收藏</div>

          <!-- userGithubInfo -->
          <div class="userInfo-infos"
               v-if="userGithubInfo!==null">
            <img src="../../../static/images/home.png" />
            <span @click="navigate(userGithubInfo.blog)">
              {{userGithubInfo.blog || userGithubInfo.html_url}}
            </span>
          </div>
          <div class="userInfo-infos"
               v-if="userGithubInfo!==null && userGithubInfo.location!==null">
            <img src="../../../static/images/location.png" />
            <span>
              {{userGithubInfo.location}}
            </span>
          </div>
          <div class="userInfo-infos"
               v-if="userGithubInfo!==null">
            <img src="../../../static/images/github.png" />
            <span @click="navigate(userGithubInfo.html_url)">
              @{{userInfo.githubUsername}}
            </span>
          </div>

          <div class="userInfo-register">注册时间 {{userInfo.create_at_time}}</div>

        </div>

        <!-- 最近创建 & 最近参与 -->
        <topic-template v-if="userInfo!==null"
                        v-for="topic in userTopics"
                        :key="topic.title"
                        :title="topic.title"
                        :type="topic.type"
                        :topicList="userInfo[topic.listValue]"
                        topicColor="#08c"
                        @goToUser="goToUser"
                        @goToArticle="goToArticle"
                        @goToTopicList="goToTopicList">
        </topic-template>

      </scroll-view>

    </div>
  </div>
</template>

<script>
// components
import TopicTemplate from "./topicTemplate"; // 组件：用户 创建/参与 的话题列表
import HomeBack from "@/components/homeBack"; // 组件：返回首页
// function
import { getTimeFromNow } from "@/utils/filters";
// api
import { getUser, getGithubPerson, getUserCollect } from "@/api/user/index.js";

export default {
  components: { TopicTemplate, HomeBack },
  data () {
    return {
      userInfo: null, // 用户信息
      userGithubInfo: null, // 用户github信息
      userCollectList: null, // 用户收藏列表
      userTopics: [
        {
          title: "最近创建的话题",
          type: "recent_topics",
          listValue: "recent_topicsTop5"
        },
        {
          title: "最近参与的话题",
          type: "recent_replies",
          listValue: "recent_repliesTop5"
        }
      ] // 用户话题类型列表：最近创建 & 最近参与
    };
  },
  computed: {
    // 转发的标题
    shareTitle () {
      if (this.userInfo !== null) return `${this.userInfo.loginname}的主页`;
    },
    // 转发的封面图
    shareImage () {
      if (this.userInfo !== null) return this.userInfo.avatar_url;
    }
  },
  onLoad () {
    this.getData();
  },
  methods: {
    // 数据渲染
    async getData () {
      this.userInfo = null;
      this.userGithubInfo = null;
      this.userCollectList = null;
      wx.showLoading({ title: "加载中" });
      // const name = "hyj1991";
      const { name } = this.$root.$mp.query;
      this.userInfo = (await getUser(name)).data;
      this.userCollectList = (await getUserCollect(name)).data;
      this.userCollectList.forEach(list => {
        this.$delete(list, "content");
      });

      // 用户注册了github -> 调用github接口
      this.userInfo.githubUsername !== undefined &&
        getGithubPerson(this.userInfo.githubUsername).then(result => {
          this.userGithubInfo = result;
        });

      /* 数据处理 */
      // 1.注册时间
      this.$set(this.userInfo, "create_at_time", getTimeFromNow(this.userInfo.create_at));
      // 2.本页只获取前5篇文章
      this.userInfo.recent_topicsTop5 =
        this.userInfo.recent_topics.length > 5
          ? this.userInfo.recent_topics.slice(0, 5)
          : this.userInfo.recent_topics;
      this.userInfo.recent_repliesTop5 =
        this.userInfo.recent_replies.length > 5
          ? this.userInfo.recent_replies.slice(0, 5)
          : this.userInfo.recent_replies;
      // 3.格式化时间："x分钟前"/"x小时前"/"x天前"/"x月前"...
      this.userInfo.recent_topicsTop5.map(article => {
        this.$set(
          article,
          "last_reply_time",
          getTimeFromNow(article.last_reply_at)
        );
      });
      this.userInfo.recent_repliesTop5.map(article => {
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
    // 跳转外链 - 需配置业务域名（个人账号暂不支持，取消域名校验可测试）
    navigate (href) {
      wx.navigateTo({
        url: `/pages/out/main?href=${href}`,
      });
    },
    // 页面跳转 - user
    goToUser (name) {
      this.userInfo.loginname !== name &&
        wx.navigateTo({
          url: `/pages/user/main?name=${name}`
        });
    },
    // 页面跳转 - article
    goToArticle (obj) {
      wx.navigateTo({
        // url: `/pages/article/main?id=${this.userInfo.recent_topics[i].id}`
        url: `/pages/article/main?id=${this.userInfo[obj.type][obj.i].id}`
      });
    },
    // 页面跳转 - topic
    goToTopicList (type) {
      wx.navigateTo({
        url: `/pages/user/topic/main?user=${this.userInfo.loginname}&userAvatar=${encodeURIComponent(this.userInfo.avatar_url)}&type=${type}&topicList=${encodeURIComponent(JSON.stringify(this.userInfo[type]))}`
      });
    },
    // 页面跳转 - collect
    goToCollectList () {
      wx.navigateTo({
        url: `/pages/user/topic/main?user=${this.userInfo.loginname}&userAvatar=${encodeURIComponent(this.userInfo.avatar_url)}&type=topic_collect&topicList=${encodeURIComponent(JSON.stringify(this.userCollectList))}`
      });
    }
  }
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
