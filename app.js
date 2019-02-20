const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());
const userDb = require("./database/helpers/dbhelper.js");
const dbConfig = require("./knexfile");
const knex = require("knex");
const db = knex(dbConfig.development);

// const firebase = require('firebase');
// require('firebase/auth');
// require('firebase/database');
// // Initialize Firebase for the application
// const config = {
//   apiKey: "AIzaSyDhGZ712L1Xx_c4iW94hDnNusJ6Zk6zg0w",
//   authDomain: "taco-logs.firebaseapp.com",
//   databaseURL: "https://taco-logs.firebaseio.com",
//   projectId: "taco-logs",
//   storageBucket: "taco-logs.appspot.com",
//   messagingSenderId: "382029457859"
//   };

// firebase.initializeApp(config); 

// isAuthenticated = (req, res, next) => {
//   const user = firebase.auth().currentUser;
//   if (user !== null) {
//     req.user = user;
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }

//============USER ENDPOINTS===========//

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

server.post('/api/users', (req,res) => {
  const user = req.body;
  db.insert(user)
    .into('users')
    .then(([id]) => ({ id }))
    .then(result => {
      userDb.getUser(result.id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err)
    })
})

//============TACO ENDPOINTS===========//

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
  const {user_id, taco_location, taco_description, rating} = req.body;
  db.insert({user_id, taco_location, taco_description, rating})
    .into("taco-log")
    .then(taco => {
      res.status(201).json(taco);      
    })
    .catch(err => {
      res.send(err)      
    });
});

//============ACHIEVEMENT ENDPOINTS===========//

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
    res.status(422).json('Must have "user_id" and "achievement_id".')
  }  
})

server.get('/api/achievements', (req,res) => {
  db('achievements')
  .then(achievements =>{
    res.status(200).json(achievements)
  })
  .catch(err => {
    res.send(err)
  })
})

server.listen(process.env.PORT || 5000, () => {
  console.log("test");
});
