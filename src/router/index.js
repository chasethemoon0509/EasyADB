import Vue from "vue";
import VueRouter from "vue-router";
// 导入 views 文件夹中的页面
import Device from "../views/Device.vue"
import Apk from "../views/Apk.vue"
import Log from "../views/Log.vue"
import FakeData from "../views/FakeData.vue"
import About from "../views/About.vue"



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Device
  },
  {
    path: "/device",
    component: Device
  },
  {
    path: "/apk",
    component: Apk
  },
  {
    path: "/log",
    component: Log
  },
  {
    path: "/fakedata",
    component: FakeData
  },
  {
    path: "/about",
    component: About
  },
];

const router = new VueRouter({
  routes,
});

export default router;
