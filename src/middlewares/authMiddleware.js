import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwtUtils.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verifica el token y decodifica el contenido
        const decoded = jwt.verify(token, JWT_SECRET);
        
        console.log(decoded); // Puedes revisar lo que contiene `decoded`

        // Almacena el objeto `decoded` en `req.user`
        req.user = decoded;
        
        // Si prefieres guardar solo el companyId, pero mantén el nombre consistente
        req.companyId = decoded.companyId;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido back' });
        }
        res.status(401).json({ error: 'No autorizado' });
    }
};
