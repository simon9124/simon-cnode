1. 在 mpvue 中使用 iview weapp 等第三方组件库的方法：官方的办法（在 main.js 中引用 usingComponents）怎么都不行
2. 在 mpvue 中使用 weui 的 input 组件时，每次输入一个字符后会自动失去焦点（解决方法：用 vue 原生的 input 和@input(\$event)事件监听输入内容的变化）
3. mpvue 的生命周期：vue 的 created 会先于小程序 onLoad 函数调用，小程序第一页出现前就已经创建出了所有页面对应的 Vue 实例。如果把接口请求放到 created 生命周期，会造成接口提早调用，产生不必要的 bug。因此，页面加载的方法需要放在 onLoad 周期中。同理，每次用小程序原生的 wx.navigateBack 方法回到上一个页面时，并没有销毁内存中的数据，需要主动在 onUnload 时销毁（而非 vue 中的 beforeDestroy），或者在 onload 时重置数据，否则重新加载时，Vue 实例还保存着上一次加载页面时的数据。详见[mpvue 生命周期](http://mpvue.com/mpvue/#实例生命周期)
4. mpvue 经典 bug：同一路由切换时，上一次的页面数据会保留 https://github.com/Meituan-Dianping/mpvue/issues/140

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

5. mpvue 在 `mixin` 中不支持 `components`
6. 使用 `scroll-view` 的小程序原生组件时，若想实现 `@scroll`、`scroll-top` 等事件和属性，需手动设置 `scroll-view` 的动态或静态高度，否则无法触发
7. mpvue 不支持 vue 的 transition 标签，使用原生 css3 动画代替
8. mpvue 已暂停更新，在最新版开发者工具打开会有很多 `warnings`，不影响开发和调试，可以屏蔽掉
9. 在 mpvue 使用 wxParse 会造成页面非常卡顿，已放弃，使用原生 rich-text 代替
10. mpvue 分享到好友圈：与 methods 同级的方法 onShareAppMessage

```js
onShareAppMessage(res) {
  return {
    title: "", // 标题
    path: "", // 页面路径
    imageUrl: "" // 封面图路径
  };
},
```

11. mpvue 追加 "分享到好友圈" 功能，需在 `node_modules\mpvue\index.js` 里做追加处理：

```js
// 用户点击右上角分享
onShareAppMessage: ...

// 追加：分享朋友圈
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
