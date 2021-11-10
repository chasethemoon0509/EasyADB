<template>
  <div class="device-container">
    <!-- 设备页面的头部 -->
    <div class="device-header">
      <!-- 当前连接的设备 -->
      <p class="now-device">当前连接的设备：{{ currentConnect }}</p>
      <button class="refresh-list" @click="refreshList">刷新设备列表</button>
    </div>
    <!-- 设备列表最外层盒子 -->
    <div class="device-list">
      <!-- 设备列表头 -->
      <div class="list-header">
        <div class="device-name-th">设备(数量: {{ deviceCount }})</div>
        <div class="status-th">状态</div>
        <div class="android-version-th">系统</div>
        <div class="company-th">厂商</div>
        <div class="oprate-th">操作</div>
      </div>
      <!-- 列表主体 -->
      <div class="list-body">
        <div class="listItem" v-for="(item, index) in deviceArr" :key="index">
          <p class="device-name">{{ item.serial }}</p>
          <p class="status">{{ item.status }}</p>
          <p class="android-version">{{ item.version }}</p>
          <p class="company">{{ item.brand }}</p>
          <p class="oprate"><button class="connect" @click="connect(item.serial)">连接</button></p>
        </div>
      </div>
      <!-- 暂无设备提示 -->
      <p class="no-device-title">暂 无 设 备</p>
    </div>
  </div>
</template>

<script>
import allApi from "../utils/api"

export default {
  data () {
    return {
      // 设备数量
      deviceCount: 0,
      // 设备信息数组
      deviceArr: [],
      // 当前连接设备数量
      currentConnect: "",
      // 弹窗文字
      deviceListTips: ""
    }
  },
  methods: {
    // 刷新设备列表方法
    async refreshList () {
      // 初始化设备信息数组和设备数量
      this.deviceArr = []
      this.deviceCount = 0
      // 列表主体
      let list = document.querySelector(".list-body")
      // 无设备提醒文字
      let nodevice = document.querySelector(".no-device-title")
      const res = await allApi.getDevInfo()
      if (res.data.data.length == 0) {
        this.deviceListTips = "暂无设备，请先将设备与电脑连接"
        console.log(this.deviceListTips);
      } else {
        list.style.display = "flex"
        nodevice.style.display = "none"
        console.log(res.data.data);
      }
      // 弹窗
      this.$dialog.alert({
        confirmButtonText: "确 定",
        message: this.adeviceListTips,
      })
      
    }, // 刷新设备列表方法结束
    // 连接设备
    connect (serial) {
      console.log(serial);
      this.$axios.get("/connect", {
        params: {
          serial
        }
      }).catch((err) => {
        this.$dialog.alert({
          confirmButtonText: "确 定",
          message: "未知错误,请重试",
        })
        console.log(err);
      }).then((res) => {
        if (res.data.data == 1) {
          this.$dialog.alert({
          confirmButtonText: "确 定",
          message: "连接成功",
          })
        } else {
          this.$dialog.alert({
          confirmButtonText: "确 定",
          message: "连接失败",
          })
        }
        console.log(res.data.data);
      })
        
    },// 连接设备方法结束
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
/* 设备名表头 */
.device-name-th {
  width: 30%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 系统版本表头 */
.android-version-th {
  width: 10%;
  border-right: solid 1px rgb(66, 76, 104);

}
/* 厂商表头 */
.company-th {
  width: 20%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 状态表头 */
.status-th {
  width: 20%;
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
/* 设备名单元格 */
.device-name {
  width: 30%;
}
/* 设备状态单元格 */
.status {
  width: 20%;
}
/* 设备厂商单元格 */
.company {
  width: 20%;
}
/* 设备版本单元格 */
.android-version {
  width: 10%;
}
/* 操作单元格 */
.oprate {
  width: 20%;
}
/* 连接按钮 */
.connect {
  width: 60px;
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100px;
  height: 30px;
  background-color: rgb(50, 56, 76);
  /* color: white; */
  /* border: solid 2px red; */
}
.van-button.van-button--default.van-button--large.van-dialog__confirm {
  border: none;
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