import { Router } from "express"
import {connectToDatabase} from "../db/connection.js"

const router = Router();

router.get("/usuarios", async (req, res) => {
    try {
        const conexao = await connectToDatabase();
        const resultado = await conexao.request().query("SELECT * FROM tb_usuario")
        res.json(resultado.recordset)
    }
    catch(err) {
        res.status(500).send('Erro ao buscar clientes.');
    }
})

export default router