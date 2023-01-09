const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  comment_text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'posts',
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  }
}, {
  sequelize: connection,
  modelName: 'comments',
  underscored: true,
  freezeTableName: true
});

module.exports = Comment;
