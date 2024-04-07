const { Model } = require('objection');
const knex = require('../../config/database')
const User = require('./user')


Model.knex(knex);

class Post extends Model {
    static tableName = 'posts';

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                article: { type: 'string' },
                image : { type: 'string' },
                user_id : {type: 'integer'},
                comments: { type: 'integer' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    };

    static relationMappings = {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'users.id',
            to: 'posts.user_id'
          }
        }
      };
  }


  module.exports = Post;