const express = require("express");
// const morgan = require("morgan");
// const path = require("path");
// const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("../db/db.js");
// const config = require("./config.js");
const app = express();
const router = require('./routers');

// app.use(morgan("dev"));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(bodyParser.json());
app.use(router);

// app.get("/test", (req, res) => {
//   res.json(config.DB_USER);
// });

// app.get("/pledges/:id", (req, res) => {
//   db.select()
//     .where({ id: req.params.id })
//     .from("pledges")
//     .then(result => {
//       result[0].pledged = Number(result[0].pledged);
//       res.status(200);
//       res.json(result[0]);
//     })
//     .catch(err => {
//       console.log("There was an error getting info from DB", err);
//       res.sendStatus(500);
//       res.end();
//     });
// });

// app.post("/pledges", (req, res) => {
//   db("pledges")
//     .where({ id: req.body.id })
//     .increment({
//       pledged: req.body.pledge_amount,
//       backer_count: Number(!req.body.hasBacked)
//     })
//     .then(() => {
//       res.sendStatus(200);
//       res.end();
//     })
//     .catch(err => {
//       console.log("There was an error updating pledge amount in db: ", err);
//       res.sendStatus(500);
//       res.end();
//     });
// });

module.exports = app;
