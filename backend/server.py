from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset
data = pd.read_csv("crime_dataset_india.csv")

@app.route("/")
def home():
    return "Server Running ✅"

@app.route("/zones")
def zones():
    result = []

    avg = data["crime_count"].mean()

    for _, row in data.iterrows():
        if row["crime_count"] > avg + 5:
            zone = "high"
        elif row["crime_count"] > avg:
            zone = "medium"
        else:
            zone = "safe"

        result.append({
            "lat": float(row["latitude"]),
            "lng": float(row["longitude"]),
            "type": zone
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)