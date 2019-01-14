require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'pledges',
      user: process.env.LOCAL_MYSQL_USER,
      password: process.env.LOCAL_MYSQL_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'sdc/seeds'
    }
  },

  // staging: {
  //   client: 'mysql',
  //   connection: {
  //     host: 'localhost',
  //     database: 'pledges',
  //     user: process.env.LOCAL_MYSQL_USER,
  //     password: process.env.LOCAL_MYSQL_PASS
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   },
  //   seeds: {
  //     directory: 'sdc/seeds'
  //   }
  // },

  // production: {
  //   client: 'mysql',
  //   connection: {
  //     host: 'localhost',
  //     database: 'pledges',
  //     user: process.env.LOCAL_MYSQL_USER,
  //     password: process.env.LOCAL_MYSQL_PASS
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   },
  //   seeds: {
  //     directory: 'sdc/seeds'
  //   }
  // }

};
