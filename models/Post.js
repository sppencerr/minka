const req = require('express/lib/request');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// post extends connetion model
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
                        [sequelize.literal(`(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)`), 'vote_count']
                    ]
                });
            });
    }
}

Post.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;