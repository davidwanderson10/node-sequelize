const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professores = sequelize.define('Professores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sede: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_contratacao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'professores',
  timestamps: true
});

module.exports = Professores;