import pandas as pd
import sys
import json

def analyze_transactions(file_path):
    # Cargar datos desde un archivo CSV
    data = pd.read_csv(file_path)
    
    # Limpiar la columna 'createdAt' eliminando "GMT-XXXX (hora de verano de Chile)"
    data['createdAt'] = data['createdAt'].str.replace(r" GMT[-+]\d{4}.*", "", regex=True)

    # Convertir la columna 'createdAt' a tipo datetime con un formato explícito
    data['createdAt'] = pd.to_datetime(data['createdAt'], format='%a %b %d %Y %H:%M:%S')

    # Calcular el total de compras (donde reason es "Compra de producto")
    total_purchase = data.loc[data['reason'] == 'Compra de producto'].apply(
    lambda row: row['price'] * row['quantity'], axis=1
    ).sum()

    # Calcular el total de ventas (donde reason es "Venta de producto")
    total_sales = data.loc[data['reason'] == 'Venta de producto'].apply(
    lambda row: row['priceSell'] * row['quantity'], axis=1
    ).sum()

    # Calcular el balance
    balance = total_sales - total_purchase

    # Calcular ganancias por producto
    data['profit'] = (data['priceSell'] - data['price']) * data['quantity']
    
    # Filtrar solo las ventas donde reason es "Venta de producto"
    filtered_data = data[data['reason'] == 'Venta de producto']
    
    # Calcular resumen de ganancias por producto
    profit_summary = filtered_data.groupby('productId').agg(
        total_sales=('quantity', 'sum'),
        total_profit=('profit', 'sum')
    ).reset_index()
    
    # Unir el resumen de ganancias con los nombres de los productos
    profit_summary = profit_summary.merge(
        data[['productId', 'productName']].drop_duplicates(), on='productId',
        how='left'
    )


    # Resumen por categoría basado en el filtro
    category_summary = filtered_data.groupby('categoryId').agg(
        total_sales=('quantity', 'sum'),
        total_profit=('profit', 'sum')
    ).reset_index()

    # Unir el resumen de ganancias con los nombres de las categorías
    category_summary = category_summary.merge(
        data[['categoryId', 'categoryName']].drop_duplicates(),
        on='categoryId',
        how='left'
    )

    # Productos con más demanda (donde reason es "Venta de producto")
    demand_summary = data[data['reason'] == 'Venta de producto'].groupby('productName').agg(
        total_quantity_sold=('quantity', 'sum')
    ).reset_index()

    # Ordenar los productos con más demanda de mayor a menor
    demand_summary = demand_summary.sort_values(by='total_quantity_sold', ascending=False)

    # Filtrar solo las transacciones de "Venta de producto"
    sales_by_day = data[data['reason'] == 'Venta de producto']

    # Convertir la columna 'createdAt' a datetime si no lo está, para poder extraer el día de la semana
    sales_by_day['createdAt'] = pd.to_datetime(sales_by_day['createdAt'])

    # Extraer el día de la semana de la fecha
    sales_by_day['day_of_week'] = sales_by_day['createdAt'].dt.day_name()

    # Agrupar por día de la semana y calcular la suma de la cantidad de productos vendidos por día
    sales_by_day_grouped = sales_by_day.groupby('day_of_week').agg(
        total_sales=('quantity', 'sum')
    ).reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).reset_index()

    # Calcular el número de veces que se realizaron ventas para cada día de la semana
    sales_by_day_grouped['num_sales_days'] = sales_by_day.groupby('day_of_week').size().reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).fillna(0).reset_index(drop=True)

    # Calcular el promedio de ventas por día de la semana (total de ventas / número de días con ventas)
    sales_by_day_grouped['average_sales'] = sales_by_day_grouped['total_sales'] / sales_by_day_grouped['num_sales_days']

    # Reemplazar NaN con 0 o null si es necesario
    sales_by_day_grouped['average_sales'] = sales_by_day_grouped['average_sales'].fillna(0)  # Usar 0 como valor predeterminado

    sales_by_day_grouped['total_sales'] = sales_by_day_grouped['total_sales'].fillna(0)  # Usar 0 como valor predeterminado

    # Opcional: Reemplazar con null en JSON si prefieres
    # sales_by_day_grouped['average_sales'] = sales_by_day_grouped['average_sales'].replace({pd.NA: None})

    # Formato de salida JSON
    result = {
        "total_purchase": float(total_purchase),
        "total_sales": float(total_sales),
        "balance": float(balance),
        "profit_summary": profit_summary.to_dict(orient='records'),
        "category_summary": category_summary.to_dict(orient='records'),
        "top_demand_products": demand_summary.to_dict(orient='records'),
        "average_sales_per_day": sales_by_day_grouped.to_dict(orient='records')
    }

    return result

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = analyze_transactions(file_path)
    print(json.dumps(result))  # Devuelve los resultados como JSON