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
  const {id, user_id, content, draft, reply_count, time} = req.body;

  db.query(
    "INSERT INTO hoots (id, user_id, content, draft, reply_count, time) VALUES (?,?,?,?,?,?)",
    [id, user_id, content, draft, reply_count, time], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.send("Values Inserted"); 
      }
    }
  )
});

// get drafts 
app.get('/write/:user_id', (req, res) => {
  db.query("SELECT * FROM hoots WHERE user_id = ? AND draft=1", [req.params.user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

// update a draft to a post (not implemented)
app.put('/write/:id', (req, res) => {
  db.query(
    "UPDATE hoots SET draft = 0, content = ? WHERE id = ?", [req.body.content, req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  );
});

// get specific drafts 
app.get('/draft/:post_id', (req, res) => {
  db.query("SELECT * FROM hoots WHERE id = ?", [req.params.post_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(result)
      console.log(result);
    }
  });
});

// delete draft 
app.delete('/draft/:post_id', (req, res) => {
  db.query("DELETE FROM hoots WHERE id = ?", [req.params.post_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(result)
      console.log("deleted " + req.params.post_id);
    }
  });
});

// update draft to live hoot 
app.put('/draft/:id', (req, res) => {
  db.query(
    "UPDATE hoots SET draft = 1, content = ? WHERE id = ?", [req.body.content, req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  );
});


// view hoots in pool 
app.get('/reply/:user_id', (req, res) => {
  db.query("SELECT * FROM hoots WHERE user_id != ? AND draft = 0 AND reply_count <= 10", [req.params.user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.post('/reply', (req, res) => {
  console.log(req.body);
  const {user_id, post_id, content, sticker} = req.body;

  db.query(
    "INSERT INTO replies (user_id, post_id, content, sticker, viewed) VALUES (?, ?, ?, ?, ?); ",
    [user_id, post_id, content, sticker, 0], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  );
});

app.put('/reply/:post_id', (req, res) => {

  db.query(
    "UPDATE hoots SET reply_count = reply_count + 1 WHERE id = ?",
    [req.params.post_id], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  );
});

// view own hoots
app.get('/inbox/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query("SELECT * FROM hoots WHERE user_id = ? AND draft=0", [user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

// get replies to specific post 
app.get('/inbox/replies/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  db.query("SELECT * FROM replies WHERE post_id = ?", [post_id], (err, result) => {
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
    "INSERT INTO users (id, email, username, post_count, reply_count, sticker_count) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, username, 0, 0, 0], (err, result) => {
      if (err) {
        console.log(err)
      } else { 
        res.status(200).send("Values Inserted"); 
      }
    }
  )
});

//get user info
app.get('/users/:id', (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

