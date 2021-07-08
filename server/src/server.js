const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());

const db = mysql.createConnection({
  user: 'admin',
  host: 'aws-hoot.cx8e7bsaucip.us-east-2.rds.amazonaws.com',
  password: 'ilovedblk',
  database: 'hoot',
})

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// when user creates a posts 
app.post('/write', (req, res) => {
  console.log(req.body);
  const { user_id, content, draft } = req.body;

  db.query(
    "INSERT INTO posts ( user_id, content, draft) VALUES (?,?,?)",
    [user_id, content, draft], (err, result) => {
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
  db.query("SELECT * FROM posts WHERE user_id = ? AND draft = 1", [req.params.user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

// update a draft 
app.put('/write/:id', (req, res) => {
  db.query("UPDATE posts SET draft = ?, content = ? WHERE id = ?",
    [req.body.draft, req.body.content, req.params.id], (err, result) => {
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
  console.log("request made");
  db.query("SELECT * FROM posts where id = ?;", [req.params.post_id], (err, result) => {
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
  db.query("DELETE FROM posts WHERE id = ?", [req.params.post_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(result)
      console.log("deleted " + req.params.post_id);
    }
  });
});

// view posts in pool 
app.get('/reply/:user_id', (req, res) => {
  db.query("SELECT * FROM posts WHERE user_id != ? AND draft = 0", [req.params.user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//add a reply 
app.post('/reply', (req, res) => {
  const { replier_id, post_id, content, sticker } = req.body;

  db.query(
    "INSERT INTO replies (replier_id, post_id, content, sticker) VALUES (?, ?, ?, ?); ",
    [replier_id, post_id, content, sticker], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Values Inserted");
      }
    }
  );
});

// view own posts
app.get('/inbox/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query("SELECT posts.id, posts.user_id, posts.content, COUNT(DISTINCT replies.id) AS reply_count, SUM(replies.unread) AS unread FROM posts LEFT JOIN replies ON posts.id = replies.post_id WHERE user_id = ? AND draft = 0 GROUP BY posts.id",
    [user_id], (err, result) => {
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

// mark message as read
app.put('/inbox/replies/:reply_id', (req, res) => {
  db.query(
    "UPDATE replies SET replies.unread = 0 WHERE id = ?", [req.params.reply_id], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("values updated")
      }
    }
  );
});


//add users 
app.post('/users', (req, res) => {
  console.log(req.body);
  const {id, email, username } = req.body;

  db.query(
    "INSERT IGNORE INTO users (id, email, username) VALUES (?, ?, ?)",
    [id, email, username], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("Values Inserted");
      }
    }
  )
});

//change nickname 
app.put('/users/:id', (req, res) => {
  db.query(
    "UPDATE users SET users.username = ? WHERE id = ?", [req.body.username, req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send("values updated")
      }
    }
  );
});


//get user info
app.get('/users/:id', (req, res) => {
  db.query("SELECT users.id, users.username, users.email, COUNT(DISTINCT replies.id) AS reply_count, COUNT(DISTINCT posts.id) AS post_count FROM users LEFT JOIN posts ON users.id = posts.user_id LEFT JOIN replies ON users.id = replies.replier_id WHERE users.id = ? GROUP BY users.id",
    [req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    });
});

app.get('/test', (req, res) => {
  console.log("request made")
  db.query("SELECT * FROM hoot.users;", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

