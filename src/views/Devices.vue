<template>
  <div class="devices">
    <!-- // 设备列表 -->
    <div class="devices-list">
      <!-- 标题 -->
      <span class="devices-title">设备列表</span>
      <!-- 列表区域 -->
      <table class="list-details">
        <!-- 列表头 -->
        <tr class="list-head">
          <th class="serial-number">设备号</th>
          <th class="company">厂商</th>
          <th class="model">型号</th>
          <th class="memory">内存</th>
          <th class="ram">运存</th>
          <th class="status">状态</th>
          <th class="status">操作</th>
        </tr>
        <!-- 列表主体 -->
        <tr class="list-info">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  }
}
</script>

<style lang="less">
.devices {
  margin: 20px 0 0 20px;
}
// 标题
.devices-title {
  width: 200px;
  display: block;
  color: rgb(13, 104, 241);
  border-radius: 10px;
  background-color: white;
  font-family: Klavika Bold;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
}
.list-details {
  margin-top: 10px;
  width: 550px;
}
// 列表头
.list-head {
  border-bottom: solid 2px red;
  border-collapse: separate;
}
td {
  border: solid 2px gray;
}
</style>