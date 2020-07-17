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

        <!-- userInfo -->
        <div class='container-content-common-content userInfo'
             v-if="userInfo">
          <img class="userInfo-avatar"
               :src="userInfo.avatar_url"
               :alt="userInfo.loginname">
          <span class="userInfo-name">{{userInfo.loginname}}</span>
          <div class="userInfo-score">{{userInfo.score}} 积分</div>

          <!-- userGithubInfo -->
          <div class="userInfo-infos"
               v-if="userGithubInfo!==null">
            <img src="../../../static/images/home.png" />
            <span @click="navigate(userGithubInfo.blog)">{{userGithubInfo.blog}}</span>
          </div>
          <div class="userInfo-infos"
               v-if="userGithubInfo!==null">
            <img src="../../../static/images/location.png" />
            <span>{{userGithubInfo.location}}</span>
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
import { getUser, getGithubPerson } from "@/api/user/index.js";

const dataStack = [];

export default {
  components: { HeaderContainer },
  data () {
    return {
      userInfo: null,
      userGithubInfo: null,
      name: ""
    };
  },
  onLoad () {
    dataStack.push({ ...this.$data }); // 备份
    this.getData();
  },
  onUnload () {
    Object.assign(this.$data, dataStack.pop()); //恢复
  },
  methods: {
    // 数据渲染
    async getData () {
      this.userInfo = null;
      this.userGithubInfo = null;
      wx.showLoading({ title: "加载中" });
      // this.name = "i5ting";
      this.name = this.$root.$mp.query.name;
      this.userInfo = (await getUser(this.name)).data;
      this.userInfo = Object.assign(this.userInfo, {});

      // 用户注册了github -> 调用github接口
      this.userInfo.githubUsername !== undefined &&
        getGithubPerson(this.name).then(result => {
          this.userGithubInfo = result;
        });

      /* 数据处理 */
      // 1.本页只获取前5篇文章
      this.userInfo.recent_topicsTop5 =
        this.userInfo.recent_topics.length > 5
          ? this.userInfo.recent_topics.slice(0, 5)
          : this.userInfo.recent_topics;
      // 2.格式化时间："x分钟前"/"x小时前"/"x天前"/"x月前"...
      this.userInfo.recent_topicsTop5.map(article => {
        this.$set(
          article,
          "last_reply_time",
          getTimeFromNow(article.last_reply_at)
        );
      });
      // 3.注册时间
      this.$set(this.userInfo, "create_at_time", getTimeFromNow(this.userInfo.create_at));

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
    // 跳转外链 - 需配置业务域名（个人账号暂不支持，取消域名校验可测试）
    navigate (href, e) {
      wx.navigateTo({
        url: `/pages/out/main?href=${href}`,
      });
    },
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
