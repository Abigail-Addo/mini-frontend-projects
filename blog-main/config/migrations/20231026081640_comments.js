/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('comments', function (table) {
      
    table.increments('id').primary();

    table.integer('user_id', 255).notNullable();
    table.integer('post_id', 255).notNullable();
    table.string('comment', 255);
    table.timestamp(true, true);
});
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  
};
