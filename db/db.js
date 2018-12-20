var knex = require("knex")({
  client: "pg",
  connection: {
    username: "student",
    password: "student",
    database: "postgres"
  }
});


module.exports = knex