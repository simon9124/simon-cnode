<template>
  <div class="container">
    <!-- header -->
    <header-container></header-container>

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
          <wxParse :content="article.content"> </wxParse>
        </div>

        <!-- 回复 -->
        <div class="reply"
             v-if="article">
          <div class="reply-count">{{ article.reply_count }}&nbsp;回复</div>

          <div v-for="(reply, i) in article.replies"
               :key="i"
               class="reply-block"
               :style="{ background: reply.ups.length < 3 ? '#fff' : '#f4fcf0' }">
            <img class="reply-block-avator inline-block"
                 :src="reply.author.avatar_url" />
            <span class="reply-block-author bold inline-block">{{
              reply.author.loginname
            }}</span>
            <span class="reply-block-time inline-block ">{{ i + 1 }}楼&bull;{{ reply.create_at_time }}</span>
            <span v-if="article.author.loginname === reply.author.loginname"
                  class="reply-block-tag inline-block ">作者</span>
            <span class="reply-block-good"
                  v-if="reply.ups.length > 0">
              <img src="../../../static/images/good.png" />
              <span class="reply-block-good-num">{{ reply.ups.length }}</span>
            </span>

            <!-- <pre>
            <div class="topic-pre">
              <code style="white-space: pre-wrap;"
                    v-html="reply.content"></code>
            </div>
            </pre> -->

            <rich-text :nodes="reply.content"></rich-text>
            <!-- 循环wxParse时，若数据量较大会直接造成页面卡死，wxParse的问题暂无解，用rich-text代替 -->
            <!-- <wxParse :content="reply.content"></wxParse> -->

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
    async getData () {
      wx.showLoading({
        title: "加载中"
      });
      // const { id } = this.$root.$mp.query;
      const id = "5efb4c5d13f8b244e57cc632";
      this.article = (await getArticle(id)).data;
      console.log(this.article);

      this.article.create_at_time = getTimeFromNow(this.article.create_at);
      this.article.replies.map(reply => {
        this.$set(reply, "create_at_time", getTimeFromNow(reply.create_at));
        // 手动给回复的内容（rich-text富文本）加上样式
        // let result = reply;
        // const regex = new RegExp('<a', 'gi');
        // reply = result.replace(regex, `<a style="color: #08c;" `);
      });

      // var replies = this.article.replies;

      // var htmlAry = [];
      // for (let i = 0; i < replies.length; i++) {
      //   if (replies[i].type === 'text') {
      //     // 重点，就是这里。只要这么干就能直接获取到转化后的node格式数据；
      //     htmlAry[i] = wxParse.html2json(replies[i].content, 'returnData');
      //     console.log(htmlAry[i]);
      //   }
      // }
      // this.setData({
      //   templist: replies,
      //   htmlAry: htmlAry // 记得这里要加入
      // });

      setTimeout(() => {
        wx.hideLoading();
      }, 200);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
@import '~@/common/article.scss';
.container /deep/ {
  .container-content-common {
    height: calc(100vh - 130px);
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
