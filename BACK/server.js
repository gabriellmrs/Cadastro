import express from 'express'
import dotenv from 'dotenv';//lê valores de um arquivo .env
import bodyParser from 'body-parser';//analisar dados JSON
import cors from 'cors';//configurar e controlar quais origens (domínios ou portas) podem acessar a aplicação
import routes from "./router/routes.js"

const app = express()
const PORT = process.env.PORT || 5000;

dotenv.config();// Carrega as variáveis de ambiente do arquivo .env

app.use(cors());// Habilita CORS para todas as origens
app.use(bodyParser.json());


app.use('/',routes)


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });