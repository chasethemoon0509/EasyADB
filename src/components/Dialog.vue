<template>
  <div class="dialog">
    <van-dialog v-model="isShow">
        {{ message }}
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style>

</style>