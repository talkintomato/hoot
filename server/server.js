const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
const app = express();
const PORT = process.env.SERVERPORT ?? 5000;

app.use(cors());
app.use(express.json());

/**
 * Login
 */
// User authentication process here
app.get("/users/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const users = await pool.query("SELECT uid FROM users WHERE email = $1", [
      userEmail,
    ]);
    res.json(users.rows);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Profile
 */
app.get("/api/user/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const profile = await pool.query(
      "SELECT *, (SELECT COUNT(*) FROM hoots h WHERE h.uid = $1) AS hoot_count, (SELECT COUNT(*) FROM replies r WHERE r.uid = $1) AS reply_count FROM users u WHERE u.uid = $1",
      [uid]
    );
    res.json(profile.rows);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Write
 */
// Get user drafts
app.get("/api/drafts/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const drafts = await pool.query("SELECT * FROM drafts WHERE uid=$1", [uid]);
    res.json(drafts.rows);
  } catch (err) {
    console.error(err);
  }
});

// uid = 0;
// // Post a hoot
app.post("/api/post/:uid", async (req, res) => {
  const uid = req.params.uid;
  const hid = uuidv4();
  const { content } = req.body;
  try {
    pool.query("INSERT INTO hoots VALUES ($1, $2, $3)", [hid, uid, content]);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Hootbox
 */
// Get public hoots
app.get("/api/hoots", async (req, res) => {
  console.log("backend posting");
  try {
    const hoots = await pool.query(
      "SELECT h.uid, u.username, h.content FROM hoots h JOIN users u ON h.uid = u.uid"
    );
    res.json(hoots.rows);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Inbox
 */
// Get inbox
app.get("/api/inbox/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const replies = await pool.query(
      "SELECT r.rid, h.hid, ufrom.username, r.content, h.content AS parent FROM users uto JOIN hoots h ON uto.uid = h.uid JOIN replies r ON r.hid = h.hid JOIN users ufrom ON r.uid = ufrom.uid WHERE uto.uid = $1",
      [uid]
    );
    res.json(replies.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
