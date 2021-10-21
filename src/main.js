import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入 iconfont.css
import './assets/iconfont/iconfont.css'
// 引入主题样式文件
import "@/assets/less/theme.less";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
