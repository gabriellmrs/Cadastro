import sql from "mssql"

export async function connectToDatabase() {
    try {
        const conexao = await sql.connect({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
            options: {
                encrypt: true, // Habilitar criptografia
                trustServerCertificate: true, // Usar certificado de servidor, se necessário
            },
        })
        return conexao
    }
    catch (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        throw err; // Propaga o erro para que seja capturado em outros lugares
    }
}