import { Router } from "express"
import { connectToDatabase } from "../db/connection.js"

const router = Router();

router.get("/usuarios", async (req, res) => {
    try {
        const conexao = await connectToDatabase();
        const resultado = await conexao.request().query("SELECT * FROM tb_usuario")
        res.json(resultado.recordset)
    }
    catch (err) {
        res.status(500).send('Erro ao buscar clientes.');
    }
})

router.post("/cadastrar", async (req, res) => {
    const { NOME, IDADE, EMAIL } = req.body
    try {
        const conexao = await connectToDatabase();
        await conexao
            .request()
            .input('NOME', NOME)
            .input('IDADE', IDADE)
            .input('EMAIL', EMAIL)
            .query(
                `INSERT INTO tb_usuario (NOME, IDADE, EMAIL)
         VALUES (@NOME, @IDADE, @EMAIL)`
            )
            res.status(201).send('Usuario criado com sucesso')
    } catch (err) {
        res.status(500).send('Erro ao criar usuario.');
    }
})

export default router