# simon-cnode

基于 mpVue 开发的小程序版本的 cnode 社区，api 均从 node 官网获取

## 插件&组件库

**用到的插件：**

- [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。支持平台：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器。
- [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse) - 适用于 Mpvue 的微信小程序富文本解析自定义组件

**用到的组件库：**

- [mpvue-weui](https://github.com/MPComponent/mpvue-weui) - 基于 mpvue 的 weui 框架
- [iview-weapp](https://github.com/TalkingData/iview-weapp) - 一套高质量的微信小程序 UI 组件库（无法引入）

## 踩坑

**小程序：**

- 小程序无序列表小圆点无效：list-style-type: disc !important;
- 小程序不支持转义字符，需在 html 结构里使用{{}}表达式，如：{{'<'}}；
- 小程序不支持多种 css 选择器：~、+、\*等
- 小程序不支持跳转到外部链接，会屏蔽所有的`<a>`标签，项目内的所有外链暂时都是打不开的
- 小程序 rich-text 组件内屏蔽所有节点的事件，无法获取被点击的内部元素
- 根据单词换行：word-break: break-word;
- 大部分情况下，小程序通过 font-family 修改字体无效
- swiper 组件禁止手动滑动的方法：

```bash
 # 禁止siper组件滑动（左右上下均禁止滑动，内容若超出页面则不适用此方法）
<swiper-item @touchmove.stop.prevent='catchTouchMove'></swiper>

catchTouchMove() {
  return false;
}
```

- 带参传值，JSON.parse 无法识别特殊字符，可能报错 `Unexpected end of JSON input`，需在传值和解析时分别做编码解码处理 `encodeURIComponent` 和 `decodeURIComponent`

```js
// 跳转页传值
wx.navigateTo({
  url: `/pages/user/topic/main?topicList=${encodeURIComponent(JSON.stringify(Obj))}`
});

// 调转页接收值
onLoad () {
  this.topicList = JSON.parse(decodeURIComponent(this.$root.$mp.query.topicList));
},
```

- 根据 sitemap 的规则[0]，当前页面 [pages/index/index] 将被索引：

```json
// project.config.json
{
  "checkSiteMap": false
}
```

- 新增页面时，在**真机调试**时会提示 page "xxx" has not been registered yet：webpack 编译的文件是由配置的 entry 决定的，新增的页面并没有添加进 entry，需重新编译 `npm run dev`。若仍不生效，试试卸载开发者工具再安装最新稳定版：https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html

- 真机测试时，最好取消勾选“不校验合法域名”，可能造成页面卡住
- 微信开发者工具性能不稳定，如果页面卡顿可尝试清理缓存，若还无效尝试卸载重装

**mpvue：**

- 在 mpvue 中使用 iview weapp 等第三方组件库的方法：官方的办法（在 main.js 中引用 usingComponents）怎么都不行
- 在 mpvue 中使用 weui 的 input 组件时，每次输入一个字符后会自动失去焦点（解决方法：用 vue 原生的 input 和@input(\$event)事件监听输入内容的变化）
- mpvue 的生命周期：vue 的 created 会先于小程序 onLoad 函数调用，小程序第一页出现前就已经创建出了所有页面对应的 Vue 实例。如果把接口请求放到 created 生命周期，会造成接口提早调用，产生不必要的 bug。因此，页面加载的方法需要放在 onLoad 周期中。同理，每次用小程序原生的 wx.navigateBack 方法回到上一个页面时，并没有销毁内存中的数据，需要主动在 onUnload 时销毁（而非 vue 中的 beforeDestroy），或者在 onload 时重置数据，否则重新加载时，Vue 实例还保存着上一次加载页面时的数据。详见[mpvue 生命周期](http://mpvue.com/mpvue/#实例生命周期)
- mpvue 经典 bug：同一路由切换时，上一次的页面数据会保留 https://github.com/Meituan-Dianping/mpvue/issues/140

```js
const dataStack = []; // 建一个页面栈

export default {
  data () {
    return {...};
  },
  onLoad () {
    dataStack.push({ ...this.$data }); // 备份数据
    // 其他初始化....一定要先备份，再做其他初始化
  },
  onUnload () {
    Object.assign(this.$data, dataStack.pop()); // 恢复数据
  }
}
```

由于 vue 的 mixin 中的代码先于页面执行，因此上述方法可优化到 mixin.js 文件中：

```js
let mixin = {
  data() {
    return {
      dataStack: [], // 解决mpvue相同组件数据不更新问题，建立栈堆
    };
  },
  onUnload() {
    Object.assign(this.$data, this.dataStack.pop()); // 恢复
  },
  onLoad() {
    this.dataStack.push({ ...JSON.parse(JSON.stringify(this.$data)) }); // 备份
  },
};
export default mixin;
```

再在文件对应的 main 中引用：

```js
import Vue from "vue";
import App from "./index";
import mixin from "@/mixin"; // 引入mixin文件

...
Vue.mixin(mixin);

const app = new Vue(App);
app.$mount();
```

- mpvue 在 `mixin` 中不支持 `components`
- 使用 `scroll-view` 的小程序原生组件时，若想实现 `@scroll`、`scroll-top` 等事件和属性，需手动设置 `scroll-view` 的动态或静态高度，否则无法触发
- mpvue 不支持 vue 的 transition 标签，使用原生 css3 动画代替
- mpvue 已暂停更新，在最新版开发者工具打开会有很多 `warnings`，不影响开发和调试，可以屏蔽掉
- 在 mpvue 使用 wxParse 会造成页面非常卡顿，已放弃，使用原生 rich-text 代替
- mpvue 分享到好友圈：与 methods 同级的方法 onShareAppMessage

```js
onShareAppMessage(res) {
  return {
    title: "", // 标题
    path: "", // 页面路径
    imageUrl: "" // 封面图路径
  };
},
```

- mpvue 未更新并追加 "分享到好友圈" 功能，需在 `node_modules\mpvue\index.js` 里做追加处理：

```js
// 用户点击右上角分享
onShareAppMessage: ...

// 分享朋友圈
onShareTimeline: rootVueVM.$options.onShareTimeline
  ? function (options) { return callHook$1(rootVueVM, "onShareTimeline", options); } : null,
```

然后在 LIFECYCLE_HOOKS 数组中把 onShareTimeline 添加进去

```js
var LIFECYCLE_HOOKS = [
  ...
  "onShareAppMessage",
  "onShareTimeline",
  ...
];
```

打包后就可以解决啦，详见 https://developers.weixin.qq.com/community/develop/doc/0006ee9d7f8ca02d43aaccd9351400?jumpto=reply&parent_commentid=0008204abb0e40e681aa2c5265b8&commentid=000c02efd1c128a688aaa94ad56c。

**mpvue-wxParse 小程序富文本**

- 0.6 版本以后，需引入 css 文件 import 'mpvue-wxparse/src/wxParse.css';
- 在 v-for 循环使用时，循环次数较多会造成页面卡死，使用 rich-text 原生组件代替，但不支持`<a>`标签
- 解析 img 时，插件已给出解决小程序图片高度问题，解决办法：

```bash
  <wxParse :content="article.content" :imageProp="{mode:'widthFix'}"></wxParse>
```

- 默认将换行符清空，手动设置为`<br>`标签又包含高度，因此用一个看不见的`<hr>`代替：

```js
this.$set(
  this.article,
  "content",
  this.article.content.replace(
    new RegExp("\n", "gi"),
    '<hr style="height:0;visibility:hidden;">'
  )
);
```

- 部分转义字符（`/`，`）在 wxParse 的`<pre>` 标签内不解析，需手动转义：

```js
this.$set(
  this.article,
  "content",
  this.article.content.replace(new RegExp("&#x2F;", "gi"), "/")
);
```

- 解析 a 标签跳转问题，用@navigate 实现点击`<a>`标签的事件，再用 web-view 组件实现页面跳转，且需在小程序后台**配置业务域名**方可正常跳转。因个人和海外账号不可配置业务域名，本项目暂无法实现外链跳转。开发时，可**取消域名校验**进行相关测试

```bash
<wxparse :content="detail" @navigate="navigate"/></wxParse>

navigate (href, e) {
  wx.navigateTo({
    url: `/pages/out/main?href=${href}`,
  });
}
```

```vue
<template>
  <web-view :src="href"></web-view>
</template>

<script>
export default {
  data() {
    return {
      href: "",
    };
  },
  onLoad() {
    this.href = this.$root.$mp.query.href;
  },
};
</script>
```

- `<code>`标签内代码段高亮的方法，参见https://blogai.cn/posts/29。此法会导致**换行符会失效**、**部分转义字符不解析**以及**页面卡顿**，暂不使用

## 安装使用

**下载启动步骤：**

```bash
1.  git clone https://github.com/simon9124/simon-cnode.git；
2.
 # install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

3.  小程序开发工具指向下面的 dist 目录
```

**mpvue 构建新项目步骤：**

```bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```
