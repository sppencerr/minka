const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Vote extends Model {}

Vote.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'posts',
      key: 'id'
    },
    allowNull: false
  }
}, {
  sequelize: connection,
  modelName: 'votes',
  underscored: true,
  timestamps: false,
  freezeTableName: true
});

module.exports = Vote;
