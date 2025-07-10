const sequelize = require('../config/database');
const Usuarios = require('./users');
const Alunos = require('./Alunos');

//conectar ao banco de dados
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexão estabelecida com sucesso.');

        // console.log('🔄 Modelos sincronizados com o banco de dados.');
        await sequelize.sync({alter: true});
        
    } catch (error) {
        console.error('🔴 Erro ao conectar ao banco:', error);
    }

}

module.exports = {connectToDatabase, Usuarios, Alunos};