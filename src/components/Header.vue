<template>
  <div class="header-main">
    <!-- 头部 -->
    <div class="header">
      <!-- logo 区域盒子 -->
      <div class="logo-container">
        <!-- logo 文字 -->
        <strong class="logo-text">EasyADB</strong>
      </div>
      <!-- 菜单区域盒子 -->
      <div class="menu-container">
        <!-- 设备相关菜单 -->
        <router-link to="/dev" title="设备相关" class="iconfont icon-shouji"></router-link>
        <!-- apk 操作相关菜单 -->
        <router-link to="/apk" title="apk 相关" class="iconfont icon-apk"></router-link>
        <!-- 日志相关菜单 -->
        <router-link to="/log" title="日志相关" class="iconfont icon-rizhi"></router-link>
        <!-- 工具相关菜单 -->
        <router-link to="/tools" title="工具相关" class="iconfont icon-gongju"></router-link>
        <!-- 关于相关菜单 -->
        <router-link to="/about" title="关于" class="iconfont icon-guanyu"></router-link>
      </div>
      <!-- 最小化、关闭盒子 -->
      <div class="op-container">
        <!-- 最小化 -->
        <i class="iconfont icon-zuixiaohua" id="min" @click="minWin"></i>
        <!-- 关闭 -->
        <i class="iconfont icon-guanbi" id="close" @click="closeWin"></i>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 ipcRenderer
const { ipcRenderer: ipc } = require('electron')
export default {
  name: 'Header',
  methods: {
    // 最小化窗口
    minWin () {
      ipc.send('min')
    },
    closeWin () {
      ipc.send('close')
    }
  }
}
</script>

<style lang="less">
/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  box-shadow: 0px 2px 5px gray;
  // 动态样式, 变量 --header-bg-color 表示 header 菜单栏的背景颜色，有不同的值
  background-color: var(--header-bg-color);
}
/* logo 区域盒子 */
.logo-container {
  width: 100px;
  height: 50px;
  padding: 10px 0;
}
/* logo 文字 */
.logo-text {
  line-height: 50px;
  color: rgb(13, 104, 241);
  font-size: 20px;
  font-family: Klavika Bold;
  margin-left: 10px;
}
/* 菜单区域盒子 */
.menu-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 100%;
  /* border: solid 1px red; */
  -webkit-app-region: no-drag;
}
  /* router-link 激活后的样式，即点击后的样式 */
.router-link-active {
  text-decoration: none;
  // 动态样式, 变量 --menu-text-color 菜单点击后底部边框的颜色
  border-bottom: solid 5px var(--menu-text-color);
  // 动态样式, 变量 --menu-text-color 菜单点击后图标的颜色
  color: var(--menu-text-color);
}
a{
  display: block;
  height: 70px;
  line-height: 40px;
  text-decoration: none;
  color: rgb(177, 177, 178);
  padding: 15px 0;
 /* 盒模型 width=content+padding+border，以实现选择某个菜单后，底部蓝色边框不会把图标原有位置顶开 */
  box-sizing: border-box;
}
/* 最小化、关闭盒子 */
.op-container {
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  height: 70px;
}
/* 最小化和关闭按钮基本样式 */
.op-container i {
  display: block;
  padding: 8px;
  background: rgb(224, 224, 223);
  border-radius: 50px;
  font-size: 15px;
}
/* 最小化按钮 hover 时的样式 */
#min:hover {
  cursor: pointer;
  background: rgb(13, 104, 241);
  color: white;
}
/* 关闭按钮 hover 时的样式 */
#close:hover {
  cursor: pointer;
  background: rgb(215, 21, 38);
  color: white;
}
</style>