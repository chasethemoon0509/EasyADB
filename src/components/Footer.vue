<template>
  <div class="footer-container">
      <!-- 时间显示 -->
      <div class="datetime">
          {{nowDate}} {{nowTime}}
      </div>
      <!-- 主题切换按钮 -->
      <div class="theme">
          <!-- 白天模式 -->
          <i class="iconfont icon-baitian" id="sun"></i>
          <!-- 夜间模式 -->
          <i class="iconfont icon-yejian" id="night"></i>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 年月日
            nowDate: null,
            // 时分秒
            nowTime: null,
            // 定时器
            timer: '',
            // 获取当前时间
            currentTime: new Date(),
        }
    },
    created () {
        // 通过定时器不断刷新，获取最新时间
        this.timer = setInterval(this.getTime, 1000)
    },
    methods: {
        // 实时时间
        getTime () {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDay()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            if (this.hour > 12) {
                this.hour -= 12
                this.str = ' PM'
            } else {
                this.str = ' AM'
            }
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
            this.nowTime = this.hour + ':' + this.minute + ':' + this.second + this.str
        },
    }
}
</script>

<style>
/* 底部盒子 */
.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    height: 30px;
    background-color: rgb(13, 104, 241);
}
/* 实时时间 */
.datetime {
    margin-left: 25px;
    height: 10px;
    font-size: 12px;
    color: white;
}
/* 主题按钮盒子 */
.theme {
    width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    border-radius: 15px;
}
/* 主题按钮 */
.theme i {
    font-size: 20px; 
}
.theme i:hover {
    cursor: pointer;
}
#sun {
    color: yellow;
}
#night {
    color: white;
}
</style>