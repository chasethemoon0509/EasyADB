import requests
import re

header = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
}
res = requests.get("http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html", headers=header).text


str = re.compile(r'<td class="xl7328320">\d+</td>')
result = str.findall(res)

print(res)