const sequelize = require('../config/database');
const Usuarios = require('./users');

//conectar ao banco de dados
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexão estabelecida com sucesso.');

        // await sequelize.sync({alter: true});
        // console.log('🔄 Modelos sincronizados com o banco de dados.');
        
    } catch (error) {
        console.error('🔴 Erro ao conectar ao banco:', error);
    }

}

module.exports = {connectToDatabase, Usuarios}