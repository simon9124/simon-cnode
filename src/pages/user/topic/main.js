import Vue from "vue";
import App from "./index";
import mixin from "@/mixin"; // 引入mixin文件

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};
Vue.mixin(mixin);

const app = new Vue(App);
app.$mount();
