import pandas as pd
import os

# Get the directory where the script is currently located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Build the full paths
csv_path = os.path.join(script_dir, "surface-temperature-anomalies.csv") # Or move it to public/data/ if needed
json_path = os.path.join(script_dir, "surface-temperature-anomalies.json")

# Read and convert
df = pd.read_csv(csv_path)
df.to_json(json_path, orient="records", indent=4)