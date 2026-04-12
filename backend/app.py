from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # 🔥 IMPORTANT FIX

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    lat = data.get("lat")

    if lat % 2 > 1:
        score = random.randint(20, 40)
    else:
        score = random.randint(60, 90)

    return jsonify({
        "safety_score": score
    })

if __name__ == "__main__":
    app.run()