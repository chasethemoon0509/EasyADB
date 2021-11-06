from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)



@app.route('/dev_info', methods=["GET"])
def dev_info():
    print(os.getcwd())


print(os.getcwd())

