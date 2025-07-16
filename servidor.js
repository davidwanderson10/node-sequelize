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
    
    ///////////////////////// ROTA GET /usuarios /////////////////////////
    if (req.method === 'GET' && req.url === '/usuarios') {
        try {
          const usuarios = await Usuarios.findAll({attributes: ['name', 'email', 'role']});
          const data = usuarios.map(u => u.toJSON());
          return res.end(JSON.stringify(data));

        } catch (error) {
            console.error('🔴 Erro ao buscar usuários:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Erro ao buscar usuários' }));
        }
    }

    ///////////////////////// ROTA POST /usuarios /////////////////////////
    else if (req.method === 'POST' && req.url === '/usuarios') {
        console.log('🔵 Rota POST /usuarios acionada');
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // converte o Buffer para string
        });

        req.on('end', async () => {
            try {
                const usuarioData = JSON.parse(body); // converte a string JSON para objeto
                const novoUsuario = await Usuarios.create(usuarioData); // cria um novo usuário no banco de dados
                res.statusCode = 201; // Created
                return res.end(JSON.stringify(novoUsuario.toJSON()));
            } catch (error) {
                console.error('🔴 Erro ao criar usuário:', error);
                res.statusCode = 400; // Bad Request
                return res.end(JSON.stringify({ message: 'Erro ao criar usuário' }));
            }
        });
    } 

    ///////////////////////// ROTA UPDATE /////////////////////////
    else if (req.method === 'PUT' && req.url.startsWith('/usuarios/')) {
        const id = req.url.split('/')[2]; // extrai o ID do usuário da URL
        console.log(`🟢 Rota PUT /usuarios/${id} acionada`);

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // converte o Buffer para string
        });

        req.on('end', async () => {
            try {
                const usuarioData = JSON.parse(body); // converte a string JSON para objeto
                const [updated] = await Usuarios.update(usuarioData, { where: { id } }); // atualiza o usuário no banco de dados
                if (updated) {
                    const updatedUsuario = await Usuarios.findByPk(id);
                    return res.end(JSON.stringify(updatedUsuario.toJSON()));
                }
                res.statusCode = 404; // Not Found
                return res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
            } catch (error) {
                console.error('🔴 Erro ao atualizar usuário:', error);
                res.statusCode = 400; // Bad Request
                return res.end(JSON.stringify({ message: 'Erro ao atualizar usuário' }));
            }
        });
    }
    
})

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});











// Buscar todos os usuários com atributos específicos
// const usuarios = await Usuarios.findAll(
//   {
//     attributes: ['name', 'email', 'role'],
//   }
// )

// Exibir os usuários encontrados
// const data = usuarios.map(u => u.toJSON());

// if (req.method === 'GET' && req.url === '/users') {
//   res.statusCode = 200;
//   res.end(JSON.stringify(data));
// } else {
//   res.statusCode = 404;
//   res.end(JSON.stringify({ message: 'Rota não encontrada' }));
// }