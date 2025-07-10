const { connectToDatabase, Usuarios } = require('./models');

const iniciar = async () => {

    // Conectar ao banco de dados e sincronizar os modelos
    await connectToDatabase();
    // Buscar todos os usuários
    const usuarios = await Usuarios.findAll({
        attributes: ['name', 'email'],
      });;
    // Exibir os usuários encontrados
    console.log('Usuários encontrados:', usuarios);
}

iniciar()