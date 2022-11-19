const express = require("express");
app = express();

// Sample JSON data
const data = require("./sampledata");

app.get("/api", (req, res) => {
  res.json(data);
});

uid = 0;

app.get(`/api/user/${uid}`, (req, res) => {
  res.json(data["users"][uid]);
});

app.get("/api/hoots", (req, res) => {
  res.json(data["hoots"]);
});

app.get(`/api/inbox/${uid}`, (req, res) => {
  res.json(data["replies"]);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
