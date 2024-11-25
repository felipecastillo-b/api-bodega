import pandas as pd
import sys
import json

def analyze_transactions(file_path):
    # Cargar datos desde un archivo CSV
    data = pd.read_csv(file_path)
    
    # Calcular ganancias por producto
    data['profit'] = (data['priceSell'] - data['price']) * data['quantity']
    profit_summary = data.groupby('productId')['profit'].sum().reset_index()

    # Productos con baja cantidad en inventario
    low_stock = data[data['quantity'] < data['minimumQuantity']]

    # Resumen por categoría
    category_summary = data.groupby('categoryId').agg(
        total_sales=('quantity', 'sum'),
        total_profit=('profit', 'sum')
    ).reset_index()

    # Formato de salida JSON
    result = {
        "profit_summary": profit_summary.to_dict(orient='records'),
        "low_stock": low_stock[['productId', 'quantity', 'minimumQuantity']].to_dict(orient='records'),
        "category_summary": category_summary.to_dict(orient='records')
    }

    return result

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = analyze_transactions(file_path)
    print(json.dumps(result))  # Devuelve los resultados como JSON
