<template>
  <div>
    <!-- header -->
    <div class='header'>
      <ul class='breadcrumb'>
        <li><a href='/'>主页</a><span class='divider'>/</span></li>
        <li class='active'>API</li>
      </ul>
    </div>

    <!-- inner -->
    <div class='inner topic'>
      <div class="topic_content">
        <div class="markdown-text">
          <p>以下 api 路径均以 <strong><a href="https://cnodejs.org/api/v1">https://cnodejs.org/api/v1</a></strong> 为前缀</p>
          <p>update 2019-03-21: 涉及发帖和发评论的接口都已经下线了，太多人为了测试客户端乱发帖了。</p>
          <h3>主题</h3>
          <h4>get /topics 主题首页</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>page <code>Number</code> 页数</li>
            <li>tab <code>String</code> 主题分类。目前有 <code>ask</code> <code>share</code> <code>job</code> <code>good</code></li>
            <li>limit <code>Number</code> 每一页的主题数量</li>
            <li>mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
          </ul>
          <p>示例：<a href="/api/v1/topics">/api/v1/topics</a></p>
          <h4>get /topic/:id 主题详情</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
            <li>accesstoken <code>String</code> 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 <code>is_collect</code> 以及 <code>replies</code> 列表中的 <code>is_uped</code> 值。</li>
          </ul>
          <p>示例：<a href="/api/v1/topic/5433d5e4e737cbe96dcef312">/api/v1/topic/5433d5e4e737cbe96dcef312</a></p>
          <h3>主题收藏</h3>
          <h4>post /topic_collect/collect 收藏主题</h4>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken <code>String</code> 用户的 accessToken</li>
            <li>topic_id <code>String</code> 主题的id</li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{&quot;success&quot;: true}
</code></pre>
          <h4>post /topic_collect/de_collect 取消主题</h4>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken <code>String</code> 用户的 accessToken</li>
            <li>topic_id <code>String</code> 主题的id</li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{success: true}
</code></pre>
          <h4>get /topic_collect/:loginname 用户所收藏的主题</h4>
          <p>示例：<a href="/api/v1/topic_collect/alsotang">/api/v1/topic_collect/alsotang</a></p>
          <h3>用户</h3>
          <h4>get /user/:loginname 用户详情</h4>
          <p>示例：<a href="/api/v1/user/alsotang">/api/v1/user/alsotang</a></p>
          <h4>post /accesstoken 验证 accessToken 的正确性</h4>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken <code>String</code> 用户的 accessToken</li>
          </ul>
          <p>如果成功匹配上用户，返回成功信息。否则 403。</p>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
</code></pre>
          <h3>消息通知</h3>
          <h4>get /message/count 获取未读消息数</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>accesstoken <code>String</code></li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{ data: 3 }
</code></pre>
          <h4>get /messages 获取已读和未读消息</h4>
          <p>接收 get 参数</p>
          <ul>
            <li>accesstoken <code>String</code></li>
            <li>mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{
  data: {
    has_read_messages: [],
    hasnot_read_messages: [
      {
        id: &quot;543fb7abae523bbc80412b26&quot;,
        type: &quot;at&quot;,
        has_read: false,
        author: {
          loginname: &quot;alsotang&quot;,
          avatar_url: &quot;https:&#x2F;&#x2F;avatars.githubusercontent.com&#x2F;u&#x2F;1147375?v=2&quot;
        },
        topic: {
          id: &quot;542d6ecb9ecb3db94b2b3d0f&quot;,
          title: &quot;adfadfadfasdf&quot;,
          last_reply_at: &quot;2014-10-18T07:47:22.563Z&quot;
        },
        reply: {
          id: &quot;543fb7abae523bbc80412b24&quot;,
          content: &quot;[@alsotang](&#x2F;user&#x2F;alsotang) 哈哈&quot;,
          ups: [ ],
          create_at: &quot;2014-10-16T12:18:51.566Z&quot;
          }
        },
    ...
    ]
  }
}
</code></pre>
          <h4>post /message/mark_all 标记全部已读</h4>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken <code>String</code></li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{ success: true,
  marked_msgs: [ { id: &#x27;544ce385aeaeb5931556c6f9&#x27; } ] }
</code></pre>
          <h4>post /message/mark_one/:msg_id 标记单个消息为已读</h4>
          <p>请求示例：<a href="/message/mark_one/58ec7d39da8344a81eee0c14">/message/mark_one/58ec7d39da8344a81eee0c14</a></p>
          <p>接收 post 参数</p>
          <ul>
            <li>accesstoken <code>String</code></li>
          </ul>
          <p>返回值示例</p>
          <pre class="prettyprint language-js"><code>{
  success: true,
  marked_msg_id: &quot;58ec7d39da8344a81eee0c14&quot;
}
</code></pre>
          <h3>知识点</h3>
          <ol>
            <li>如何获取 accessToken？
              用户登录后，在设置页面可以看到自己的 accessToken。
              建议各移动端应用使用手机扫码的形式登录，验证使用 <code>/accesstoken</code> 接口，登录后长期保存 accessToken。</li>
          </ol>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "~@/common/";
</style>
