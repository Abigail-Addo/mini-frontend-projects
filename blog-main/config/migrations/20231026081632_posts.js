/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.string('article', 255);
        table.string('image', 255);
        table.integer('user_id', 255).notNullable();
        table.integer('comments', 255);
        table.timestamp(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posts');
  
};
