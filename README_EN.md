# simon-cnode

> A Mpvue project

## Build Setup

```bash
# bugs：

小程序无序列表小圆点无效
list-style-type: disc !important;

在 mpvue 中使用 iview weapp 或 weui 的 input 组件时，每次输入一个字符后会自动失去焦点
解决方法：用vue原生的input和@input($event)事件监听输入内容的变化

# 踩坑
在mpvue中使用 iview weapp 等第三方组件库的方法：
```
