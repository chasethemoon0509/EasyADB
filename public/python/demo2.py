import os


def get_package():
    cmd_result = os.popen("adb -s 306219798900525 shell pm list packages -3").read().replace("package:", "").split("\n")
    cmd_result.pop()
    package_names = []
    for i in cmd_result:
        package_names.append({"packageName": i})
    return cmd_result


def get_app_version():
    package_names = get_package()
    for i in package_names:
        print(i)

print(get_app_version())