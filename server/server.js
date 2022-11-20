const express = require("express");
const { Client } = require("pg");

// Create connection to db
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "hoot",
});

// Connect
client.connect();

const app = express();

/**
 * Login
 */
// User authentication process here
uid = 0;

/**
 * Profile
 */
app.get(`/api/user/${uid}`, (req, res) => {
  let sql = `SELECT * FROM users WHERE uid=${uid}`;
  client.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result.rows);
  });
});

/**
 * Write
 */
// Get user drafts
app.get(`/api/drafts/${uid}`, (req, res) => {
  let sql = `SELECT * FROM drafts WHERE uid=${uid}`;
  client.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result.rows);
  });
});

/**
 * Hootbox
 */
// Get public hoots
app.get("/api/hoots", (req, res) => {
  let sql = `SELECT h.uid, u.username, h.content FROM hoots h JOIN users u ON h.uid = u.uid`;
  client.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result.rows);
  });
});

/**
 * Inbox
 */

// // Sample JSON data
// const data = require("./sample_data/sampledata");

// app.get("/api", (req, res) => {
//   res.json(data);
// });

// uid = 0;

// app.get(`/api/user/${uid}`, (req, res) => {
//   res.json(data["users"][uid]);
// });

// app.get("/api/hoots", (req, res) => {
//   res.json(data["hoots"]);
// });

// app.get(`/api/inbox/${uid}`, (req, res) => {
//   res.json(data["replies"]);
// });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
