<template>
  <div class="footer-container">
      <!-- 时间显示 -->
      <div class="datetime">
          {{nowDate}} {{nowTime}}
      </div>
      <!-- 主题切换按钮 -->
      <div class="theme">
          <!-- 白天模式 -->
          <i class="iconfont icon-baitian" id="sun" @click="setThemeSun"></i>
          <!-- 夜间模式 -->
          <i class="iconfont icon-yejian" id="night" @click="setThemeNight"></i>
      </div>
  </div>
</template>

<script>
// 导入 electron-store，用于切换主题后保存到配置文件中，实现持久化
const Store = require('electron-store')
// electron-store 的一些配置
let option = {
    // 配置文件名
    name: "theme.config",
    // 配置文件格式，加上这个格式，配置文件的全名就是 theme.config.json
    // 此文件在我本机上的路径是 C:\Users\用户名\AppData\Roaming\electron-store-nodejs\Config\theme.config.json
    fileExtension: "json",
    // 在发生 SyntaxError 错误时清除配置文件
    clearInvalidConfig: true
}
// 创建一个 Store 对象 
const themeStore = new Store(option)

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
        setThemeSun () {
            // 获取根组件最外层 id=app 的盒子，将 sun 样式赋值给这个盒子的 class 属性
            document.getElementById("app").className = "sun"
            // 然后将当前主题样式存到 electron-store 中，key 为 themeNow，表示当前主题，value 为 sun
            themeStore.set('themeNow', 'sun')
        },
        setThemeNight () {
            // 获取根组件最外层 id=app 的盒子，将 night 样式赋值给这个盒子的 class 属性
            document.getElementById("app").className = "night"
            // 然后将当前主题样式存到 electron-store 中，key 为 themeNow，表示当前主题，value 为 night
            themeStore.set('themeNow', 'night')
        },
    },
    mounted () {
        // mounted 函数在模板渲染成html后调用，渲染成 html 后再调用此函数对 DOM 节点进行操作
        // 通过判断 themeStore 中的 themeNow 是否为空，不为空就代表有储存样式字符串
        // 那么就直接取出来这个储存的字符串，为 app 根节点赋值，设置样式
        // themeStore 中储存的数据是以 json 格式，存放在 c 盘的，这里实际上是读取 c 盘里储存的数据
        // 而这些储存的数据是用户在点击切换主题按钮时，调用了 themeStore.set 方法，将样式字符串写入到了这个 json 文件中
        // 再下一次重启程序时，会读取样式字符串，这个字符串是用户退出前设置的，所以就实现了用户设置的记录
        if (themeStore.get('themeNow') != null) {
            document.getElementById("app").className = themeStore.get('themeNow')
        } else {
            // 如果从 json 文件中读取不到内容，那么就设置成默认的样式 sun，即白天模式
            document.getElementById("app").className = 'sun'
        }
    },
}
</script>

<style lang="less">
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
    // 动态样式, 变量 --sun-now-color 表示主题按钮 sun 的颜色，当前为 sun 主题时此颜色为黄色，不是当前主题显示白色
    color: var(--sun-now-color);
}
#night {
    // 动态样式, 变量 --night-now-color 表示主题按钮 night 的颜色，当前为 night 主题时此颜色为黄色，不是当前主题显示白色
    color: var(--night-now-color);
}
</style>