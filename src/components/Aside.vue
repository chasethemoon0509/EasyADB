<template>
  <div class="aside-container">
    <!-- 设备基础信息 -->
      <span class="aside-title">当前连接设备</span>
      <div class="base-info">
        <span>设备号</span>
        <span>系统版本</span>
        <span>状态</span>
        <span>型号</span>
      </div>
      <!-- scrcpy 拓展按键 -->
      <span class="aside-title">Scrcpy 按键</span>
      <div class="scrcpy-op">
        <button>HOME</button>
        <button>返回</button>
        <button>切换应用</button>
        <button>全屏</button>
        <button>音量 + </button>
        <button>音量 - </button>
        <button>电源</button>
        <button>唤醒屏幕</button>
      </div>
      <!-- adb 服务相关 -->
      <span class="aside-title">ADB 服务</span>
      <div class="adb-server">
        <button @click="killADB">关闭 ADB 服务</button>
        <button @click="startADB">重启 ADB 服务</button>
      </div>
      <!-- 模态框 -->
      <Modal :adbmsg="adbresult"></Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
var cmd = require('node-cmd')

export default {
  data () {
    return {
      adbresult: 'dd',
      msg: ''
    }
  },
  // 组件传值
  props: ['adbmsg'],
  components: {
    Modal
  },
  methods: {
    // 关闭 adb 服务
    killADB () {
      let v = this
      cmd.run(`cd public/scrcpy-win64-v1.19/ & adb.exe kill-server`, function (err, data, stderr) {
        if (stderr.includes("cannot")) {
          v.adbresult = "已关闭 ADB 服务"
          document.querySelector('.modal-container').style.visibility = 'visible'
          console.log(stderr);
        } else if (stderr == "") {
          v.adbresult = "已关闭, 请勿重复关闭"
          document.querySelector('.modal-container').style.visibility = 'visible'
        } else {
          v.adbresult = "关闭失败, 请重试或重启程序"
          document.querySelector('.modal-container').style.visibility = 'visible'
        }
      })
    },
    // 启动 adb 服务
    startADB () {
      // 在 cmd.run 函数里面不能使用 vue 的实例对象，所以使用一个变量先接收 vue 的实例，拿这个变量在 cmd.run 函数里代替 this 使用
      let v = this
      // 执行启动 adb 服务的命令
      cmd.run(`cd public/scrcpy-win64-v1.19/ & adb.exe start-server `, function (err, data, stderr) {
        // 如果回调数据中包含字符串 successfully ，则做启动成功处理
        if (stderr.includes('successfully')) {
          // 提前回调数据中的端口号
          const port = stderr.match(/\d+/g)
          // 将提示语传给 vue 实例的 adbresult 变量
          v.adbresult = "已启动, 端口号: "+port
          // 使模态框展示
          document.querySelector('.modal-container').style.visibility = 'visible'
        } else {
          v.adbresult = '已启动, 请勿重复启动'
          document.querySelector('.modal-container').style.visibility = 'visible'
        }
      })
    }
  }
}
</script>

<style lang="less">
// 侧边栏区域
.aside-container {
    margin-top: 5px;
    height: 490px;
    width: 200px;
    background-color: rgb(249, 249, 249);
}
// 设备基础信息
.base-info {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  height: 120px;
  // border: solid 2px red;
}
// 基础信息标题
.aside-title {
  display: block;
  color: rgb(13, 104, 241);
  border-left: solid 5px rgb(13, 104, 241);
  padding: 0 10px;
}
// scrcpy 按键区域
.scrcpy-op  {
  height: 200px;
}
// scrcpy 按键
.scrcpy-op button {
  width: 80px;
  height: 30px;
  margin: 5px 10px;
  border: none;
  border-radius: 10px;
  background-color: rgb(13, 104, 241);
  color: white;
}
// scrcpy 按键 hover 后的样式
.scrcpy-op button:hover {
  cursor: pointer;
}
// adb 服务相关
.adb-server {
  display: flex;
  flex-direction: column;
}
// adb 服务按钮
.adb-server button {
  width: 120px;
  height: 30px;
  margin: 5px 40px;
  border: none;
  border-radius: 10px;
  background-color: rgb(13, 104, 241);
  color: white;
}
// adb 服务按钮 hover 后的样式
.adb-server button:hover {
  cursor: pointer;
}
</style>