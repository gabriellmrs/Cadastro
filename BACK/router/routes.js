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

router.get("/usuarios/:NOME", async (req, res) => {
    const { NOME } = req.params; // Captura o nome do parâmetro da URL

    try {
        const conexao = await connectToDatabase(); // Conecta ao banco
        const resultado = await conexao
            .request()
            .input("NOME", `%${NOME}%`) // Adiciona os curingas para busca parcial
            .query("SELECT * FROM tb_usuario WHERE NOME LIKE @NOME"); // Busca usuários com nome parcial

        if (resultado.recordset.length === 0) {
            return res.status(404).send("Usuário não encontrado."); // Retorna 404 se nenhum registro for encontrado
        }

        res.json(resultado.recordset); // Retorna os usuários encontrados
    } catch (err) {
        console.error("Erro ao buscar usuário por nome:", err);
        res.status(500).send("Erro ao buscar usuário por nome.");
    }
});



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

router.delete("/usuarios/:ID", async (req, res) => {
    const { ID } = req.params
    try {
        const conexao = await connectToDatabase()
        await conexao
            .request()
            .input('ID', parseInt(ID, 10))
            .query('DELETE FROM tb_usuario WHERE ID = @ID')
        res.status(200).send('Usuario deletado com sucesso')
    } catch (err) {
        res.status(500).send("Erro ao deletar usuario")
    }
})

router.put("/usuarios/:ID", async (req, res) => {
    const { ID } = req.params;
    const { NOME, IDADE, EMAIL } = req.body;

    try {
        const conexao = await connectToDatabase()

        await conexao
            .request()
            .input("ID", parseInt(ID, 10))
            .input("NOME", NOME)
            .input("IDADE", IDADE)
            .input("EMAIL", EMAIL)
            .query(`
                UPDATE tb_usuario
                SET NOME = @NOME, IDADE = @IDADE, EMAIL = @EMAIL
                WHERE ID = @ID
            `);
        res.status(200).send("Usuário atualizado com sucesso!")
    } catch (err) {
        console.error("Erro ao atualizar o usuário:", err);
        res.status(500).send("Erro ao atualizar o usuário.");
    }
})
export default router