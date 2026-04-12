from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)

# 🔥 AI PREDICTION
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    lat = data.get("lat")

    if lat % 2 > 1:
        score = random.randint(20, 40)
    else:
        score = random.randint(60, 90)

    return jsonify({"safety_score": score})


# 🚨 SEND REAL SMS
@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.json
    numbers = data.get("numbers")  # list
    message = data.get("message")

    url = "https://www.fast2sms.com/dev/bulkV2"

    payload = {
        "route": "q",
        "message": message,
        "language": "english",
        "numbers": ",".join(numbers)
    }

    headers = {
        "authorization": "yE9QVlnoh7tPdKUSWLC6Tv0srix4MI5HjFOk2YguAawRpX1Gfqdre5vKiORlm8gBIzXoAyJtUFW2ETh4",  # 🔥 PUT YOUR KEY
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    return jsonify(response.json())


if __name__ == "__main__":
    app.run()