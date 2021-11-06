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
        <div class="company-th">厂商</div>
        <div class="android-version-th">系统</div>
        <div class="oprate-th">操作</div>
      </div>
      <!-- 列表主体 -->
      <div class="list-body">
        <div class="listItem" v-for="(item, index) in serialArr" :key="index">
          <p class="device-name">{{ item[0] }}</p>
          <p class="status">{{ item[1] }}</p>
          <p class="company">{{ item[3] }}</p>
          <p class="android-version">{{ item[2] }}</p>
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
    // 刷新设备列表
    refreshList () {
      // 调用获取设备信息方法
      this.getSerial()
      this.getVersion()
      this.getFullInfo()
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
    },
    // 获取设备信息方法
    getSerial () {
      // 执行 adb.exe devices 命令, 以获取设备列表
      exec("cd public/scrcpy-win64-v1.19/ && adb.exe devices", (error, stdout) => {
        if (error) {
          console.error(`执行出错: ${error}`);
          return;
        }
        let result = stdout.split("\n")
        // 然后删除数组第一个无用的字符串
        result.shift() 
        // 再删除数组最后一个元素
        result.pop()
        // 再次删除数组一个元素,加上上一次,需要删除两次数组最后的元素,之后得到的数组才是只包含设备信息的数组
        result.pop()
        // 存放所有的设备号和状态,设备号和状态会以一个数组先存在,然后再放到 serialAll 数组中, 结构是嵌套数组
        // var serialAll = []
        // 循环处理设备信息, result 是初步清理后, 只包含设备信息的数组, 但是数组中每个设备信息字符串还需要单独处理
        for (let i = 0; i < result.length; i++) {
          // serialCode 保存某个设备的设备号
          let serialCode = result[i].split("\t")[0]
          // serialStatus 保存某个设备的状态
          let serialStatus = result[i].split("\t")[1].replace("\r", "")
          // serialInfo 数组就是前面说到的嵌套数组中的内层数组
          let serialInfo = [serialCode, serialStatus]
          // 然后将内层数组 serialInfo 存到 serialAll 最外层数组中
          this.serialArr.push(serialInfo)
        }
        console.log("第一步：获取设备号和状态",this.serialArr);
      })
    },
    // 获取系统版本
    getVersion () {
      for (let j = 0; j < this.serialArr.length; j++) {
        exec(`cd public/scrcpy-win64-v1.19/ && adb.exe -s ${this.serialArr[j][0]} shell getprop ro.build.version.release`, (error, stdout) => {
          if (error) {
            console.error(`执行出错: ${error}`);
            return;
          }
          this.serialArr[j].push(stdout.replace("\r", "").replace("\n", ""))
          console.log("第二步：获取版本", this.serialArr);
        })
      }
    },
    // 获取厂商
    getFullInfo () {
      // let fullSerial = this.getVersion()
      for (let k = 0; k < this.serialArr.length; k++) {
        exec(`cd public/scrcpy-win64-v1.19/ && adb.exe -s ${this.serialArr[k][0]} -d shell getprop ro.product.brand`, (error, stdout) => {
          if (error) {
            console.error(`执行出错: ${error}`);
            return;
          }
          this.serialArr.push(stdout.replace("\r", "").replace("\n", ""))
          console.log("第三步：获取厂商", this.serialArr);
        })     
      }
    }

    
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