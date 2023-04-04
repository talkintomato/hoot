const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: "hoot",
});

module.exports = client;

// const Pool = require("pg").Pool;
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   database: "hoot",
// });

// module.exports = pool;
