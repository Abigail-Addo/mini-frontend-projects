const knex = require('knex');
const knexfile = require('./knexfile');

//establish db connection

const db = knex(knexfile.development);

module.exports = db;
