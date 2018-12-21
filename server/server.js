const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("../db/db.js");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.get("/pledges", (req, res) => {
  db.select()
    .where({ id: req.query.id })
    .from("pledges")
    .then(result => {
      return result;
    })
    .then(result => {
      res.status(200);
      res.json(result[0]);
    })
    .catch(err => {
      console.log("There was an error getting info from DB", err);
      res.sendStatus(500);
    });
});

app.post("/pledges", (req, res) => {
  db("pledges")
    .where({ id: req.body.id })
    .increment({
      pledged: req.body.pledge_amount,
      backer_count: Number(!req.body.hasBacked)
    })
    .then(() => {
      db.select("pledged", "backer_count")
        .where({ id: req.body.id })
        .from("pledges")
        .then(result => {
          console.log(result);
          res.status(200);
          res.json(result[0]);
        });
    })
    .catch(err => {
      console.log("There was an error updating pledge amount in db: ");
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
