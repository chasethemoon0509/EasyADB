<template>
  <div class="dialog">
    <van-dialog v-model="isShow">
        {{ message }}
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ["message", "isShow"],
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style>

</style>