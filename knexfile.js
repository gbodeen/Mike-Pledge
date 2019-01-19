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

  dev_pg_db: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'pledges',
      user: process.env.LOCAL_PG_USER,
      password: process.env.LOCAL_PG_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: 'sdc/postgres/seeds/'
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
