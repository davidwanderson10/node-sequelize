const { connectToDatabase, Usuarios } = require('./models');
const { Op } = require('sequelize');
const readline = require('readline');

const iniciar = async () => {

    // Conectar ao banco de dados e sincronizar os modelos
    await connectToDatabase();
    // Buscar todos os usuários 

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Digite o nome do usuário: ', async (nome) => {
    const usuarios = await Usuarios.findAll(
      {
        attributes: ['name', 'email', 'role'],
        where: {
          name: nome
        },
      }
    );
    // Exibir os usuários encontrados
    console.log('Usuários:', usuarios.map(u => u.toJSON()))
    rl.close();
  })

    // Criar um novo usuário
    // const novoUsuario = await Usuarios.create({
    //     name: 'Juan Bernardo',
    //     email: 'juan.bernardo@gmail.com',
    //     password: '51614',
    //     role: 'user'
    //   })

    // Exibir o novo usuário criado
    // console.log('Novo usuário criado:', novoUsuario.toJSON())
}

iniciar()
