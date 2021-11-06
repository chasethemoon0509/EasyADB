<template>
  <div class="device-container">
    <!-- 设备页面的头部 -->
    <div class="device-header">
      <!-- 当前连接的设备 -->
      <p class="now-device">当前连接的设备：</p>
      <button class="refresh-list">刷新设备列表</button>
    </div>
    <!-- 设备列表最外层盒子 -->
    <div class="device-list">
      <!-- 设备列表头 -->
      <div class="list-header">
        <div class="device-name">设备</div>
        <div class="android-version">系统</div>
        <div class="company">厂商</div>
        <div class="status">状态</div>
        <div class="oprate">操作</div>
      </div>
      <!-- 设备单元格 -->
      <div class="list-body">
        <p class="no-device-title">暂 无 设 备</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
  width: 90%;
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
  width: 90%;
  height: 300px;
  margin: 30px auto;
}
/* 列表头部 */
.list-header {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 2px rgb(66, 76, 104);
  border-bottom: solid 2px rgb(66, 76, 104);
  color: rgb(204, 204, 204);
  text-align: center;
}
/* 设备名单元格 */
.device-name {
  width: 30%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 系统版本单元格 */
.android-version {
  width: 10%;
  border-right: solid 1px rgb(66, 76, 104);

}
/* 厂商单元格 */
.company {
  width: 20%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 状态单元格 */
.status {
  width: 20%;
  border-right: solid 1px rgb(66, 76, 104);
}
/* 操作单元格 */
.oprate {
  width: 20%;
}
/* 列表主体 */
.list-body {
  width: 100%;
  height: 400px;
  /* border: solid 2px red; */
  overflow-y: scroll;
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
  margin-top: 50px;
  font-size: 30px;
  text-align: center;
  color: rgb(204, 204, 204);
}
</style>