1. 0.6 版本以后，需引入 css 文件 import 'mpvue-wxparse/src/wxParse.css';
2. 在 v-for 循环使用时，循环次数较多会造成页面卡死，使用 rich-text 原生组件代替，但不支持`<a>`标签
3. 解析 img 时，插件已给出解决小程序图片高度问题，解决办法：

```bash
  <wxParse :content="article.content" :imageProp="{mode:'widthFix'}"></wxParse>
```

4. 默认将换行符清空，手动设置为`<br>`标签又包含高度，因此用一个看不见的`<hr>`代替：

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

5. 部分转义字符（`/`，`）在 wxParse 的`<pre>` 标签内不解析，需手动转义：

```js
this.$set(
  this.article,
  "content",
  this.article.content.replace(new RegExp("&#x2F;", "gi"), "/")
);
```

6. 解析 a 标签跳转问题，用@navigate 实现点击`<a>`标签的事件，再用 web-view 组件实现页面跳转，且需在小程序后台**配置业务域名**方可正常跳转。因个人和海外账号不可配置业务域名，本项目暂无法实现外链跳转。开发时，可**取消域名校验**进行相关测试

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

7. `<code>`标签内代码段高亮的方法，参见https://blogai.cn/posts/29。此法会导致**换行符会失效**、**部分转义字符不解析**以及**页面卡顿**，暂不使用
