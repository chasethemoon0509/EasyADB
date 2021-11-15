import request from "./request"



// 获取设备信息接口
const getDevInfo = function () {
    return request.get("/dev_info")
}

// 连接设备接口
const connect = function (serialCode) {
    return request.get("/connect", {
        params: {"serial": serialCode}
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

// 获取app信息、包名、版本
const getAppInfo = function () {
    return request.get("/get_app_info")
}

const allApi = {
    getDevInfo,
    connect,
    adbStart,
    adbStop,
    getAppInfo
}

export default allApi