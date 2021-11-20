<template>
  <div class="device-container">
    <!-- 设备页面的头部 -->
    <div class="device-header">
      <!-- 当前连接的设备 -->
      <p class="now-device">当前连接的设备：{{ currentDeviceName }}</p>
      <button class="refresh-list" @click="refreshList">刷新设备列表</button>
    </div>
    <!-- 设备列表最外层盒子 -->
    <div class="device-list">
      <!-- 设备列表头 -->
      <div class="list-header">
        <div class="device-serial-th">设备(数量: {{ deviceCount }})</div>
        <div class="status-th">状态</div>
        <div class="android-version-th">系统</div>
        <div class="company-th">厂商</div>
        <div class="device-model-th">型号</div>
        <div class="oprate-th">操作</div>
      </div>
      <!-- 列表主体 -->
      <div class="list-body">
        <div class="listItem" v-for="(item, index) in deviceArr" :key="index">
          <p class="device-serial">{{ item.serial }}</p>
          <p class="status">{{ item.status }}</p>
          <p class="android-version">{{ item.version }}</p>
          <p class="company">{{ item.brand }}</p>
          <p class="device-model">{{ item.model }}</p>
          <!-- 连接按钮盒子 -->
          <div class="connect-container"> 
            <p class="oprate"><button class="connect" @click="usbConnect(item.serial)">连接</button></p>
            <p class="oprate"><button class="connect" @click="remoteConnect(item.serial)">连接</button></p>
          </div>
        </div>
      </div>
      <!-- 暂无设备提示 -->
      <p class="no-device-title">暂 无 设 备</p>
    </div>
  </div>
</template>

<script>
// 导入命令方法模块
const { eS } = require("../utils/cmd")
// 创建 eS 类的实例
const es = new eS()


export default {
  data () {
    return {
      // 设备数量
      deviceCount: 0,
      // 设备信息数组
      deviceArr: [],
      // 当前连接的设备名
      currentDeviceName: "",
    }
  },
  methods: {
    // 刷新设备列表方法
    refreshList () {
      // 定义提示语变量
      let getDeviceMsg = ""
      // 判断长度，若长度为 0 则表示无设备
      if (es.getBaseInfo().length == 0) {
        getDeviceMsg = "暂无设备"
      } else {
        // 初始化设备信息数组和设备数量
        this.deviceArr = es.getBaseInfo()
        this.deviceCount = es.getBaseInfo().length
        // 显示列表主体
        let list = document.querySelector(".list-body")
        // 隐藏无设备提醒文字
        let nodevice = document.querySelector(".no-device-title")
        list.style.display = "flex"
        nodevice.style.display = "none"
        getDeviceMsg = "获取成功"
      }
      // 弹窗
      this.$dialog.alert({
        confirmButtonText: "确 定",
        message: getDeviceMsg,
      })
    }, // 刷新设备列表方法结束
    // usb 连接设备
    usbConnect (serial) {
      // 调用连接设备的方法
      let result = es.connect(serial)
      // 连接设备的提示语
      let usbConnectMsg = ""
      if (result === "") {
        usbConnectMsg = "未知错误,请刷新重试"
      } else {
        this.currentDeviceName = serial
        usbConnectMsg = "连接成功"
      }
      // 弹窗
      this.$dialog.alert({
        confirmButtonText: "确 定",
        message: usbConnectMsg,
      })
    },// usb 连接设备方法结束
    // 远程连接设备方法开始
    remoteConnect () {

    },// 远程连接设备方法开始
  },
}
</script>

<style>
/* 设备页面最外层盒子 */
.device-container {
  width: 100%;
  height: 100%;
  background-color: rgb(39, 44, 60);
}
/* 设备页面的头部 */
.device-header {
  width: 650px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: rgb(204, 204, 204);
  font-size: 20px;
}
/* 刷新列表按钮 */
.refresh-list {
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
/* 设备码表头 */
.device-serial-th {
  width: 25%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 状态表头 */
.status-th {
  width: 10%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 厂商表头 */
.company-th {
  width: 15%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 设备版本表头 */
.android-version-th {
  width: 15%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 设备型号表头 */
.device-model-th {
  width: 15%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 操作表头 */
.oprate-th {
  width: 20%;
}
/* 列表主体 */
.list-body {
  display: none;
  width: 660px;
  height: 100%;
  flex-direction: column;
  color: rgb(204, 204, 204);
  overflow-y: scroll;
  font-size: 13px;
}
/* 连接按钮外层盒子 */
.connect-container {
  display: flex;
  justify-content: space-between;
}
/* 每一行 */
.listItem {
  display: flex;
  width: 100%;
  height: 50px;
}
.listItem:hover {
  background-color: rgb(49, 55, 73);
}
/* 每一行的每个单元格 */
.listItem p {
  display: block;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
/* 设备码单元格 */
.device-serial {
  width: 25%;
}
/* 设备状态单元格 */
.status {
  width: 10%;
}
/* 厂商单元格 */
.company {
  width: 15%;
}
/* 设备版本单元格 */
.android-version {
  width: 15%;
}
/* 设备型号 */
.device-model {
  width: 15%;
}
/* 操作单元格 */
.oprate {
  width: 20%;
}
/* 连接按钮 */
.connect {
  width: 50px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: rgb(33, 202, 120);
  color: white;
}
/* 滚动条的样式 */
.list-body::-webkit-scrollbar {
  width: 10px;
  border: none;
}
/* 滚动条滑块的样式 */
.list-body::-webkit-scrollbar-thumb {
  background-color: rgb(48, 60, 78);
}
/* 暂无设备提示 */
.no-device-title {
  /* display: none; */
  margin: 50px auto;
  font-size: 30px;
  color: rgb(204, 204, 204);
}
/* vant 对话框样式 */
.van-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 250px;
  left: 400px;
  width: 350px;
  height: 150px;
    /* border: solid 2px red; */
  background-color: rgb(50, 56, 76);
}
/* vant 对话框的内容样式 */
.van-dialog__message {
  color: white;
}
.van-hairline--top.van-dialog__footer {
  width: 100px;
  height: 30px;
  background-color: rgb(50, 56, 76);
}
.van-button.van-button--default.van-button--large.van-dialog__confirm {
  border: none;
  margin-top: 10px;
}
.van-button__content {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100px;
  height: 30px;
  background-color: rgb(33, 202, 120);
  color: white;
  cursor: pointer;
}
</style>