# importing modules and packages
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

df = pd.read_csv('./LR/triangle.csv')

print("Dataset Info:")
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print("\nFirst few rows:")
print(df.head())

X = df[['x1', 'x2', 'x3', 'y1', 'y2', 'y3']]
feature_names = ['x1', 'x2', 'x3', 'y1', 'y2', 'y3']

y = df.iloc[:, -2]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

train_mse = mean_squared_error(y_train, y_train_pred)
test_mse = mean_squared_error(y_test, y_test_pred)
train_mae = mean_absolute_error(y_train, y_train_pred)
test_mae = mean_absolute_error(y_test, y_test_pred)
train_r2 = r2_score(y_train, y_train_pred)
test_r2 = r2_score(y_test, y_test_pred)

print(f"\nModel Coefficients:")
for feature, coef in zip(feature_names, model.coef_):
    print(f"{feature}: {coef:.6e}")
print(f"Intercept: {model.intercept_:.6e}")

print(f"\nModel Performance:")
print(f"Training R²: {train_r2:.6f}")
print(f"Testing R²: {test_r2:.6f}")
print(f"Training MSE: {train_mse:.6e}")
print(f"Testing MSE: {test_mse:.6e}")
print(f"Training MAE: {train_mae:.6e}")
print(f"Testing MAE: {test_mae:.6e}")

print(f"\nRegression Equation:")
equation = f"power_output = {model.intercept_:.6e}"
for feature, coef in zip(feature_names, model.coef_):
    sign = "+" if coef >= 0 else ""
    equation += f" {sign} {coef:.6e} * {feature}"
print(equation)