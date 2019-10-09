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

        <!-- 动态内容 -->
        <div v-for="(item,index) in content"
             :key="item.title_main">

          <!-- 主标题 -->
          <div class="title title-main bold">{{item.title_main}}</div>

          <!-- 主标题下属内容：topic -->
          <div v-for="(topic,_index) in item.topic"
               :key="topic.title_sub">

            <!-- 副标题 -->
            <div class="title title-sub bold">{{topic.title_sub}}</div>

            <!-- 副标题下属内容 -->
            <div class="txt">

              <!-- 介绍 -->
              <p>{{topic.txt}}</p>

              <!-- 行 -->
              <p>
                <ul>
                  <li v-for="(li,__index) in topic.txt_list"
                      :key="li"
                      style="white-space: pre-wrap;"
                      v-html="li"></li>
                </ul>
              </p>

              <!-- 示例 -->
              <p v-if="topic.example!==undefined">示例：
                <a href="#">{{topic.example}}</a>
              </p>

              <!-- 返回值 -->
              <p v-if="topic.result_example!==undefined">返回值示例：
                <pre>
                <div class="topic-pre">
                  <code style="white-space: pre-wrap;"
                        v-html="topic.result_example"></code>
                  <!-- <code>{{topic.result_example}}</code> -->
                </div>
                </pre>
              </p>

            </div>

          </div>

          <!-- 主标题下属内容：txt_main -->
          <div v-if="item.txt_main!==undefined"
               class="txt">
            <p>{{item.txt_main}}</p>
          </div>

        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// api
// import { getContentApi } from '@/api/content/index.js';

export default {
  data () {
    return {
      content: [
        {
          title_main: '主题',
          topic: [
            {
              title_sub: 'get /topics 主题首页',
              txt: '接收 get 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;page <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">Number</code> 页数',
                '&bull;&nbsp;&nbsp;tab <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 主题分类。目前有 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">ask</code> <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">share</code> <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">job</code> <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">good</code>',
                '&bull;&nbsp;&nbsp;limit <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">Number</code> 每一页的主题数量',
                '&bull;&nbsp;&nbsp;mdrender <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 当为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">false</code> 时，不渲染。默认为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">true</code>，渲染出现的所有 markdown 格式文本。'
              ],
              example: '/api/v1/topics'
            },
            {
              title_sub: 'get /topic/:id 主题详情',
              txt: '接收 get 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;mdrender <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 当为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">false</code> 时，不渲染。默认为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">true</code>，渲染出现的所有 markdown 格式文本。',
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">is_collect</code> 以及 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">replies</code> 列表中的 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">is_uped</code> 值。'
              ],
              example: '/api/v1/topic/5433d5e4e737cbe96dcef312'
            }
          ]
        },
        {
          title_main: '主题收藏',
          topic: [
            {
              title_sub: 'post /topic_collect/collect 收藏主题',
              txt: '接收 post 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 用户的 accessToken',
                '&bull;&nbsp;&nbsp;topic_id <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 主题的id'
              ],
              result_example:
                '{ &quot;<span class="json-str">success</span>&quot;: true }'
            },
            {
              title_sub: 'post /topic_collect/de_collect 取消主题',
              txt: '接收 post 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 用户的 accessToken',
                '&bull;&nbsp;&nbsp;topic_id <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 主题的id'
              ],
              result_example: '{ success: true }'
            },
            {
              title_sub: 'get /topic_collect/:loginname 用户所收藏的主题',
              example: '/api/v1/topic_collect/alsotang'
            }
          ]
        },
        {
          title_main: '用户',
          topic: [
            {
              title_sub: 'get /user/:loginname 用户详情',
              example: '/api/v1/user/alsotang'
            },
            {
              title_sub: 'post /accesstoken 验证 accessToken 的正确性',
              txt: '接收 post 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 用户的 accessToken'
              ],
              discribe: '如果成功匹配上用户，返回成功信息。否则 403。',
              result_example:
                '{ <br>&nbsp;&nbsp;&nbsp;&nbsp;success: true, <br>&nbsp;&nbsp;&nbsp;&nbsp;loginname: req.user.loginname, <br>&nbsp;&nbsp;&nbsp;&nbsp;id: req.user.id, <br>&nbsp;&nbsp;&nbsp;&nbsp;avatar_url: req.user.avatar_url<br> }'
            }
          ]
        },
        {
          title_main: '消息通知',
          topic: [
            {
              title_sub: 'get /message/count 获取未读消息数',
              txt: '接收 get 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>'
              ],
              result_example: '{ data: 3 }'
            },
            {
              title_sub: 'get /messages 获取已读和未读消息',
              txt: '接收 get 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>',
                '&bull;&nbsp;&nbsp;mdrender <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>当为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">false </code>时,，不渲染。默认为 <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">true</code>，渲染出现的所有 markdown 格式文本。'
              ],
              //               result_example: `
              // <pre>data: {
              //   has_read_messages: [],
              //   hasnot_read_messages: [
              //     {
              //       id: "<span class="json-str">543fb7abae523bbc80412b26</span>",
              //       type: "at",
              //       has_read: false,
              //       author: {
              //         loginname: "<span class="json-str">alsotang</span>",
              //         avatar_url: "<span class="json-str">https://avatars.githubusercontent.com/u/1147375?v=2</span>"
              //       },
              //       topic: {
              //         id: "<span class="json-str">542d6ecb9ecb3db94b2b3d0f</span>",
              //         title: "<span class="json-str">adfadfadfasdf</span>",
              //         last_reply_at: "<span class="json-str">2014-10-18T07:47:22.563Z</span>"
              //       },
              //       reply: {
              //         id: "<span class="json-str">543fb7abae523bbc80412b24</span>",
              //         content: "<span class="json-str">[@alsotang](/user/alsotang) 哈哈</span>",
              //         ups: [ ],
              //         create_at: "<span class="json-str">2014-10-16T12:18:51.566Z</span>"
              //         }
              //       },
              //       ...
              //     }
              //   ]
              // }
              // </pre>
              // `
              result_example:
                '{ <br>&nbsp;&nbsp;&nbsp;&nbsp;data: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;has_read_messages: [], <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hasnot_read_messages: [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">543fb7abae523bbc80412b26</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "at", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;has_read: false, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;author: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loginname: "<span class="json-str">alsotang</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar_url: "<span class="json-str">https://avatars.githubusercontent.com/u/1147375?v=2</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;topic: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">542d6ecb9ecb3db94b2b3d0f</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: "<span class="json-str">adfadfadfasdf</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_reply_at: "<span class="json-str">2014-10-18T07:47:22.563Z</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">543fb7abae523bbc80412b24</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: "<span class="json-str">[@alsotang](/user/alsotang) 哈哈</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ups: [ ], <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;create_at: "<span class="json-str">2014-10-16T12:18:51.566Z</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;] <br>}'
            },
            {
              title_sub: 'post /message/mark_all 标记全部已读',
              txt: '接收 post 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>'
              ],
              result_example: `
<pre>{
  success: true,
  marked_msgs: [ { id: '<span class="json-str">544ce385aeaeb5931556c6f9</span>' } ]
}</pre>`
            },
            {
              title_sub: 'post /message/mark_one/:msg_id 标记单个消息为已读',
              request_example: '/message/mark_one/58ec7d39da8344a81eee0c14',
              txt: '接收 post 参数',
              txt_list: [
                '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>'
              ],
              result_example: `
<pre>{
  success: true,
  marked_msg_id: "<span class="json-str">58ec7d39da8344a81eee0c14</span>"
}</pre>`
            }
          ]
        },
        {
          title_main: '知识点',
          txt_main:
            '如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。'
        }
      ]
    };
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      // console.log((await getContentApi()).data);
      console.log(this.content);
      // console.log(document.getElementsByClassName('topic-pre'));
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
</style>
