<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <div id="content">
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- router-view 显示区域 -->
      <router-view></router-view>
    </div>
    <!-- 底部区域 -->
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

<style lang="less">
body {
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
}
#app {
  // 动态样式, 变量 --app-bg-color 表示根组件的背景颜色，有不同的值
  background: var(--app-bg-color);
}
#content {
  display: flex;
}
</style>
