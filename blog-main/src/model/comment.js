const { Model } = require('objection');
const knex = require('../../config/database')
const User = require('./user')
const Post = require('./post')

Model.knex(knex);

class Comment extends Model {
    static tableName = 'comments';

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                comment: { type: 'string' },
                user_id : {type: 'integer'},
                post_id : {type: 'integer'},
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
            to: 'comments.user_id'
          }
        },
        post: {
            relation: Model.BelongsToOneRelation,
            modelClass: Post,
            join: {
              from: 'posts.id',
              to: 'comments.post_id'
            }
          }
      };
  }