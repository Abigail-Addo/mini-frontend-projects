/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('comments', function (table) {
      
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('post_id').notNullable();
    table.string('comment');
    table.timestamps(true, true);
});
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  
};

