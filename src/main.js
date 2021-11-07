import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// 引入 iconfont.css
import './assets/iconfont/iconfont.css'
// 引入主题样式文件
import "@/assets/less/theme.less";
import { Dialog } from 'vant'

Vue.use(Dialog)

Vue.config.productionTip = false;

// 配置全局 axios
axios.defaults.baseURL = "http://127.0.0.1:9527"
// 挂载到 vue 实例
Vue.prototype.$axios = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
