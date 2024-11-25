import { Router } from 'express';
import { exec } from 'child_process';
import { exportTransactionsToCSV, exportStockToCSV } from '../controllers/analysisController.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Importa fileURLToPath

const router = Router();

// Usar fileURLToPath para simular __dirname en módulos ECMAScript
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get('/analyze-transactions', async (req, res) => {
    try {
        // exportar los datos a un archivo CSV
        const csvPath = await exportTransactionsToCSV();

        // ruta del script de Python
        const scriptPath = path.resolve(__dirname, '../../src/analyze_transactions.py');

        // ejecutar el script de Python con el archivo CSV
        exec(`python ${scriptPath} ${csvPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script: ${stderr}`);
                return res.status(500).json({ error: 'Error al analizar transacciones' });
            }

            console.log(`Salida del script: ${stdout}`);
            // Procesar la salida y estructurarla en un objeto JSON
            const analysisResult = {
                summary: stdout,
                // Agregar aquí más campos si es necesario, por ejemplo, los datos procesados del script Python
            };

            // Devolver la respuesta como JSON
            return res.status(200).json(analysisResult);
        });
    } catch (err) {
        console.error('Error procesando análisis:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/analyze-stock', async (req, res) => {
    try {
        // exportar los datos a un archivo CSV
        const csvPath = await exportStockToCSV();

        // ruta del script de Python
        const scriptPath = path.resolve(__dirname, '../../src/analyze_stock.py');

        // ejecutar el script de Python con el archivo CSV
        exec(`python ${scriptPath} ${csvPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error ejecutando el script: ${stderr}`);
                return res.status(500).json({ error: 'Error al analizar transacciones' });
            }

            console.log(`Salida del script: ${stdout}`);
            // Procesar la salida y estructurarla en un objeto JSON
            const analysisResult = {
                summary: stdout,
                // Agregar aquí más campos si es necesario, por ejemplo, los datos procesados del script Python
            };

            // Devolver la respuesta como JSON
            return res.status(200).json(analysisResult);
        });
    } catch (err) {
        console.error('Error procesando análisis:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;
