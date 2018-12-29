const config = require("../server/config");

const db = require("knex")({
  client: "pg",
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
  }
});

module.exports = db;
