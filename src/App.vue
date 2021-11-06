<template>
  <div id="app">
    <!-- 侧边栏 -->
    <Aside></Aside>
    <div class="right-container">
      <!-- 头部 -->
      <Header></Header>
      <!-- 页面显示区域 -->
      <router-view></router-view>
      <!-- 底部 -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Aside from "./components/Aside.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  props: ["tips"],
  components: {
    Aside,
    Header,
    Footer,
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  display: flex;
}
/* 右边部分的布局，右边部分包括顶部、页面显示区域、底部 */
.right-container {
  display: flex;
  flex-direction: column;
}
</style>
