from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import subprocess


app = Flask(__name__)
CORS(app, supports_credentials=True)


# 获取设备码和状态
def get_serial():
    result = os.popen("adb.exe devices").readlines()
    del(result[0])
    result.pop()
    # 处理列表中每个字符串元素中的转义符
    cleaned_list = []
    for i in result:
        # 定义一个临时列表，用于插入处理之后的设备码和状态
        temp_dic = {}
        # 设备码
        serial = i.split("\t")[0]
        temp_dic["serial"] = serial
        # 状态
        status = i.split("\t")[1].replace("\n", "")
        temp_dic["status"] = status
        # 处理完成，插入 cleaned_list 列表
        cleaned_list.append(temp_dic)
    return cleaned_list


# 获取安卓系统版本
def get_version(serial):
    result = os.popen("adb -s {} shell getprop ro.build.version.release".format(serial)).read().replace("\n", "")
    return result


# 获取设备厂商
def get_brand(serial):
    result = os.popen("adb -s {} -d shell getprop ro.product.brand".format(serial)).read().replace("\n", "")
    return result


# 接口: 返回设备信息
@app.route('/dev_info', methods=["GET"])
def dev_info():
    serial_list = get_serial()
    # 加入安卓系统版本信息
    for i in serial_list:
        # 调用获取安卓系统版本的方法, i["serial"] 表示字典中的 serial key 的值，对应的就是设备码
        # 得到获取安卓系统版本的方法返回的版本字符串后，将其作为字典的 version key 的值存入
        i["version"] = get_version(i["serial"])
    # 加入设备厂商信息
    for j in serial_list:
        j["brand"] = get_brand(j["serial"])
    # 加入 id 信息
    for k in range(0, len(serial_list)):
        serial_list[k]["id"] = k
    # 定义返回的数据
    data = {
        "data": serial_list
    }
    return jsonify(data)


# 接口: 连接设备
@app.route('/connect', methods=["GET"])
def connect():
    serial = request.values.get("serial")
    print(serial)
    p = subprocess.Popen("scrcpy --serial {}".format(serial), shell=True, stdout=subprocess.PIPE)

    for i in iter(p.stdout.readline, "b"):
        if not i:
            break
        connect_result = i.decode("gbk")
        print(connect_result)
        if "1 file pushed" in connect_result:
            data = {
                "data": 1
            }
        else:
            data = {
                "data": 0
            }
        return jsonify(data)


# 接口: 启动 adb 服务
@app.route('/adb_start', methods=["GET"])
def adb_server_start():
    result = os.popen("adb start-server").read()
    print(result)
    if result == "" or "daemon started successfully" in result:
        data = {
            "data": 1
        }
    else:
        data = {
            "data": 0
        }
    return jsonify(data)


# 接口: 停止 adb 服务
@app.route('/adb_stop', methods=["GET"])
def adb_server_stop():
    result = os.popen("adb kill-server").read()
    if result == "" or "cannot" in result:
        data = {
            "data": 1
        }
    else:
        data = {
            "data": 0
        }
    return jsonify(data)


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=9527)


