const { connectToDatabase, Usuarios } = require('./models');
const { Op } = require('sequelize');

const iniciar = async () => {

    // Conectar ao banco de dados e sincronizar os modelos
    await connectToDatabase();
    // Buscar todos os usuários
    const usuarios = await Usuarios.findAll(
      {
        attributes: ['name', 'email', 'role'],
        where: {
          name: {
            [Op.like]: 'João%',
          }
        },
      }
    );
    // Exibir os usuários encontrados
    console.log('Usuários:', usuarios.map(u => u.toJSON()))

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
