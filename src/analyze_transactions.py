import pandas as pd
import sys
import json

def analyze_transactions(file_path):
    # Cargar datos desde un archivo CSV
    data = pd.read_csv(file_path)
    
    # Calcular el total de compras (donde reason es "Compra de producto")
    total_purchase = data.loc[data['reason'] == 'Compra de producto', 'price'].sum()

    # Calcular el total de ventas (donde reason es "Venta de producto")
    total_sales = data.loc[data['reason'] == 'Venta de producto', 'priceSell'].sum()

    # Calcular el balance
    balance = total_sales - total_purchase

    # Calcular ganancias por producto
    data['profit'] = (data['priceSell'] - data['price']) * data['quantity']
    
    # Calcular resumen de ganancias por producto
    profit_summary = data.groupby('productId').agg(
        total_profit=('profit', 'sum')
    ).reset_index()
    
    # Unir el resumen de ganancias con los nombres de los productos
    profit_summary = profit_summary.merge(data[['productId', 'productName']].drop_duplicates(), on='productId', how='left')

    # Resumen por categoría
    category_summary = data.groupby('categoryId').agg(
        total_sales=('quantity', 'sum'),
        total_profit=('profit', 'sum')
    ).reset_index()

    # Unir el resumen de ganancias con los nombres de las categorías
    category_summary = category_summary.merge(data[['categoryId', 'categoryName']].drop_duplicates(), on='categoryId', how='left')

    # Formato de salida JSON
    result = {
        "total_purchase": float(total_purchase),
        "total_sales": float(total_sales),
        "balance": float(balance),
        "profit_summary": profit_summary.to_dict(orient='records'),
        "category_summary": category_summary.to_dict(orient='records')
    }

    return result

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = analyze_transactions(file_path)
    print(json.dumps(result))  # Devuelve los resultados como JSON
