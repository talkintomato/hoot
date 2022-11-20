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
  let sql = `SELECT *, 
        (SELECT COUNT(*) FROM hoots h WHERE h.uid = ${uid}) AS hoot_count,
        (SELECT COUNT(*) FROM replies r WHERE r.uid = ${uid}) AS reply_count
      FROM users u 
      WHERE u.uid = ${uid}`;
  client.query(sql, (err, result) => {
    if (err) throw err;
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
    res.json(result.rows);
  });
});

/**
 * Inbox
 */
// Get inbox
app.get(`/api/inbox/${uid}`, (req, res) => {
  let sql = `SELECT r.rid, h.hid, ufrom.username, r.content, h.content AS parent
      FROM users uto JOIN hoots h 
      ON uto.uid = h.uid
      JOIN replies r
      ON r.hid = h.hid
      JOIN users ufrom
      ON r.uid = ufrom.uid
      WHERE uto.uid = ${uid}`;
  client.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result.rows);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
