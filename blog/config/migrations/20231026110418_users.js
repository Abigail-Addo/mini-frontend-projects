/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('profile_photo');
        table.string('location');
        table.string('email').unique().notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
