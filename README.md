## SHG Visualizer

This project is the front end of GaN-SHG to be able to visualize different aspects of the simulation. 

# Here's the current features:
- Linear regression to predict simulation results based on previous runs
- Interactive visualizer for 3 shapes

All the data for this project and ML code that was used to find optimal parameter ranges can be found in this repo: https://github.com/VedanshMannem/GaN-SHG.

# Coming soon:
- Multiple Quantum Well functionality
- More accurate modeling (ML models other than Linear Regression)

Click here to try the project: https://gan-visualizer.vercel.app/

# Setup:
No account needed! Just go to the website and you can start messing around.

If you want to edit the repo, just clone it and use the .CSV data that's already available to fit better Machine Learning algorithms. The Linear Regression has lower accuracy, but it's a working prototype.

# The Physics
Second Harmonic Generation (SHG) is a nonlinear optical process, and this simulation shows how it can be changed based on the structure and sizing of a resonance structure. Mess around with the parameters and watch as the SHG value increases/decreases. The backend is a bit more complex and all the data for the backend can be seen here: https://github.com/VedanshMannem/GaN-SHG.
