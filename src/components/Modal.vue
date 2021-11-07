<template>
  <div class="modal-container">
      <p class="tips"> {{tips}} </p>
      <button @click="confirmTips" class="confirmTips">确 定</button>
  </div>
</template>

<script>
export default {
    props: ["tips"],
    methods: {
        // 确定
        confirmTips () {
            let modal = document.querySelector(".modal-container")
            modal.style.display = "none"
            console.log(this.tips);
        }
    }
}
</script>

<style>
.modal-container {
    position: absolute;
    top: 250px;
    left: 400px;
    display: none;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 350px;
    height: 150px;
    /* border: solid 2px red; */
    background-color: rgb(50, 56, 76);
}
.tips {
    color: white;
}
.confirmTips {
    width: 100px;
    height: 30px;
    background-color: rgb(33, 202, 120);
    border: none;
    color: white;
    cursor: pointer;
}
</style>