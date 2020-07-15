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
- swiper 组件禁止手动滑动的方法：

```bash
 # 禁止siper组件滑动（左右上下均禁止滑动，内容若超出页面则不适用此方法）
<swiper-item @touchmove.stop.prevent='catchTouchMove'></swiper>

catchTouchMove() {
  return false;
}
```

**mppvue：**

- 在 mpvue 中使用 iview weapp 等第三方组件库的方法：官方的办法（在 main.js 中引用 usingComponents）怎么都不行
- 在 mpvue 中使用 weui 的 input 组件时，每次输入一个字符后会自动失去焦点（解决方法：用 vue 原生的 input 和@input(\$event)事件监听输入内容的变化）
- mpvue 的生命周期：vue 的 created 会先于小程序 onLoad 函数调用，小程序第一页出现前就已经创建出了所有页面对应的 Vue 实例。如果把接口请求放到 created 生命周期，会造成接口提早调用，产生不必要的 bug。因此，页面加载的方法需要放在 onLoad 周期中。同理，每次用小程序原生的 wx.navigateBack 方法回到上一个页面时，并没有销毁内存中的数据，需要主动在 onUnload 时销毁（而非 vue 中的 beforeDestroy），或者在 onload 时重置数据，否则重新加载时，Vue 实例还保存着上一次加载页面时的数据。详见[mpvue 生命周期](http://mpvue.com/mpvue/#实例生命周期)

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

- 部分转义字符（`/`，`）在 wxParse 的 <pre> 标签内不解析，需手动转义：

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

- 代码高亮问题，参见https://blogai.cn/posts/29，代码段的换行符会失效，暂无解决办法

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
