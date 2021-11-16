# easy-adb 项目源码
- 2021-10-20 环境稳定，正在实现换肤功能
- 2021-10-21 环境稳定，换肤功能以实现，接下来开始 Aside 侧边栏的开发
- 2021-10-24 环境稳定，Aside 侧边栏 UI 布局初步实现，正在进行命令执行与结果回调的开发
- 2021-10-28 环境稳定，写了一部分设备连接页的 UI
- 2021-11-06 推到了之前写的 UI 布局，重新仿照其他软件写了侧边栏、顶部、底部公共组件的 UI 布局
- 2021-11-06 完成了设备页面的列表结构,接下来开始数据渲染
- 2021-11-07 设备页面的数据获取和渲染基本完成，接下来是连接功能完善、模态框完善
- 2021-11-08 使用接口通信完成了设备连接功能,设备连接成功或失败都会有提示框,连接成功的情况需要实时获取终端的输出结果,获取到的结果进行字符串判断是否连接成功
- 2021-11-11 设备连接页告一段落，没能力开发更多的功能了，下面开始 apk 操作页的功能开发，始终还是面向过程编程😑，还得学习 js
- 2021-11-14 nothing
- 2021-11-16 nothing

## 页面截图预览
#### 设备连接页
![微信截图_20211111232920.png](https://i.loli.net/2021/11/11/Z6xsthpGzKBoFHl.png)

## 安装依赖
```
npm install
```

### 编译、启动项目
```
npm run electron:serve
```

