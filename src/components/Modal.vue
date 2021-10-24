<template>
    <!-- 模态框 -->
  <div class="modal-container">
    <span class="adbmsg">{{adbmsg}}</span>
    <button @click="modalConfirm">确定</button>
  </div>
</template>

<script>
export default {
  props: ['adbmsg'],
  methods: {
    // 点击确定后关闭模态框
    modalConfirm () {
      document.querySelector('.modal-container').style.visibility = 'hidden'
    }
  }
}
</script>

<style lang="less">
// 模态框
.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 350px;
  height: 150px;
  top: 200px;
  left: 250px;
  background-color: white;
  border-radius: 10px;
  visibility: hidden;
}
// 模态框中的确定按钮
.modal-container button {
  width: 80px;
  height: 30px;
  margin: 5px 10px;
  border: none;
  border-radius: 10px;
  background-color: rgb(13, 104, 241);
  color: white;
}
.modal-container button:hover {
    cursor: pointer;
}
// 模态框提示语位置
.adbmsg {
  margin-top: 30px;
}
</style>