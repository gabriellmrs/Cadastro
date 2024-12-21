###Sistema de Gerenciamento de Usuários com Banco de Dados em Nuvem (Azure SQL)
Este é um projeto completo de gerenciamento de usuários que utiliza um banco de dados em nuvem (Azure SQL) para armazenar e gerenciar informações. A aplicação permite cadastrar, consultar, editar, deletar e buscar usuários de maneira eficiente e moderna, com uma interface construída em React.js e um back-end robusto em Node.js.
Funcionalidades
Cadastrar Usuários: Adicionar novos usuários ao banco de dados.
Consultar Usuários: Listar todos os usuários cadastrados em uma tabela responsiva.
Editar Usuários: Modificar informações dos usuários com modais interativos.
Excluir Usuários: Remover usuários do banco com confirmação.
Buscar Usuários: Pesquisar usuários pelo nome, com suporte a buscas parciais.
Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

Node.js (versão 16 ou superior)
npm ou yarn
Git
Um banco de dados configurado no Azure SQL
Instalação
1. Clone o Repositório
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd Cadastro
2. Configure o Banco de Dados
No Azure SQL, crie uma tabela chamada tb_usuario com a seguinte estrutura:

sql
Copiar código
CREATE TABLE tb_usuario (
    ID INT PRIMARY KEY IDENTITY(1,1),
    NOME VARCHAR(255) NOT NULL,
    IDADE INT NOT NULL,
    EMAIL VARCHAR(255) NOT NULL
);
Configuração do Back-End
1. Instale as Dependências
Navegue até a pasta do servidor e instale as dependências:

bash
Copiar código
cd backend
npm install
2. Configure o Banco de Dados
Edite o arquivo de configuração do banco (db/connection.js) para incluir suas credenciais do Azure SQL:

javascript
Copiar código
const config = {
  user: "seu-usuario",
  password: "sua-senha",
  server: "seu-servidor.database.windows.net",
  database: "seu-banco-de-dados",
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};
3. Inicie o Servidor
bash
Copiar código
npm start
O servidor estará rodando em: http://localhost:5000

Configuração do Front-End
1. Instale as Dependências
Navegue até a pasta do front-end e instale as dependências:

bash
Copiar código
cd frontend
npm install
2. Configure a API
Edite o arquivo de configuração da API (src/services/api.js) para apontar para o endereço do servidor:

javascript
Copiar código
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL do servidor backend
});

export default api;
3. Inicie o Front-End
bash
Copiar código
npm start
O front-end estará disponível em: http://localhost:3000

Testando o Projeto
Acesse o front-end: http://localhost:3000
Use as funcionalidades:
Cadastre novos usuários.
Veja a lista de usuários cadastrados.
Edite ou exclua usuários utilizando os botões disponíveis.
Use a barra de pesquisa para buscar usuários pelo nome.
Tecnologias Utilizadas
Front-End
React.js
Axios
CSS (modularizado)
Back-End
Node.js
Express.js
mssql (para conexão com o Azure SQL)
Banco de Dados
Azure SQL
Possíveis Problemas e Soluções
Erro ao conectar ao Azure SQL:

Verifique as configurações de firewall no portal do Azure e certifique-se de que o IP da sua máquina está liberado.
Porta em uso (3000 ou 5000):

Mude a porta no arquivo de configuração ou encerre outros serviços usando a mesma porta.
Erro CORS:

Certifique-se de que o back-end permite conexões do front-end. Adicione o seguinte middleware no back-end:
javascript
Copiar código
const cors = require("cors");
app.use(cors());

Contato
Caso tenha dúvidas ou sugestões, entre em contato:

E-mail: gabrielmoraiss755@gmail.com
LinkedIn:(https://www.linkedin.com/in/gabriel-morais-649016295/)
GitHub: gabriellmrs
Com esse README, qualquer pessoa pode configurar e executar o projeto na sua própria máquina de forma clara e eficiente! 🚀






