const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'hoot',
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// when user creates a hoot 
app.post('/write', (req, res) => {
  console.log(req.body);
  const {id, user_id, content, reply_count, time} = req.body;

  db.query(
    "INSERT INTO hoots (id, user_id, content, reply_count, time) VALUES (?,?,?,?,?)",
    [id, user_id, content, reply_count, time], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.send("Values Inserted"); 
      }
    }
  )
});

// view hoots in pool 
app.get('/reply', (req, res) => {
  db.query("SELECT * FROM hoots", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

// view own hoots
app.get('/inbox', (req, res) => {
  const user_id = req.body.user_id;
  db.query("SELECT * FROM hoots WHERE user_id = ?", [user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//add users 
app.post('/users', (req, res) => {
  console.log(req.body);
  const {id, email, username} = req.body;

  db.query(
    "INSERT INTO hoot.users (id, email, username, post_count, reply_count, sticker_count) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, username, 0, 0, 0], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  )
});

//reply to a hoot 
app.get

app.listen(port, () => console.log(`Listening on port ${port}`));

