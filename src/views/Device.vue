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
        <div class="listItem" v-for="(item, index) in serialArr" :key="index">
          <p class="device-name">{{ item[0] }}</p>
          <p class="status">{{ item[1] }}</p>
          <p class="android-version">{{ item[2] }}</p>
          <p class="company">{{ item[3] }}</p>
          <p class="oprate"><button>连接</button></p>
        </div>
      </div>
      <!-- 暂无设备提示 -->
      <p class="no-device-title">暂 无 设 备</p>
    </div>
  </div>
</template>

<script>
// const cmd = require("node-cmd")
const { exec } = require('child_process')

export default {
  data () {
    return {
      // 设备数量
      deviceCount: 0,
      // 设备号
      serialArr: [],
      // 当前连接设备
      currentConnect: ""
    }
  },
  methods: {
    // 获取信息方法
    getInfo () {
      // 获取设备名和状态
      exec(`cd public/scrcpy/ && adb devices`, (err, stdout) => {
        if (err) {
          console.log("执行失败：", err)
        }
        let adbResult = stdout.split("\n")
        adbResult.shift()
        adbResult.pop()
        adbResult.pop()
        // 循环处理每个字符串中的转义符
        for (let index = 0; index < adbResult.length; index++) {
          let code = adbResult[index].split("\t")[0]
          let status = adbResult[index].split("\t")[1].replace("\r", "")
          let result1 = []
          result1.push(code, status)
          // 将处理好的数组追加到 serialArr 数组中
          this.serialArr.push(result1)
          // console.log("第一步处理完成后的数组，仅包含设备号和状态:", this.serialArr);
          // 获取系统版本
          exec(`cd public/scrcpy/ && adb -s ${this.serialArr[index][0]} shell getprop ro.build.version.release`, (err, stdout) => {
            if (err) {
              console.log("执行失败：", err)
            }
            // 加入版本信息到数组
            this.serialArr[index].push(stdout.replace("\r\n", ""))
            // console.log("加上版本信息后的数组：", this.serialArr);
            // 获取厂商
            exec(`cd public/scrcpy/ && adb -s ${this.serialArr[index][0]} -d shell getprop ro.product.brand`, (err, stdout) => {
              if (err) {
                console.log("执行失败：", err)
              }
              // 加入厂商信息到数组
              this.serialArr[index].push(stdout.replace("\r\n", ""))
              // console.log(this.serialArr);
            }) // 获取厂商结束
          }) // 获取系统版本结束
        } // 循环结束
      })    
    },
    // 刷新设备列表
    refreshList () {
      console.log("调用方法结果", this.getInfo());
      // 设备数量
      let devSum = this.serialArr.length
      // 将 devSum 变量赋值给 data 属性中的 deviceCount 变量
      this.deviceCount = devSum
      // 如果设备数量不等于0,即代表有设备
      if (devSum != 0) {
        // 隐藏"暂无设备提示"
        let noDeviceTitle = document.querySelector(".no-device-title")
        let listBody = document.querySelector(".list-body")
        noDeviceTitle.style.display = "none"
        listBody.style.display = "flex"
      }
      this.serialArr = []
    }, // 刷新设备列表方法结束
    
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
  background-color: rgb(204, 204, 204);
  border: none;
  cursor: pointer;
}
.refresh-list:hover {
  background-color: rgb(33, 202, 120);
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
  width: 660px;
  height: 100%;
  display: none;
  flex-direction: column;
  /* border: solid 2px rgb(33, 202, 120); */
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
  height: 100%;
  /* border: solid 2px red;  */
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
  margin: 50px auto;
  font-size: 30px;
  color: rgb(204, 204, 204);
}

</style>