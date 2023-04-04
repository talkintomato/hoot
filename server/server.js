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

// const client = require("./db");

// Connect
client.connect();

const PORT = process.env.PORT ?? 5000;
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

// Post a hoot
app.post(`/api/post/${uid}`, async (req, res) => {
  let hoot = req.body;
  let sql = `INSERT INTO hoots VALUES (${hoot.hid}, ${hoot.uid}, ${hoot.content})`;
  client.query(sql, (err, result) => {
    if (err) throw err;
    res.status = "success";
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
