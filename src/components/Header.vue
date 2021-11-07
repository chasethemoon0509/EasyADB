<template>
  <div class="header-container">
    <!-- 最小化、关闭按钮盒子 -->
    <div class="window-op">
        <i class="iconfont icon-zuixiaohua" id="min" @click="minWindow" title="最小化"></i>
        <i class="iconfont icon-guanbi" id="close" @click="closeWindow" title="关闭"></i>
    </div>
  </div>
</template>

<script>
// 导入 ipcRenderer
const ipcRenderer = require("electron").ipcRenderer;

export default {
    methods: {
        // 最小化窗口方法
        minWindow () {
            ipcRenderer.send("min")
        },
        // 关闭窗口方法
        closeWindow () {
            ipcRenderer.send("close")
        },
    }
}
</script>

<style>
/* 头部最外层盒子 */
.header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750px;
    height: 30px;
    background-color: rgb(39, 44, 60);
}
/* 关闭、最小化操作外层盒子 */
.window-op {
    position: absolute;
    right: 0px;
    /* top: 5px; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80px;
    height: 30px;
}
/* 关闭、最小化按钮 */
.window-op i {
    display: block;
    font-size: 15px;
    border-radius: 30px;
    padding: 5px 5px;
    background-color: rgb(204, 204, 204);
}
#min:hover {
    cursor: pointer;
    background-color: rgb(33, 202, 120);
    color: white;
}
#close:hover {
    cursor: pointer;
    background-color: red;
    color: white;
}
</style>