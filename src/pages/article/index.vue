<template>
  <div class="container">
    <!-- header -->
    <!-- <header-container></header-container> -->

    <!-- content -->
    <div class="container-content-common">
      <scroll-view scroll-y>
        <!-- content -->
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
              &bull;&nbsp;作者 {{ article.author.loginname }}
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
          <wxParse :content="article.content"
                   :imageProp="{mode:'widthFix'}"
                   @navigate="navigate"></wxParse>
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
                 :src="reply.author.avatar_url" />
            <span class="reply-block-author bold inline-block">
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
    </div>
  </div>
</template>

<script>
// components
import HeaderContainer from "@/components/Header";
// plugin
import wxParse from "mpvue-wxparse";
// function
import { getTimeFromNow } from "@/utils/filters";
// api
import { getArticle } from "@/api/article/index.js";

export default {
  components: { HeaderContainer, wxParse },
  data () {
    return {
      article: null
    };
  },
  onLoad () {
    this.getData();
  },
  onUnload () {
    this.article = null;
  },
  methods: {
    // 数据渲染
    async getData () {
      wx.showLoading({ title: "加载中" });
      const id = "5f0d3937c927455111491185";
      // const { id } = this.$root.$mp.query;
      this.article = (await getArticle(id)).data;
      this.article.create_at_time = getTimeFromNow(this.article.create_at);
      // wxParse 会默认将换行符清空，手动设置为<br>标签又含高度，因此用一个看不见的<hr>来代替
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("\n", "gi"),
      //   "↵"));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("([^\r])\n", "gi"),
        "<hr style=\"height:0;visibility:hidden;\"\>"));
      // this.$set(this.article, "content", this.article.content.replace(new RegExp("↵", "gi"),
      //   "<hr style=\"height:0;visibility:hidden;\"\>"));
      // 部分转义字符在 wxParse 的 <pre> 标签内不解析，需手动转义
      this.$set(this.article, "content", this.article.content.replace(new RegExp("&#x2F;", "gi"),
        "/"));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("&#96;", "gi"),
        "`"));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("&#x27;", "gi"),
        "'"));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("&nbsp;", "gi"),
        " "));
      this.$set(this.article, "content", this.article.content.replace(new RegExp("&amp;", "gi"),
        "&"));
      // 给<code>标签添加class，符合hightlight的标准（换行符失效，解决中）
      this.$set(this.article, "content", this.article.content.replace(new RegExp("<code", "gi"),
        "<code class=\"language-javascript\" "));
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
