import cors from 'cors';
import express from 'express';
//import { PrismaClient } from '@prisma/client';

const app = express();
//const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rutas aqui
app.get('/', (req, res) => {
    res.send(
        '<h1>Api Bodega</h1><br><p>Lorem Ipsum Merol</p>'
    );
    console.log('Run Server');
});


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});