import os


def get_package():
    cmd_result = os.popen("adb -s 306219798900525 shell pm list packages -3").read().replace("package:", "").split("\n")
    cmd_result.pop()
    package_names = []
    for i in cmd_result:
        package_names.append({"packageName": i})
    return package_names


def get_app_version():
    package_names_version = get_package()
    for i in range(0, len(package_names_version)):
        result = os.popen('adb shell pm dump {} | findstr "versionName"'.format(package_names_version[i]["packageName"])).read().replace("versionName=", "").replace("\n", "").replace(" ", "")
        package_names_version[i]["appVersion"] = result
    return package_names_version

print(get_app_version())