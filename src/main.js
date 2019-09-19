import Vue from 'vue';
import App from './App';

// css
import '@/common/common.scss';

// flyio
// import fly from 'flyio';
// import fly from '@/utils/fly.mock.js';
// Vue.prototype.$fly = fly;

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
