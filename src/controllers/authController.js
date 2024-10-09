import { loginService, registerService } from '../services/authService.js';

export const register = async (req, res) => {
    const { name, email, password, address, phone } = req.body;

    try {
        const result = await registerService(name, email, password, address, phone);
        res.status(201).json({ message: 'Usuario registrado exitosamente', company: result });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginService(email, password);
        if (!token) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
