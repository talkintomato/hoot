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

app.post('/write', (req, res) => {
  // console.log(req.body);

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

app.listen(port, () => console.log(`Listening on port ${port}`));