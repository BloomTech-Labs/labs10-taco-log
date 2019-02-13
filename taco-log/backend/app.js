

//const express = require("express");
//const knex = require("knex");
//const server = express();
//const dbConfig = require("../knexfile.js");
//const db = knex(dbConfig.development);
//const cors = require("cors");
//server.use(cors());
//server.use(express.json());

const http = require('http');

const hostname = "taco-log-backend.herokuapp.com";
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
