import Vue from "vue";
import VueRouter from "vue-router";
import Devices from "../views/Devices.vue";
import Apk from "../views/Apk.vue";
import Log from "../views/Log.vue";
import Tools from "../views/Tools.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dev",
    name: "Devices",
    component: Devices,
  },
  {
    path: "/apk",
    name: "Apk",
    component: Apk,
  },
  {
    path: "/log",
    name: "Log",
    component: Log,
  },
  {
    path: "/tools",
    name: "Tools",
    component: Tools,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
