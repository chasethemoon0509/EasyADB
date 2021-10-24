# -*- coding: UTF-8 -*-
from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/api/v1/getDevs')
def get_devices():
    """
    获取连接的设备
    :return:
    """


@app.route('/api/v1/baseInfo', methods=['GET'])
def base_info():
    """
    返回设备基础信息，包含设备号，设备状态，设备型号
    :return:
    """
    pass


@app.route('/api/v1/killADB', methods=['GET'])
def kill_ADB():
    os.popen('cd ../scrcpy-win64-v1.19/')
    result = os.popen('adb.exe start-server').read()
    print(type(result))
    return result


if __name__ == '__main__':
    app.run(port=9527)