<template>
  <div class="container">
    <!-- header -->
    <!-- <header-container></header-container> -->

    <!-- content -->
    <div class="container-content-common">

      <scroll-view scroll-y>

        <!-- 内容 -->
        <div class="container-content-common-content"
             v-if="article">
          <!-- 标题 -->
          <div class="article-title">
            <div v-if="article.top"
                 class="cell-tag"
                 :style="{background: article.top || article.good ? '#80bd01' : '#e5e5e5',
                          color: article.top || article.good ? '#fff' : '#999'}">
              {{
                article.top
                  ? "置顶"
                  : article.good
                  ? "精华"
                  : article.tab === "share"
                  ? "分享"
                  : article.tab === "ask"
                  ? "问答"
                  : article.tab === "job"
                  ? "招聘"
                  : ""
              }}
            </div>
            {{ article.title }}
            <!-- <div class="article-title line-block">{{article.title}}</div> -->
          </div>
          <div class="cell">
            <div class="cell-time">
              &bull;&nbsp;发布于&nbsp;{{ article.create_at_time }}
            </div>
            <div class="cell-time">
              &bull;&nbsp;作者
              <span @click="goToUser(article.author.loginname)">
                {{ article.author.loginname }}
              </span>
            </div>
            <div class="cell-time">
              &bull;&nbsp;{{ article.visit_count }} 次浏览
            </div>
            <div class="cell-time">
              &bull;&nbsp;来自
              {{
                article.tab === "share"
                  ? "分享"
                  : article.tab === "ask"
                  ? "问答"
                  : article.tab === "job"
                  ? "招聘"
                  : ""
              }}
            </div>
          </div>

          <hr />

          <!-- 内容 -->
          <!-- 使用wxParse渲染会导致页面卡顿，暂无解，用rich-text代替 -->
          <!-- <wxParse :content="article.content"
                   :imageProp="{mode:'widthFix'}"
                   @navigate="navigate"></wxParse> -->

          <!-- 使用原生组件渲染富文本 -->
          <div class="article-content">
            <rich-text :nodes="article.content"></rich-text>
          </div>

        </div>

        <!-- 回复 -->
        <div class="reply"
             v-if="article">
          <div v-if="article.reply_count!==0"
               class="reply-count">{{ article.reply_count }}&nbsp;回复</div>

          <div v-for="(reply, i) in article.replies"
               :key="i"
               class="reply-block"
               :style="{ background: reply.ups.length < 3 ? '#fff' : '#f4fcf0' }">
            <img class="reply-block-avator inline-block"
                 :src="reply.author.avatar_url"
                 @click="goToUser(reply.author.loginname)" />
            <span class="reply-block-author bold inline-block"
                  @click="goToUser(reply.author.loginname)">
              {{ reply.author.loginname }}
            </span>
            <span class="reply-block-time inline-block ">
              {{ i + 1 }}楼&bull;{{ reply.create_at_time }}
            </span>
            <span v-if="article.author.loginname === reply.author.loginname"
                  class="reply-block-tag inline-block ">作者</span>
            <span class="reply-block-good"
                  v-if="reply.ups.length > 0">
              <img src="../../../static/images/good.png" />
              <span class="reply-block-good-num">{{ reply.ups.length }}</span>
            </span>

            <!-- 循环wxParse时，若数据量较大会直接造成页面卡死，wxParse的问题暂无解，用rich-text代替 -->
            <!-- <wxParse :content="reply.content"
                     :imageProp="{mode:'widthFix'}"
                     @navigate="navigate"></wxParse> -->

            <!-- 使用原生组件循环富文本 -->
            <rich-text :nodes="reply.content"></rich-text>

          </div>
        </div>

      </scroll-view>

      <back-to-top :backToTopDisplay="backToTopDisplay"
                   @back-top="scrollTop=10;scrollTop=0">
      </back-to-top>

    </div>
  </div>
</template>

<script>
// components
import HeaderContainer from "@/components/Header";
import BackToTop from "@/components/backToTop"; // 组件：回到顶部
// plugin
import wxParse from "mpvue-wxparse";
// function
import { getTimeFromNow } from "@/utils/filters";
// api
import { getArticle } from "@/api/article/index.js";

export default {
  components: { HeaderContainer, wxParse, BackToTop },
  data () {
    return {
      article: null,
    };
  },
  onLoad () {
    this.getData();
  },
  methods: {
    // 数据渲染
    async getData () {
      this.article = null;
      wx.showLoading({ title: "加载中" });
      const id = "5f217ed24b61050e36e7d13b";
      // const { id } = this.$root.$mp.query;
      this.article = (await getArticle(id)).data;
      this.article.create_at_time = getTimeFromNow(this.article.create_at);

      // wxParse 会默认将换行符清空，手动设置为<br>标签又含高度，因此用一个看不见的<hr>来代替
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("\n", "gi"),
      //   "<hr style=\"height:0;visibility:hidden;\">"));

      /* 代码段添加高亮：给<code>标签添加class（会导致<code>内的部分换行符失效和页面卡顿，暂不使用）*/
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("<code", "gi"),
      //   "<code class=\"language-javascript\" "));

      /* 部分转义字符在 wxParse 的 <pre> 标签内不解析，需手动转义（如开启高亮还将有部分不解析） */
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("&#x2F;", "gi"),
      //   "/"));
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("&#96;", "gi"),
      //   "`"));
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("&#x27;", "gi"),
      //   "'"));
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("&nbsp;", "gi"),
      //   " "));
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("&amp;", "gi"),
      //   "&"));

      /* 手动给文章内容（rich-text富文本）加上样式 */
      this.$set(this.article, "content", this.article.content.replace(new RegExp("\n", "gi"),
        "<hr style=\"height:0;visibility:hidden;\">"));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h1", "gi"),
        "<h1 style=\"font-size: 2em;line-height: 1.2em;margin: 0.67em 0;border-bottom: 1px solid #eee;word-break: break-word;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h2", "gi"),
        "<h2 style=\"font-size: 1.7em;margin: 0.5em 0;border-bottom: 1px solid #eee;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h3", "gi"),
        "<h3 style=\"font-size: 1.7em;margin: 0.5em 0;border-bottom: 1px solid #eee;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h4", "gi"),
        "<h4 style=\"margin: 1.33em 0;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h5", "gi"),
        "<h5 style=\"font-size: 0.83em;margin: 1.67em 0;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<h6", "gi"),
        "<h6 style=\"font-size: 0.67em;margin: 2.33em 0;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<p+(?!r)", "gi"),
        "<p style=\"margin: 0.3em 0;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<ul", "gi"),
        "<ul style=\"margin:0.3em 10px;padding-left: 16px;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<ol", "gi"),
        "<ol style=\"margin:0.3em 10px;padding-left: 16px;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<li", "gi"),
        "<li style=\"word-break:break-word;font-size:0.9em;line-height:1.8em;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<a", "gi"),
        "<a style=\"color: #08c;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<img", "gi"),
        "<img style=\"width:100%\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<pre", "gi"),
        "<pre style=\"overflow:auto;padding:8px;background:#f7f7f7;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<table", "gi"),
        "<table style=\"width:100%;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;font-size:0.86em;text-align:center;border-collapse:collapse;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<th+(?!e)", "gi"),
        "<th style=\"overflow:auto;border-left:1px solid #e0e0e0;border-top:1px solid #e0e0e0;\" "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<td", "gi"),
        "<td style=\"overflow:auto;border-left:1px solid #e0e0e0;border-top:1px solid #e0e0e0;\" "));

      console.log(this.article.content);

      this.article.replies.map(reply => {
        this.$set(reply, "create_at_time", getTimeFromNow(reply.create_at));
        /* 手动给回复的内容（rich-text富文本）加上样式 */
        let result = reply.content;
        const regexA = result.replace(new RegExp("<a", "gi"), "<a style=\"color: #08c;\" ");
        const regexH1 = regexA.replace(new RegExp("<h1", "gi"),
          "<h1 style=\"font-family:\'Helvetica Neue\';font-size:2.2em;word-break:break-word;line-height:1.2em;border-bottom:1px solid #eee;\" ");
        const regexP = regexH1.replace(new RegExp("<p", "gi"),
          "<p style=\"margin-bottom:10px;\" ");
        const regexOl = regexP.replace(new RegExp("<ol", "gi"),
          "<ol style=\"margin: 1em 0;padding-left: 16px;\" ");
        const regexLi = regexOl.replace(new RegExp("<li", "gi"),
          "<li style=\"word-break:break-word;font-size: 14px;line-height:1.8em;\" ");
        const regexImg = regexLi.replace(new RegExp("<img", "gi"),
          "<img style=\"width:100%\" ");
        const regexBreak = regexImg.replace(new RegExp("\n", "gi"),
          "<hr style=\"height:0;visibility:hidden;\">");
        // console.log(regexBreak);
        this.$set(reply, "content", regexBreak);
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    },
    // wxParse跳转外链 - 需配置业务域名（个人账号暂不支持，取消域名校验可测试）
    navigate (href, e) {
      wx.navigateTo({
        url: `/pages/out/main?href=${href}`,
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
@import '~@/common/article.scss';
.container /deep/ {
  .container-content-common {
    // height: calc(100vh - 130px);
    overflow: auto;
  }
  .container-content-common-content {
    padding: 0 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
  }
}
</style>
