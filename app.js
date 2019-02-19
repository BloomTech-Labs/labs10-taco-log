
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());
const userDb = require('./database/helpers/dbhelper.js');
const dbConfig =require('./knexfile')
const knex = require('knex');
const db = knex(dbConfig.development);




server.get("/", (req, res) => {
  res.json({message: "Hello, World"});
})

server.get('/api/users',(req,res)=>{
  userDb.findUser()
  .then(user =>{    
    res.status(200).json(user)
  })
  .catch(err =>{
    res.send(err)
  } )
});
server.get(`/api/users/:id`, (req,res) =>{
  const {id} = req.params;
  userDb.getUser(id)
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(err =>{
    res.send(err)
  } ) 
});

server.listen(process.env.PORT || 5000, () =>
  {console.log("test")});