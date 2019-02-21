const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());
const userDb = require("./database/helpers/dbhelper.js");
const dbConfig = require("./knexfile");
const knex = require("knex");
const db = knex(dbConfig.development);
const admin = require('firebase-admin');
const serviceAccount = require('./service.js');


admin.initializeApp({  
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://taco-logs.firebaseio.com'
}); 

isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization  
  admin.auth().verifyIdToken(token)
    .then(decodedToken =>{
      if(decodedToken.uid == req.headers.id){
        next()
      } else {
        res.status(422).json('Token not valid.')
      }
    })
    .catch(err => {
      res.send(err);
    });  
}

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

server.post("/api/tacos", isAuthenticated, (req, res) => {
  const {user_id, taco_location, taco_description, rating} = req.body;
  db.insert({user_id, taco_location, taco_description, rating})
    .into("taco-log")
    .then(taco => {
      userDb.getUser(req.body.user_id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.send(err)
      })      
    })
    .catch(err => {
      res.send(err)      
    });
});

//============ACHIEVEMENT ENDPOINTS===========//

server.post("/api/user_achievements", isAuthenticated, (req, res) => {
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

//============STATS ENDPOINTS===========//

server.post('/api/user_stats', (req, res) =>{
  const stats = req.body  
  db.insert(stats)
    .into('user_stats')
    .then(result => {
      userDb.getUser(req.body.user_id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err);
    });
})

server.put('/api/user_stats/:id', isAuthenticated, (req, res) =>{
  const {id} = req.params;
  db('user_stats')
    .where('user_id', id)
    .update(req.body)
    .then(result => {      
      userDb.getUser(id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.send(err)
      })
    })
    .catch(err => {
      res.send(err);
    });
})

server.listen(process.env.PORT || 5000, () => {
  console.log("test");
});
