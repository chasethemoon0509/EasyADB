<template>
  <div class="apk-container">
    <!-- 头部 -->
      <div class="apk-header">
        <p>对设备中的应用进行操作</p>
        <button class="refresh-app-list" @click="refrushAppInfo">刷新应用列表</button>
      </div>
      <!-- 设备列表最外层盒子 -->
      <div class="device-list">
      <!-- 应用表头 -->
        <div class="list-header">
          <div class="package-name-th">包名
            <div class="search-container">
              <i class="iconfont icon-sousuo" id="search"></i>
              <input type="search" placeholder="搜索" class="search-input">
            </div>
          </div>
          <div class="app-version-th">版本</div>
          <div class="app-oprate-th">操作</div>
        </div>
      <!-- 列表主体 -->
        <div class="app-list-body">
          <div class="applistItem" v-for="(item, index) in appList" :key="index">
            <p class="app-version">{{ item.packageName }}</p>
            <p class="package-name">{{ item.appVersion }}</p>
            <p class="app-oprate"><button class="connect" @click="connectDevice(item.serial)">连接</button></p>
          </div>
        </div>
      <!-- 暂无设备提示 -->
      <p class="no-app-title">暂 无 应 用</p>
    </div>
  </div>
</template>

<script>
import allApi from "../utils/api"

export default {
  data () {
    return {
      // app 列表
      appList: []
    }
  },
  methods: {
    // 获取应用信息
    async refrushAppInfo() {
      this.$dialog.alert({
        confirmButtonText: "确 定",
        message: "加载中",
      })
      const res = await allApi.getAppInfo()
      if (res.statusText == "OK") {
        let vantDialog = document.querySelector(".van-dialog")
        vantDialog.style.display = "none"
      }
      // 列表主体
      let list = document.querySelector(".app-list-body")
      // 无 app 信息提示
      let noapp = document.querySelector(".no-app-title")

      if (res.data.length != 0) {
        this.appList = res.data
        list.style.display = "flex"
        noapp.style.display = "none"
        console.log(res);
      } else {
        console.log("错误");
      }
      
    }, // 获取应用信息结束
  }
}
</script>

<style>
/* 最外层盒子 */
.apk-container {
  width: 100%;
  height: 100%;
  background-color: rgb(39, 44, 60);
}
.apk-header {
  width: 650px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: rgb(204, 204, 204);
  font-size: 20px;
}
/* 刷新列表按钮 */
.refresh-app-list {
  padding: 5px 0;
  width: 100px;
  background-color: rgb(33, 202, 120);
  border: none;
  cursor: pointer;
  color: white;
}
/* 设备列表 */
.device-list {
  width: 650px;
  height: 400px;
  margin: 30px auto;
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
}
/* 列表头部 */
.list-header {
  width: 650px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 2px rgb(66, 76, 104);
  border-bottom: solid 2px rgb(66, 76, 104);
  color: rgb(204, 204, 204);
  text-align: center;
}
/* 每一行 */
.applistItem {
  display: flex;
  width: 100%;
  height: 50px;
}
/* 每一行的单元格 */
.applistItem p {
  display: block;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
/* 系统版本表头 */
.app-version-th {
  width: 30%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 包名表头 */
.package-name-th {
  width: 50%;
  border-right: solid 1px rgb(66, 76, 104);
  display: flex;
  justify-content: center;
}
/* 操作表头 */
.app-oprate-th {
  width: 20%;
}
/* 列表主体 */
.app-list-body {
  display: none;
  width: 660px;
  height: 100%;
  flex-direction: column;
  color: rgb(204, 204, 204);
  overflow-y: scroll;
}
/* 应用版本单元格 */
.app-version {
  width: 30%;
}
/* 应用包名单元格 */
.package-name {
  width: 50%;
}
/* 操作单元格 */
.app-oprate {
  width: 20%;
}
/* 搜索功能最外层盒子 */
.search-container {
  margin-left: 30px;
  display: flex;
  color: rgb(204, 204, 204);
  border-radius: 10px;
  background-color: rgb(66, 76, 104);
}
/* 搜索框样式 */
.search-input {
  margin-top: 1px;
  height: 90%;
  width: 80%;
  outline: none;
  background-color: rgb(66, 76, 104);
  border: none;
  color: rgb(204, 204, 204);
  text-indent: 5px;
}
/* 搜索按钮的样式 */
#search {
  margin-left: 5px;
  color: rgb(204, 204, 204);
  cursor: pointer;
}
.no-app-title {
  margin: 50px auto;
  font-size: 30px;
  color: rgb(204, 204, 204);
}
</style>