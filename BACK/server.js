import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './router/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

app.use(cors()); // Habilita CORS para todas as origens

// Middleware para JSON aplicado apenas para POST e PUT
app.use((req, res, next) => {
    if (['POST', 'PUT'].includes(req.method)) {
        return bodyParser.json()(req, res, next);
    }
    next();
});

// Rotas principais
app.use('/', routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
