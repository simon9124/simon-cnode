# simon-cnode

---

基于 mpVue 开发的小程序版本的 cnode 社区，api 均从 node 官网获取

## Build Setup

**用到的插件：**

> * [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。支持平台：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器。
> * [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse) - 适用于 Mpvue 的微信小程序富文本解析自定义组件

**用到的组件库：**

> * [mpvue-weui](https://github.com/MPComponent/mpvue-weui) - 基于 mpvue 的 weui 框架
> * [iview-weapp](https://github.com/TalkingData/iview-weapp) - 一套高质量的微信小程序 UI 组件库

**踩坑：**

> * 小程序无序列表小圆点无效：list-style-type: disc !important;
> * 在 mpvue 中使用 iview weapp 或 weui 的 input 组件时，每次输入一个字符后会自动失去焦点（解决方法：用 vue 原生的 input 和@input($event)事件监听输入内容的变化）
> * 在 mpvue 中使用 iview weapp 等第三方组件库的方法：
