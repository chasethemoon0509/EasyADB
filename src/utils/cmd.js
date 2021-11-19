const { execSync } = require("child_process")

class eS {
    constructor () {
        this.resultMsg = ""
    }

    // 最基本的命令执行方法
    base (cmdStr) {
        return execSync(`cd ./public/scrcpy && ${cmdStr}`).toString()
    }

    // 获取设备号和状态方法
    getSerialStatus () {
        // deviceAll 存放所有的设信息
        let deviceAll = []
        let cmdResult = this.base("adb devices").split("\n")
        cmdResult.shift()
        cmdResult.pop()
        cmdResult.pop()
        for (let i = 0; i < cmdResult.length; i++) {
            // item 存放 1 个设备信息，并以一个独立的设备信息对象，插入到 deviceAll 数组中
            let item = {}
            item["serial"] = cmdResult[i].replace("\r", "").split("\t")[0]
            item["status"] = cmdResult[i].replace("\r", "").split("\t")[1]
            deviceAll[i] = item
        }
        return deviceAll
    }

    // 返回设备列表中需要的设备信息
    getBaseInfo () {
        let baseInfo = this.getSerialStatus()
        for (let i = 0; i < baseInfo.length; i++) {
            baseInfo[i]["version"] = this.base(`adb -s ${baseInfo[i]["serial"]} shell getprop ro.build.version.release`).replace("\r\n", "")
            baseInfo[i]["brand"] = this.base(`adb -s ${baseInfo[i]["serial"]} shell getprop ro.product.brand`).replace("\r\n", "")
            baseInfo[i]["name"] = this.base(`adb -s ${baseInfo[i]["serial"]} shell getprop ro.product.name`).replace("\r\n", "")
        }
        return baseInfo
    }

    // 启动 adb 服务
    startADB () {
        let result = this.base("adb start-server")
        if (result === "" || result.includes("successfully")) {
           return this.resultMsg = "启动成功"
        } else {
           return result  
        }
    }

    // 关闭 adb 服务
    killADB () {
        let result = this.base("adb start-server")
        if (result === "" || result.includes("cannot")) {
           return this.resultMsg = "关闭成功"
        } else {
           return result     
        }
    }

}

exports.eS = eS
