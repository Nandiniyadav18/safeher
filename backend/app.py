from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    lat = data.get("lat")
    lon = data.get("lon")

    # 🔥 Simple AI logic (can replace with ML model later)
    if lat % 2 > 1:
        score = random.randint(20, 40)  # unsafe
    else:
        score = random.randint(60, 90)  # safe

    return jsonify({
        "safety_score": score
    })

if __name__ == "__main__":
    app.run(debug=True)