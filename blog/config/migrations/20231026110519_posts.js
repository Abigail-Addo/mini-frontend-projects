/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('article');
        table.string('image');
        table.integer('user_id').notNullable();
        table.integer('comments');
        table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
  
};