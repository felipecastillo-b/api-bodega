import fs from 'fs';
import { getTransactionsService } from '../services/transactionService.js';
import { getAllProductsInInventoryService } from '../services/inventoryService.js';
import path from 'path';
import { exec } from 'child_process';

export const exportTransactionsToCSV = async () => {
    const transactions = await getTransactionsService();
    const headers = [
        'id', 'productId', 'productName', 'quantity', 'price', 'priceSell', 'categoryId', 'categoryName', 'reason', 'createdAt'
    ];
    const rows = transactions.map(tx => [
        tx.id, tx.productId, tx.product.name, tx.quantity, tx.product.price, tx.product.priceSell,
        tx.product.categoryId, tx.product.category.name, tx.reason, tx.createdAt
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const filePath = './data/transactions.csv';
    fs.writeFileSync(filePath, csvContent);
    return filePath;
};

export const analyzeTransactions = async (req, res) => {
    try {
        // Exportar datos a un archivo CSV
        const csvPath = await exportTransactionsToCSV();

        // Ruta del script de Python
        const scriptPath = path.resolve('./src/analyze_transactions.py');

        exec(`python ${scriptPath} ${csvPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script: ${stderr}`);
                return res.status(500).json({ error: 'Error al analizar transacciones' });
            }

            // Parsear la salida del script Python en un formato adecuado
            try {
                const analysisResult = JSON.parse(stdout);
                return res.status(200).json(analysisResult);
            } catch (err) {
                console.error('Error al parsear la salida del script Python:', err);
                return res.status(500).json({ error: 'Error procesando la salida del análisis' });
            }
        });
    } catch (err) {
        console.error('Error procesando análisis:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const exportStockToCSV = async () => {
    const transactions = await getAllProductsInInventoryService();
    const headers = [
        'id', 'inventoryName', 'productName', 'quantity','minimumQuantity', 'createdAt'
    ];
    const rows = transactions.map(tx => [
        tx.id, tx.inventory.name, tx.product.name, tx.quantity, tx.minimumQuantity,
        tx.createdAt
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const filePath = './data/stock.csv';
    fs.writeFileSync(filePath, csvContent);
    return filePath;
};

export const analyzeStock = async (req, res) => {
    try {
        // Exportar datos a un archivo CSV
        const csvPath = await exportTransactionsToCSV();

        // Ruta del script de Python
        const scriptPath = path.resolve('./src/analyze_stock.py');

        exec(`python ${scriptPath} ${csvPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script: ${stderr}`);
                return res.status(500).json({ error: 'Error al analizar transacciones' });
            }

            // Parsear la salida del script Python en un formato adecuado
            try {
                const analysisResult = JSON.parse(stdout);
                return res.status(200).json(analysisResult);
            } catch (err) {
                console.error('Error al parsear la salida del script Python:', err);
                return res.status(500).json({ error: 'Error procesando la salida del análisis' });
            }
        });
    } catch (err) {
        console.error('Error procesando análisis:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};