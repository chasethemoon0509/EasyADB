import subprocess
p = subprocess.Popen("scrcpy --serial 306219798900525", shell=True, stdout=subprocess.PIPE)
for i in iter(p.stdout.readline, "b"):
    if not i:
        break
    print(type(i.decode("gbk")), end="")