// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // build: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './Menuplus.sqlite3'
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     directory: './migrations'
  //   }, 
  //   seeds: {
  //     directory: './seeds'
  //   }
  // },

  development: {
    client: 'mysql',
    connection: {
      database: 'blog',
      user:     'root',
      password: '',
      port : 3306,
      host : 'localhost'
    },

    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }, 
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
