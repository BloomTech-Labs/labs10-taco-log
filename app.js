const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());
const userDb = require("./database/helpers/dbhelper.js");
const dbConfig = require("./knexfile");
const knex = require("knex");
const db = knex(dbConfig.development);

server.get("/", (req, res) => {
  res.json({ message: "Hello, World" });
});

server.get("/api/users", (req, res) => {
  userDb
    .findUser()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.send(err);
    });
});

server.get(`/api/users/:id`, (req, res) => {
  const { id } = req.params;
  userDb
    .getUser(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.send(err);
    });
});

server.get("/api/tacos", (req, res) => {
  db("taco-log")
    .select()
    .then(taco => {
      res.status(200).json(taco);
    })
    .catch(err => {
      res.send(err);
    });
});

server.post("/api/tacos", (req, res) => {
  const { taco_location, rating } = req.body;
  db.insert({ taco_location, rating })
    .into("taco-log")
    .then(taco => {
      res.status(201).json(taco);
    });
});

server.post("/api/user_achievements", (req, res) => {
  const relation = req.body;
  if (relation.user_id && relation.achievement_id) {
    db.insert(relation)
      .into("user_achievements")
      .then(([id]) => ({ id }))
      .then(result => {
        db("user_achievements")
          .where("id", result.id)
          .first()
          .then(result => {
            userDb
              .getUser(result.user_id)
              .then(result => {
                res.status(200).json(result);
              })
              .catch(err => {
                res.send(err);
              });
          })
          .catch(err => {
            res.send(err);
          });
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.status(422).json('Must have "user_id" and "achievement_id".');
  }
});

server.listen(process.env.PORT || 5000, () => {
  console.log("test");
});
