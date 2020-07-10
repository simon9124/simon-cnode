import Vue from "vue";
import App from "./App";

// css
import "@/common/common.scss";

// mpvue-weui
import "mpvue-weui/src/style/weui.css";

// mpvue-wxparse
// import "mpvue-wxparse/src/wxParse.css"; // 原插件css
import "@/common/wxParse.css"; // copy后便于修改

// 查看console里会打印每500ms更新的数据量
Vue.config._mpTrace = true;

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);
app.$mount();
