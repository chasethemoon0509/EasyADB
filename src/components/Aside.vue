<template>
  <div class="aside-container">
    <!-- logo -->
    <p class="logo">Easy ADB</p>
    <p class="version">V0.0.1</p>
    <!-- 菜单 -->
    <div class="menu-container">
        <router-link to="/device"><i class="iconfont icon-shouji"></i>设备连接</router-link>
        <router-link to="/apk"><i class="iconfont icon-apk"></i>apk操作</router-link>
        <router-link to="/log"><i class="iconfont icon-rizhi"></i>日志输出</router-link>
        <router-link to="/fakedata"><i class="iconfont icon-gongju"></i>测试数据</router-link>
        <router-link to="/about"><i class="iconfont icon-guanyu"></i>使用说明</router-link>
    </div>
    <!-- adb 服务按钮外层盒子 -->
    <div class="adb-serve">
        <button @click="restartADB">重启ADB服务</button>
        <button @click="stopADB">停止ADB服务</button>
        <button @click="test">test</button>
    </div>
  </div>
</template>

<script>
const { exec } = require('child_process')
import { getDevInfo } from "../utils/api"

export default {
    methods: {
        // 重启 adb 服务方法开始
        restartADB () {
            this.$axios.get("/adb_start")
                .catch((err) => {
                    this.$dialog.alert({
                        confirmButtonText: "确 定",
                        message: "未知错误,请重试",
                    })
                    console.log(err);
                })
                .then((res) => {
                    if (res.data.data == 1) {
                        this.$dialog.alert({
                            confirmButtonText: "确 定",
                            message: "启动成功",
                        })
                    } else {
                        this.$dialog.alert({
                            confirmButtonText: "确 定",
                            message: "启动失败，请重试",
                        })
                    }
                    console.log(res);
                })
                
        },// 重启 adb 服务方法结束
        // 停止 adb 服务方法开始
        stopADB () {
            exec(`cd public/python/ && adb kill-server`, (err, stdout) => {
                let modal = document.querySelector(".modal-container")
                if (err) {
                    console.log("adb服务停止失败：", err);
                    this.adbmsg = "停止失败"
                    // 修改模态框的 display 属性
                    modal.style.display = "flex"
                    console.log("结果字符串中有 failed :", stdout);
                } else if (stdout.search("failed") == -1) {
                    this.adbmsg = "停止成功"
                    // 修改模态框的 display 属性
                    modal.style.display = "flex"
                    console.log("结果字符串中没有 failed :", stdout);
                } else {
                    this.adbmsg = "停止失败"
                    // 修改模态框的 display 属性
                    modal.style.display = "flex"
                    console.log("其他情况, 停止失败");
                }
            })
        },   // 停止 adb 服务方法结束
        async test () {
            const data = await getDevInfo()
            console.log("请求结果", data);
        }
    }
}
</script>

<style>
/* 侧边栏整体大盒子 */
.aside-container {
    height: 650px;
    width: 200px;
    background-color: rgb(48, 60, 78);
}
/* logo */
.logo {
    height: 30px;
    padding: 10px 0;
    text-align: center;
    font-size: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: oblique;
    color: rgb(204, 204, 204);
}
/* 版本 */
.version {
    text-align: center;
    color: rgb(204, 204, 204);
}
/* 菜单盒子 */
.menu-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 50px;
}
/* router-link 的样式，实质就是 a 标签的样式 */
a {
    padding: 10px 10px;
    font-size: 20px;
    text-decoration: none;
    color: rgb(204, 204, 204);
}
a:hover {
    background-color: rgb(45, 52, 69);
}
/* router-link 点击后的样式 */
.router-link-active {
    color: rgb(33, 202, 120);
}
/* 菜单图标和文字的距离 */
.menu-container i {
    margin-right: 10px;
}
/* adb 服务按钮外层盒子 */
.adb-serve {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    margin-top: 30px;
}
/* adb 服务按钮 */
.adb-serve button {
    /* margin-bottom: 20px; */
    padding: 5px 0;
    width: 100px;
    cursor: pointer;
    background-color: rgb(33, 202, 120);
    color: white;
    border: none;
}
</style>