# simon-cnode

基于 mpVue 开发的小程序版本的 cnode 社区，api 均从 node 官网获取

## 插件&组件库

**用到的插件：**

- [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。支持平台：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器。
- [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse) - 适用于 Mpvue 的微信小程序富文本解析自定义组件（造成页面卡顿，暂不使用）

**用到的组件库：**

- [mpvue-weui](https://github.com/MPComponent/mpvue-weui) - 基于 mpvue 的 weui 框架
- [iview-weapp](https://github.com/TalkingData/iview-weapp) - 一套高质量的微信小程序 UI 组件库（无法引入）

## 踩坑

- <a href="https://github.com/simon9124/simon-cnode/blob/master/src/issues/%E5%B0%8F%E7%A8%8B%E5%BA%8F.md" target="_blank">小程序踩坑 →</a>
- <a href="https://github.com/simon9124/simon-cnode/blob/master/src/issues/mpvue.md" target="_blank">mpvue 踩坑 →</a>
- <a href="https://github.com/simon9124/simon-cnode/blob/master/src/issues/mpvue-wxParse.md" target="_blank">mpvue-wxParse 踩坑 →</a>

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
