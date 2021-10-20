<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <div id="content">
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- router-view 显示区域 -->
      <router-view></router-view>
      <button>sun</button>
      <button>night</button>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";
import Footer from "./components/Footer.vue";


export default {
  name: 'App',
  components: { 
    Header,
    Aside,
    Footer
  },
}
</script>

<style>
/* 初始化 */
body {
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
}
#app {
  /* rgb(240, 241, 246) */
  background-color: rgb(240, 241, 246);
  /* -webkit-app-region: drag; */
}
/* 侧边栏和页面区域, flex 布局，使侧边栏和页面在一行显示 */
#content {
  display: flex;
}
</style>
