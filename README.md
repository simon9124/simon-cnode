# simon-cnode

---

基于 mpVue 开发的小程序版本的 cnode 社区，api 均从 node 官网获取

## Build Setup

**用到的插件：**

> - [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。支持平台：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器。
> - [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse) - 适用于 Mpvue 的微信小程序富文本解析自定义组件

**用到的组件库：**

> - [mpvue-weui](https://github.com/MPComponent/mpvue-weui) - 基于 mpvue 的 weui 框架
> - [iview-weapp](https://github.com/TalkingData/iview-weapp) - 一套高质量的微信小程序 UI 组件库（无法引入）

**踩坑：**

> - 小程序无序列表小圆点无效：list-style-type: disc !important;
> - 小程序不支持转义字符，需在 html 结构里使用{{}}表达式，如：{{'<'}}；
> - 小程序不支持多种 css 选择器：~、+、\*等
> - 在 mpvue 中使用 iview weapp 等第三方组件库的方法：官方的办法（在 main.js 中引用 usingComponents）怎么都不行
> - 在 mpvue 中使用 weui 的 input 组件时，每次输入一个字符后会自动失去焦点（解决方法：用 vue 原生的 input 和@input(\$event)事件监听输入内容的变化）
> - mpvue 的生命周期：vue 的 created 会先于小程序 onLoad 函数调用，小程序第一页出现前就已经创建出了所有页面对应的 Vue 实例。如果把接口请求放到 created 生命周期，会造成接口提早调用，产生不必要的 bug，因此页面加载的方法需要放在 onLoad 周期中。[mpvue 生命周期](http://mpvue.com/mpvue/#实例生命周期)
> - swiper 组件禁止手动滑动的方法：

```bash
 # 禁止siper组件滑动（左右上下均禁止滑动，内容若超出页面则不适用此方法）
<swiper-item @touchmove.stop.prevent='catchTouchMove'></swiper>

catchTouchMove() {
  return false;
}
```

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
