<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <span href='/'
                class="breadcrumb-dashboard">主页</span>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>API</span>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'>

        <!-- 引子 -->
        <div>
          <div class="txt">
            <p>以下 api 路径均以 <a class="bold"
                 href="https://cnodejs.org/api/v1">https://cnodejs.org/api/v1</a> 为前缀</p>
            <p>update 2019-03-21：涉及发帖和发评论的接口都已经下线了，太多人为了测试客户端乱发帖了。</p>
          </div>
        </div>

        <!-- 主题 -->
        <div>
          <div class="title title-main bold">主题</div>

          <div class="title title-sub bold">get /topics 主题首页</div>
          <div class="txt">
            <p>接收 get 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;page <code>Number</code> 页数</li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;tab <code>String</code> 主题分类。目前有 <code>ask</code> <code>share</code> <code>job</code> <code>good</code></li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;limit <code>Number</code> 每一页的主题数量</li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
              </ul>
            </p>
            <p>示例：
              <a href="/api/v1/topics">/api/v1/topics</a>
            </p>
          </div>

          <div class="title title-sub bold">get /topic/:id 主题详情</div>
          <div class="txt">
            <p>接收 get 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code> 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 <code>is_collect</code> 以及 <code>replies</code> 列表中的 <code>is_uped</code> 值。</li>
              </ul>
            </p>
            <p>示例：
              <a href="/api/v1/topic/5433d5e4e737cbe96dcef312">/api/v1/topic/5433d5e4e737cbe96dcef312</a>
            </p>
          </div>
        </div>

        <!-- 主题收藏 -->
        <div>
          <div class="title title-main bold">主题收藏</div>

          <div class="title title-sub bold">post /topic_collect/collect 收藏主题</div>
          <div class="txt">
            <p>接收 post 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code> 用户的 accessToken</li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;topic_id <code>String</code> 主题的id</li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> { &quot;<span class="json-str">success</span>&quot;: true } </code></pre>
            </p>
          </div>

          <div class="title title-sub bold">post /topic_collect/de_collect 取消主题</div>
          <div class="txt">
            <p>接收 post 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code> 用户的 accessToken</li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;topic_id <code>String</code> 主题的id</li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> { success: true } </code></pre>
            </p>
          </div>

          <div class="title title-sub bold">get /topic_collect/:loginname 用户所收藏的主题</div>
          <div class="txt">
            <p>示例：
              <a href="/api/v1/topic_collect/alsotang">/api/v1/topic_collect/alsotang</a>
            </p>
          </div>
        </div>

        <!-- 用户 -->
        <div>
          <div class="title title-main bold">用户</div>

          <div class="title title-sub bold">get /user/:loginname 用户详情</div>
          <div class="txt">
            <p>示例：
              <a href="/api/v1/user/alsotang">/api/v1/user/alsotang</a>
            </p>
          </div>

          <div class="title title-sub bold">post /accesstoken 验证 accessToken 的正确性</div>
          <div class="txt">
            <p>接收 post 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code> 用户的 accessToken</li>
              </ul>
            </p>
            <p>如果成功匹配上用户，返回成功信息。否则 403。</p>
            <p>返回值示例：
              <pre>
                <code>
                  { <br>
                  &nbsp;&nbsp;success: true,<br>
                  &nbsp;&nbsp;loginname: req.user.loginname,<br>
                  &nbsp;&nbsp;id: req.user.id,<br>
                  &nbsp;&nbsp;avatar_url: req.user.avatar_url<br>
                  }
                </code>
              </pre>
            </p>
          </div>
        </div>

        <!-- 消息通知 -->
        <div>
          <div class="title title-main bold">消息通知</div>

          <div class="title title-sub bold">get /message/count 获取未读消息数</div>
          <div class="txt">
            <p>接收 get 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code></li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> { data: 3 } </code></pre>
            </p>
          </div>

          <div class="title title-sub bold">get /messages 获取已读和未读消息</div>
          <div class="txt">
            <p>接收 get 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code></li>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;mdrender <code>String</code>当为 <code>false </code>时,，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> data: {
                 has_read_messages: [],
                 hasnot_read_messages: [
                  {
                    id: "543fb7abae523bbc80412b26",
                    type: "at",
                    has_read: false,
                    author: {
                      loginname: "alsotang",
                      avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
                    },
                    topic: {
                      id: "542d6ecb9ecb3db94b2b3d0f",
                      title: "adfadfadfasdf",
                      last_reply_at: "2014-10-18T07:47:22.563Z"
                    },
                    reply: {
                      id: "543fb7abae523bbc80412b24",
                      content: "[@alsotang](/user/alsotang) 哈哈",
                      ups: [ ],
                      create_at: "2014-10-16T12:18:51.566Z"
                      }
                    },
                    ...
                ]
            } </code></pre>
            </p>
          </div>

          <div class="title title-sub bold">post /message/mark_all 标记全部已读</div>
          <div class="txt">
            <p>接收 post 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code></li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> { success: true,
                marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ] } </code></pre>
            </p>
          </div>

          <div class="title title-sub bold">post /message/mark_one/:msg_id 标记单个消息为已读</div>
          <div class="txt">
            <p>请求示例：
              <a href="/message/mark_one/58ec7d39da8344a81eee0c14">/message/mark_one/58ec7d39da8344a81eee0c14</a>
            </p>
            <p>接收 post 参数</p>
            <p>
              <ul>
                <li>&nbsp;&nbsp;&bull;&nbsp;&nbsp;accesstoken <code>String</code></li>
              </ul>
            </p>
            <p>返回值示例：
              <pre><code> { success: true,
                marked_msg_id: "58ec7d39da8344a81eee0c14" } </code></pre>
            </p>
          </div>
        </div>

        <!-- 知识点 -->
        <div>
          <div class="title title-main bold">知识点</div>

          <div class="txt">
            <p>如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。</p>
          </div>
        </div>
      </div>

    </scroll-view>

  </div>
</template>

<script>
// api
import { getContentApi } from '@/api/content/index.js';

export default {
  data () {
    return {
      content: []
    };
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      console.log((await getContentApi()).data);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
</style>
