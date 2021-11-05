<template>
  <div class="footer-container">
      <!-- 当前时间 -->
      <div class="now-time">
          {{ nowDate }}  {{ nowTime }}
      </div>
      <!-- 主题切换按钮 -->
      <div class="theme-button">
          <i class="iconfont icon-baitian" title="切换到白天主题"></i>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 当前日期
            nowDate: null,
            // 当前时分秒
            nowTime: null,
            // 定时器
            timer: "",
        }
    },
    methods: {
        // 实时时间方法
        getTime () {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDay()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            this.month = check(month)
            this.day = check(day)
            this.hour = check(hour)
            this.minute = check(minute)
            this.second = check(second)
            function check(i) {
                const num = (i<10)?('0'+i) : i
                return num
            }
            this.nowDate = year + '-' + this.month + '-' + this.day
            this.nowTime = this.hour + ':' + this.minute + ':' + this.second
        },
    },
    created () {
        // 通过定时器不断刷新，获取最新时间
        this.timer = setInterval(this.getTime, 1000)
    },
}
</script>

<style>
/* 底部最外层盒子 */
.footer-container {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    height: 30px;
    background-color: rgb(39, 44, 60);
}
/* 即时时间 */
.now-time {
    margin-left: 10px;
    color: white;
    font-size: 15px;
}
/* 主题切换按钮 */
.theme-button {
    margin-right: 10px;
    color: rgb(216, 216, 118);
}
.theme-button:hover {
    cursor: pointer;
}
</style>