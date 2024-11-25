import pandas as pd
import sys
import json

def analyze_stock(file_path):
    # Cargar datos desde un archivo CSV
    data = pd.read_csv(file_path)

    # Productos con baja cantidad en inventario
    low_stock = data[data['quantity'] < data['minimumQuantity']]

    # Formato de salida JSON
    result = {
        "low_stock": low_stock[['inventoryName', 'productName', 'quantity', 'minimumQuantity']].to_dict(orient='records'),
    }

    return result

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = analyze_stock(file_path)
    print(json.dumps(result))  # Devuelve los resultados como JSON
