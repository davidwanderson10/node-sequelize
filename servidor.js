// importando o módulo http do Node.js
const http = require('http');
// importando os modelos e a função de conexão com o banco de dados
const { connectToDatabase, Usuarios } = require('./models');

// criando um servidor HTTP
const server = http.createServer(async (req, res) => {
    // Conectar ao banco de dados e sincronizar os modelos
    await connectToDatabase();

    // definindo o cabeçalho da resposta
    res.setHeader('Content-Type', 'application/json');
    
    // Buscar todos os usuários com atributos específicos
    const usuarios = await Usuarios.findAll(
        {
          attributes: ['name', 'email', 'role'],
        }
      )

    // Exibir os usuários encontrados
    const data = usuarios.map(u => u.toJSON());


    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});