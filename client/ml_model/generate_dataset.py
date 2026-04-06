import pandas as pd
import random

data = []

for i in range(1000):
    
    latitude = random.uniform(8.0, 37.0)      # India latitude range
    longitude = random.uniform(68.0, 97.0)    # India longitude range
    crime_count = random.randint(10,150)

    if crime_count > 80:
        risk = 1
    else:
        risk = 0

    data.append([latitude, longitude, crime_count, risk])

df = pd.DataFrame(data, columns=[
    "latitude",
    "longitude",
    "crime_count",
    "risk"
])

df.to_csv("crime_dataset_india.csv", index=False)

print("1000 rows dataset created successfully")