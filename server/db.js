// const { Client } = require("pg");
// require("dotenv").config();

// const client = new Client({
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   database: "hoot",
// });

// module.exports = client;

const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: "postgres",
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});

module.exports = pool;
