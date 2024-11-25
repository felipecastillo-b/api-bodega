import fs from 'fs';
import { getTransactionsService } from '../services/transactionService.js';
import path from 'path';
import { exec } from 'child_process';

export const exportTransactionsToCSV = async () => {
    const transactions = await getTransactionsService();
    const headers = [
        'id', 'productId', 'quantity', 'price', 'priceSell', 'categoryId', 'minimumQuantity', 'reason', 'createdAt'
    ];
    const rows = transactions.map(tx => [
        tx.id, tx.productId, tx.quantity, tx.product.price, tx.product.priceSell,
        tx.product.categoryId, tx.minimumQuantity, tx.reason, tx.createdAt
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
