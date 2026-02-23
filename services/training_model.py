# File used to train model 
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score
import requests
from requests.auth import HTTPBasicAuth
import psycopg2

# Use requests to get team 661 obj variables for the x and y arrays respectively

api_endpoint = 'http://localhost:8080/stats/team-stats-all/661'

teamTrueShootingPercentage = []
teamFreeThrowRate = []
teamTotalPoints = []

try:
    response = requests.get(api_endpoint, auth=HTTPBasicAuth('admin', 'test'))
    response.raise_for_status()
    data = response.json()
    for i in data:
        teamTrueShootingPercentage.append(i['trueShootingPercentage'])
        teamFreeThrowRate.append(i['freeThrowRate'])
        teamTotalPoints.append(i['totalTeamPts'])
    # print(teamTotalPoints)
    # print(teamTrueShootingPercentage)
    # print(teamFreeThrowRate)
except Exception as error:
    print(error)

teamTotalPoints_arr = np.array(teamTotalPoints)
teamTrueShootingPercentage_arr = np.array(teamTrueShootingPercentage)
teamFreeThrowRate_arr = np.array(teamFreeThrowRate)

x = np.column_stack((teamTrueShootingPercentage_arr, teamFreeThrowRate_arr)) # from team 661 [teamTrueShootingPercentage, teamFreeThrowRate]
y = teamTotalPoints_arr # from team 661 [teamTotalPoints]

model = LinearRegression().fit(x, y)
scores = cross_val_score(model, x, y, cv=3)

print(f"R²: {model.score(x, y)}")
print(f"Intercept: {model.intercept_}")
print(f"Coefficients (TS%, ShotDist): {model.coef_}")

# Predict with multiple features
y_pred = model.predict(x)
print(f"\nPredicted vs Actual:")
for i, (pred, actual) in enumerate(zip(y_pred, y)):
    diff = actual - pred
    print(f"Game {i+1}: Predicted={pred:.1f}, Actual={actual}, Diff={diff:+.1f}")
print("PREDICTED", y_pred, "ACTUAL", y)

team_name = "Ryukyu Golden Kings"
conn = psycopg2.connect("dbname=basketball user=postgres password=password")
cursor = conn.cursor()
query = """insert into public.trends
(trend_id, team_id, team_name, actual_score, predicted_score) values (%s, %s, %s, %s, %s)
on conflict(trend_id) do update set
    team_id = excluded.team_id,
    team_name = excluded.team_name,
    actual_score = excluded.actual_score,
    predicted_score = excluded.predicted_score;"""

cursor.execute(
    query,
    (1, 661, team_name, y.tolist(), y_pred.tolist())
)
conn.commit()
cursor.close()
conn.close()