const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql')

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'hoot',
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

app.post('/write', (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user_id;
  const content = req.body.content;
  const reply_count = req.body.reply_count;
  const time = req.body.time;

  db.query(
    "INSERT INTO employees (name, age, country, position wage) VALUES (?,?,?,?,?)",
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