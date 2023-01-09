const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    })
      .then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_title',
            'post_body',
            'created_at',
            [connection.literal(`(SELECT COUNT (*) FROM votes WHERE posts.id = votes.post_id)`), 'vote_count']
          ]
        });
      });
  }
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3]
    }
  },
  post_body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  }
}, {
  sequelize: connection,
  modelName: 'posts',
  underscored: true,
  freezeTableName: true
});

module.exports = Post;
