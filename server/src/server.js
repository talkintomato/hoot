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

  const id = req.body.id;
  const user_id = req.body.user_id;
  const content = req.body.content;
  const reply_count = req.body.reply_count;
  const time = req.body.time;

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

//reply to a hoot 
app.get

app.listen(port, () => console.log(`Listening on port ${port}`));

