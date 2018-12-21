let db = require("knex")({
  client: "pg",
  connection: {
    username: "student",
    password: "student",
    database: "pledges"
  }
});

module.exports = db;
