
//const express = require("express");
//const knex = require("knex");
const server = express();
const http = require ("http");
//const dbConfig = require("../knexfile.js");
//const db = knex(dbConfig.development);
//const cors = require("cors");
//server.use(cors());
//server.use(express.json());

server.get("/", (req, res) => {
  res.json({message: "Hello, World"});
})
