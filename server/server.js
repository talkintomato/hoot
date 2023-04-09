const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.SERVERPORT ?? 5000;

app.use(cors());
app.use(express.json());

/**
 * Login
 */
// Signup
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const uid = uuidv4();

  try {
    const signUp = await pool.query(
      `INSERT INTO users(uid, name, username, hashed_password, email) VALUES ($1, $2, $3, $4, $5)`,
      [uid, username, username, hashedPassword, email]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, token });
  } catch (err) {
    console.error(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "User does not exist!" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
  }
});

// Get user id
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

// Save a new draft
app.post("/api/savedraft/:uid", async (req, res) => {
  const uid = req.params.uid;
  const did = uuidv4();
  const { content } = req.body;
  console.log("saving draft...");
  try {
    pool.query("INSERT INTO drafts VALUES ($1, $2, $3)", [did, uid, content]);
    console.log("draft saved");
  } catch (err) {
    console.error(err);
  }
});

// Edit a draft
app.put("/api/editdraft/:did", async (req, res) => {
  const did = req.params.did;
  const { content } = req.body;
  try {
    pool.query("UPDATE drafts SET content = $1 WHERE did = $2", [content, did]);
  } catch (err) {
    console.error(err);
  }
});

// Delete a draft
app.delete("/api/deletedraft/:did", async (req, res) => {
  const did = req.params.did;
  try {
    pool.query("DELETE FROM drafts WHERE did = $1", [did]);
  } catch (err) {
    console.error(err);
  }
});

// Post a hoot
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

// Reply to a hoot
app.post("/api/reply/:uid", async (req, res) => {
  const uid = req.params.uid;
  const { hid, content } = req.body;
  const rid = uuidv4();
  try {
    pool.query("INSERT INTO replies VALUES ($1, $2, $3, $4)", [
      rid,
      hid,
      uid,
      content,
    ]);
  } catch (err) {
    console.error(err);
  }
});

/**
 * Hootbox
 */
// Get public hoots
app.get("/api/hoots", async (req, res) => {
  try {
    const hoots = await pool.query(
      "SELECT h.uid, u.username, h.hid, h.content FROM hoots h JOIN users u ON h.uid = u.uid"
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

// API to populate database with bots
app.get("/devmode", async (req, res) => {
  console.log("backend api called");
  const uidDarin = uuidv4();
  const uidChin = uuidv4();
  const uidJin = uuidv4();
  const uidAndy = uuidv4();
  let salt = bcrypt.genSaltSync(10);
  const hashedPasswordDarin = bcrypt.hashSync("darintoonice", salt);
  salt = bcrypt.genSaltSync(10);
  const hashedPasswordChin = bcrypt.hashSync("chinny", salt);
  salt = bcrypt.genSaltSync(10);
  const hashedPasswordJin = bcrypt.hashSync("jinlinthumb", salt);
  salt = bcrypt.genSaltSync(10);
  const hashedPasswordAndy = bcrypt.hashSync("andytoocool", salt);

  try {
    const signUp = await pool.query(
      `INSERT INTO users(uid, username, hashed_password, email) VALUES ($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12), ($13, $14, $15, $16)`,
      [
        uidDarin,
        "darinlohhandsome",
        hashedPasswordDarin,
        "darindamnhandsome@coolmail.com",
        uidChin,
        "chinkiatpower",
        hashedPasswordChin,
        "chindamncool@coolmail.com",
        uidJin,
        "jinlinhappy",
        hashedPasswordJin,
        "jinlindamncool@coolmail.com",
        uidAndy,
        "andytall",
        hashedPasswordAndy,
        "andydamncool@coolmail.com",
      ]
    );

    res.json({ status: "Dev mode activated" });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
