<template>
  <div class="device-container">
    <!-- 设备页面的头部 -->
    <div class="device-header">
      <!-- 当前连接的设备 -->
      <p class="now-device">当前连接的设备：</p>
      <button>刷新设备列表</button>
    </div>
    <!-- 设备列表 -->
    <div class="device-list">
      <div class="list-header">
        <div class="device-name">设备</div>
        <div class="android-version">系统版本</div>
        <div class="company">厂商</div>
        <div class="status">状态</div>
        <div class="oprate">操作</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.device-container {
  width: 100%;
  height: 100%;
  background-color: rgb(39, 44, 60);
}
.device-header {
  width: 90%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: rgb(204, 204, 204);
}
.device-list {
  width: 90%;
  height: 300px;
  margin: 30px auto;
}
.list-header {
  width: 100%;
  height: 30px;
  display: flex;
  border-top: solid 2px red;
  border-bottom: solid 2px red;
}
.device-name {
  width: 20%;
  border-right: solid 1px white;
}
.android-version {
  width: 20%;
}
.company {
  width: 20%;
}
.status {
  width: 20%;
}
.oprate {
  width: 20%;
  border-right: solid 1px white;
}
</style>