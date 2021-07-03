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
  const { user_id, content, draft } = req.body;

  db.query(
    "INSERT INTO hoots ( user_id, content, draft) VALUES (?,?,?)",
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
  db.query("SELECT * FROM hoots WHERE user_id = ? AND draft = 1", [req.params.user_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

// update a draft to a post
app.put('/write/:id', (req, res) => {
  db.query("UPDATE hoots SET draft = 0, content = ? WHERE post_id = ?",
    [req.body.content, req.params.id], (err, result) => {
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
  db.query("SELECT * FROM hoots where post_id = ?;", [req.params.post_id], (err, result) => {
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
  db.query("DELETE FROM hoots WHERE post_id = ?", [req.params.post_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(result)
      console.log("deleted " + req.params.post_id);
    }
  });
});

// view hoots in pool 
app.get('/reply/:user_id', (req, res) => {
  db.query("SELECT * FROM hoots WHERE user_id != ? AND draft = 0", [req.params.user_id], (err, result) => {
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

// view own hoots
app.get('/inbox/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query("SELECT hoots.post_id, hoots.user_id, hoots.content, COUNT(DISTINCT replies.reply_id) AS reply_count, SUM(replies.unread) AS unread FROM hoots LEFT JOIN replies ON hoots.post_id = replies.post_id WHERE user_id = 2 AND draft = 0 GROUP BY hoots.post_id",
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
    "UPDATE replies SET replies.unread = 0 WHERE reply_id = ?", [req.params.reply_id], (err, result) => {
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
  const { id, email, username } = req.body;

  db.query(
    "INSERT INTO users (id, email, username) VALUES (?, ?, ?)",
    [user_id, email, username], (err, result) => {
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
  db.query("SELECT users.user_id, users.username, users.email, COUNT(DISTINCT replies.reply_id) AS reply_count, COUNT(DISTINCT hoots.post_id) AS post_count FROM users LEFT JOIN hoots ON users.user_id = hoots.user_id LEFT JOIN replies ON users.user_id = replies.replier_id WHERE users.user_id = ? GROUP BY users.user_id",
    [req.params.id], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

