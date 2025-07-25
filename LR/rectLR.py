# importing modules and packages
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn import preprocessing

df = pd.read_csv('./LR/rect.csv', header=None)

X = df.iloc[:, 4:7]
feature_names = ['Column_5', 'Column_6', 'Column_7']
X.columns = feature_names

y = df.iloc[:, -2]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

train_mse = mean_squared_error(y_train, y_train_pred)
test_mse = mean_squared_error(y_test, y_test_pred)
train_mae = mean_absolute_error(y_train, y_train_pred)
test_mae = mean_absolute_error(y_test, y_test_pred)
train_r2 = r2_score(y_train, y_train_pred)
test_r2 = r2_score(y_test, y_test_pred)

print(f"\nModel Performance:")
print(f"Training R²: {train_r2:.6f}")
print(f"Testing R²: {test_r2:.6f}")
print(f"Training MSE: {train_mse:.6e}")
print(f"Testing MSE: {test_mse:.6e}")
print(f"Training MAE: {train_mae:.6e}")
print(f"Testing MAE: {test_mae:.6e}")

feature_importance = pd.DataFrame({
    'Feature': feature_names,
    'Coefficient': model.coef_,
    'Abs_Coefficient': np.abs(model.coef_)
}).sort_values('Abs_Coefficient', ascending=False)

print(feature_importance)

# Create visualizations
fig, axes = plt.subplots(2, 2, figsize=(15, 12))

# 1. Actual vs Predicted (Training)
axes[0, 0].scatter(y_train, y_train_pred, alpha=0.6)
axes[0, 0].plot([y_train.min(), y_train.max()], [y_train.min(), y_train.max()], 'r--', lw=2)
axes[0, 0].set_xlabel('Actual Values')
axes[0, 0].set_ylabel('Predicted Values')
axes[0, 0].set_title(f'Training: Actual vs Predicted (R² = {train_r2:.4f})')
axes[0, 0].grid(True, alpha=0.3)

# 2. Actual vs Predicted (Testing)
axes[0, 1].scatter(y_test, y_test_pred, alpha=0.6, color='orange')
axes[0, 1].plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
axes[0, 1].set_xlabel('Actual Values')
axes[0, 1].set_ylabel('Predicted Values')
axes[0, 1].set_title(f'Testing: Actual vs Predicted (R² = {test_r2:.4f})')
axes[0, 1].grid(True, alpha=0.3)

# 3. Residuals plot (Training)
train_residuals = y_train - y_train_pred
axes[1, 0].scatter(y_train_pred, train_residuals, alpha=0.6)
axes[1, 0].axhline(y=0, color='r', linestyle='--')
axes[1, 0].set_xlabel('Predicted Values')
axes[1, 0].set_ylabel('Residuals')
axes[1, 0].set_title('Training: Residuals Plot')
axes[1, 0].grid(True, alpha=0.3)

# 4. Residuals plot (Testing)
test_residuals = y_test - y_test_pred
axes[1, 1].scatter(y_test_pred, test_residuals, alpha=0.6, color='orange')
axes[1, 1].axhline(y=0, color='r', linestyle='--')
axes[1, 1].set_xlabel('Predicted Values')
axes[1, 1].set_ylabel('Residuals')
axes[1, 1].set_title('Testing: Residuals Plot')
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Feature correlation heatmap
plt.figure(figsize=(10, 8))
correlation_data = pd.concat([X, y.rename('Target')], axis=1)
correlation_matrix = correlation_data.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, 
            square=True, linewidths=0.5)
plt.title('Feature Correlation Matrix')
plt.show()

print(f"\nSample Predictions (first 10 test samples):")
print("-" * 80)
print(f"{'Index':<5} {'Col5':<12} {'Col6':<12} {'Col7':<12} {'Actual':<12} {'Predicted':<12} {'Error':<12}")
print("-" * 80)
for i in range(min(10, len(X_test))):
    idx = X_test.index[i]
    actual = y_test.iloc[i]
    predicted = y_test_pred[i]
    error = abs(actual - predicted)
    print(f"{idx:<5} {X_test.iloc[i, 0]:<12.6e} {X_test.iloc[i, 1]:<12.6e} {X_test.iloc[i, 2]:<12.6e} "
          f"{actual:<12.6e} {predicted:<12.6e} {error:<12.6e}")

print(f"\nRegression Equation:")
equation = f"y = {model.intercept_:.6e}"
for i, (feature, coef) in enumerate(zip(feature_names, model.coef_)):
    sign = "+" if coef >= 0 else ""
    equation += f" {sign} {coef:.6e} * {feature}"
print(equation)
