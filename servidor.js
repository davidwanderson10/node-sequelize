// importando o módulo http do Node.js
const http = require('http');
// importando os modelos e a função de conexão com o banco de dados
const { connectToDatabase, Usuarios, Professores } = require('./models');

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
        const id = req.url.split('/')[2] // id = [ "localhost:3000", "usuarios", "6"] extrai o ID do usuário da URL
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

    ///////////////////////// ROTA DELETE /////////////////////////
    else if (req.method === 'DELETE' && req.url.startsWith('/usuarios/')) {
        const id = req.url.split('/')[2] // id = [ "localhost:3000", "usuarios", "6"] extrai o ID do usuário da URL
        console.log(`🟢 Rota DELETE /usuarios/${id} acionada`);

        try {
            const deleted = await Usuarios.destroy({ where: { id } }); // deleta o usuário do banco de dados pelo id indicado
            if (deleted) {
                res.statusCode = 204; // No Content
                return res.end();
            }
            res.statusCode = 404; // Not Found
            return res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
        } catch (error) {
            console.error('🔴 Erro ao deletar usuário:', error);
            res.statusCode = 500; // Internal Server Error
            return res.end(JSON.stringify({ message: 'Erro ao deletar usuário' }));
        }
    }

    ///////////////////////// ROTA GET /professores /////////////////////////
    if (req.method === 'GET' && req.url === '/professores') {
        console.log('🔵 Rota GET /professores acionada');
        try {
          const professores = await Professores.findAll({attributes: ['nome', 'email', 'sede', 'data_contratacao', 'ativo']});
          const data = professores.map(p => p.toJSON());
          return res.end(JSON.stringify(data));

        } catch (error) {
            console.error('🔴 Erro ao buscar professores:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Erro ao buscar professores' }));
        }
    }

     ///////////////////////// ROTA POST /professores /////////////////////////
     else if (req.method === 'POST' && req.url === '/professores') {
        console.log('🔵 Rota POST /professores acionada');
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // converte o Buffer para string
        });

        req.on('end', async () => {
            try {
                const professorData = JSON.parse(body); // converte a string JSON para objeto
                const novoProfessor = await Professores.create(professorData); // cria um novo professor no banco de dados
                res.statusCode = 201; // Created
                return res.end(JSON.stringify(novoProfessor.toJSON()));
            } catch (error) {
                console.error('🔴 Erro ao criar professor:', error);
                res.statusCode = 400; // Bad Request
                return res.end(JSON.stringify({ message: 'Erro ao criar professor' }));
            }
        });
    } 

     ///////////////////////// ROTA UPDATE professores /////////////////////////
     else if (req.method === 'PUT' && req.url.startsWith('/professores/')) { 
        const id = req.url.split('/')[2] // id = [ "localhost:3000", "professores", "6"] extrai o ID do usuário da URL
        console.log(`🟢 Rota PUT /professores/${id} acionada`);

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // converte o Buffer para string
        });

        req.on('end', async () => {
            try {
                const professorData = JSON.parse(body); // converte a string JSON para objeto
                const [updated] = await Professores.update(professorData, { where: { id } }); // atualiza o professor no banco de dados
                if (updated) {
                    const updatedProfessor = await Professores.findByPk(id);
                    return res.end(JSON.stringify(updatedProfessor.toJSON()));
                }
                res.statusCode = 404; // Not Found
                return res.end(JSON.stringify({ message: 'Professor não encontrado' }));
            } catch (error) {
                console.error('🔴 Erro ao atualizar professor:', error);
                res.statusCode = 400; // Bad Request
                return res.end(JSON.stringify({ message: 'Erro ao atualizar professor' }));
            }
        });
    }

    ///////////////////////// ROTA DELETE professores /////////////////////////
    else if (req.method === 'DELETE' && req.url.startsWith('/professores/')) {
        const id = req.url.split('/')[2] // id = [ "localhost:3000", "professores", "6"] extrai o ID do professor da URL
        console.log(`🟢 Rota DELETE /professores/${id} acionada`);

        try {
            const deleted = await Professores.destroy({ where: { id } }); // deleta o professor do banco de dados pelo id indicado
            if (deleted) {
                res.statusCode = 204; // No Content
                return res.end();
            }
            res.statusCode = 404; // Not Found
            return res.end(JSON.stringify({ message: 'Professor não encontrado' }));
        } catch (error) {
            console.error('🔴 Erro ao deletar professor:', error);
            res.statusCode = 500; // Internal Server Error
            return res.end(JSON.stringify({ message: 'Erro ao deletar professor' }));
        }
    }

    
})

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});


// RESUMO SOBRE OS MÉTODOS HTTP:
// GET: Usado para buscar dados do servidor. Exemplo: buscar todos os usuários ou um usuário específico, geralmente não altera o estado do servidor e não deve ter efeitos colaterais. Não deve ter corpo na requisição.

// POST: Usado para enviar dados ao servidor, geralmente para criar um novo recurso. Exemplo: criar um novo usuário ou um simples login. Pode ter um corpo na requisição com os dados a serem enviados.

// PUT: Usado para atualizar um recurso existente no servidor. Exemplo: atualizar os dados de um usuário específico. Geralmente, o corpo da requisição contém os dados atualizados e a URL contém o identificador do recurso a ser atualizado.

// DELETE: Usado para remover um recurso do servidor. Exemplo: deletar um usuário específico. A URL geralmente contém o identificador do recurso a ser removido, e não deve ter corpo na requisição. A URL pode ser algo como `/usuarios/6`, onde `6` é o ID do usuário a ser deletado igual ao PUT.


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


// CRIE UM CRUD (Create, Read, Update, Delete) simples para gerenciar professores em um sistema escolar.
// O CRUD deve permitir:
// 1. Criar um novo professor (POST /professores)
// 2. Listar todos os professores (GET /professores)
// 3. Atualizar os dados de um professor (PUT /professores/:id
// 4. Deletar um professor (DELETE /professores/:id)

// Campos do modelo:
// - id (número, auto-incremento)
// - nome (string, obrigatório)
// - email (string, obrigatório, único)
// - sede (string, obrigatório)
// - dataContratacao (data, obrigatório)
// - ativo (booleano, padrão true)
// - createdAt (data de criação, gerado automaticamente)
// - updatedAt (data de atualização, gerado automaticamente)
