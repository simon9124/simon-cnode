const APIData = [{
  title_main: '主题',
  topic: [{
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
  topic: [{
    title_sub: 'post /topic_collect/collect 收藏主题',
    txt: '接收 post 参数',
    txt_list: [
      '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 用户的 accessToken',
      '&bull;&nbsp;&nbsp;topic_id <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code> 主题的id'
    ],
    result_example: '{ &quot;<span class="json-str">success</span>&quot;: true }'
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
  topic: [{
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
    result_example: '{ <br>&nbsp;&nbsp;success: true, <br>&nbsp;&nbsp;loginname: req.user.loginname, <br>&nbsp;&nbsp;id: req.user.id, <br>&nbsp;&nbsp;avatar_url: req.user.avatar_url<br> }'
  }
  ]
},
{
  title_main: '消息通知',
  topic: [{
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
    result_example: '{ <br>&nbsp;&nbsp;data: { <br>&nbsp;&nbsp;&nbsp;&nbsp;has_read_messages: [], <br>&nbsp;&nbsp;&nbsp;&nbsp;hasnot_read_messages: [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">543fb7abae523bbc80412b26</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "at", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;has_read: false, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;author: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loginname: "<span class="json-str">alsotang</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;avatar_url: "<span class="json-str">https://avatars.githubusercontent.com/u/1147375?v=2</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;topic: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">542d6ecb9ecb3db94b2b3d0f</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: "<span class="json-str">adfadfadfasdf</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_reply_at: "<span class="json-str">2014-10-18T07:47:22.563Z</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply: { <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">543fb7abae523bbc80412b24</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: "<span class="json-str">[@alsotang](/user/alsotang) 哈哈</span>", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ups: [ ], <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;create_at: "<span class="json-str">2014-10-16T12:18:51.566Z</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;] <br>}'
  },
  {
    title_sub: 'post /message/mark_all 标记全部已读',
    txt: '接收 post 参数',
    txt_list: [
      '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>'
    ],
    result_example: '{ <br>&nbsp;&nbsp;success: true, <br>&nbsp;&nbsp;marked_msgs: [ <br>&nbsp;&nbsp;&nbsp;&nbsp;{ <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "<span class="json-str">544ce385aeaeb5931556c6f9</span>" <br>&nbsp;&nbsp;&nbsp;&nbsp;} <br>&nbsp;&nbsp;] <br>}'
  },
  {
    title_sub: 'post /message/mark_one/:msg_id 标记单个消息为已读',
    request_example: '/message/mark_one/58ec7d39da8344a81eee0c14',
    txt: '接收 post 参数',
    txt_list: [
      '&bull;&nbsp;&nbsp;accesstoken <code style="font-family:Monaco,Menlo,Consolas,Courier New,monospace;display:inline-block;background-color:#fcfafa;padding:4px 6px;font-size:12px;">String</code>'
    ],
    result_example: '{ <br>&nbsp;&nbsp;success: true, <br>&nbsp;&nbsp;marked_msg_id: "<span class="json-str">58ec7d39da8344a81eee0c14</span>" <br>}'
  }
  ]
},
{
  title_main: '知识点',
  txt_main: '如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。'
}
];

const NewData = [{
  title_main: 'Node.js 入门',
  topic: [{
    txt: '《快速搭建 Node.js 开发环境以及加速 npm》',
    example: 'http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html'
  },
  {
    txt: '《Node.js 包教不包会》',
    example: 'https://github.com/alsotang/node-lessons'
  },
  {
    txt: '《ECMAScript 6入门》',
    example: 'http://es6.ruanyifeng.com/'
  },
  {
    txt: '《七天学会NodeJS》',
    example: 'https://github.com/nqdeng/7-days-nodejs'
  }
  ]
},
{
  title_main: 'Node.js 资源',
  topic: [{
    txt: '《前端资源教程》',
    example: 'https://cnodejs.org/topic/56ef3edd532839c33a99d00e'
  },
  {
    txt: '《国内的 npm 镜像源》',
    example: 'http://cnpmjs.org/'
  },
  {
    txt: '《node weekly》',
    example: 'http://nodeweekly.com/issues'
  },
  {
    txt: '《node123-node.js中文资料导航》',
    example: 'https://github.com/youyudehexie/node123'
  },
  {
    txt: '《A curated list of delightful Node.js packages and resources》',
    example: 'https://github.com/sindresorhus/awesome-nodejs'
  },
  {
    txt: '《Node.js Books》',
    example: 'https://github.com/pana/node-books'
  }
  ]
},
{
  title_main: 'Node.js 名人',
  topic: [{
    txt: '《名人堂》',
    example: 'https://github.com/cnodejs/nodeclub/wiki/名人堂'
  }]
}
  // {
  //   title_main: 'Node.js 服务器',
  //   topic: [{
  //     txt: '新手搭建 Node.js 服务器，推荐使用无需备案的 DigitalOcean(https://www.digitalocean.com/)'
  //   }]
  // }
];

export {
  APIData,
  NewData
};
