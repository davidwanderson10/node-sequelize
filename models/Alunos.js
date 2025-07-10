const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alunos = sequelize.define('Alunos', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'alunos',
  timestamps: true
});

module.exports = Alunos;