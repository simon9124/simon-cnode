import Vue from 'vue';
import App from './App';

// css
import '@/common/common.scss';
import 'mpvue-wxparse/src/wxParse.css';

// mpvue-weui
import 'mpvue-weui/src/style/weui.css';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
