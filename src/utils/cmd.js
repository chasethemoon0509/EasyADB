const  { exec } = require("child_process")

const scrcpyPath = "cd ./public/scrcpy && "

const getDevices =  exec(scrcpyPath + "adb devices", (error, stdout, stderr) => {
        console.log(`执行错误: ${error}`);
        console.log("stdout的结果：", stdout);
        console.log("stderr的结果：", stderr);
        return stdout
})

export default getDevices