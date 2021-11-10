import request from "./request"


// 获取设备信息接口
const getDevInfo = function () {
    return request.get("/dev_info")
}

// 连接设备接口
const connect = function (serial) {
    return request.get("/connect", {
        params: serial
    })
}

// 启动 adb 接口
const adbStart = function () {
    return request.get("/adb_start")
}

// 停止 adb 接口
const adbStop = function () {
    return request.get("/adb_stop")
}

const allApi = {
    getDevInfo,
    connect,
    adbStart,
    adbStop
}

export default allApi