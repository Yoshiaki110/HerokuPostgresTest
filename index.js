const express = require("express");
const app = express();
const db = require('./db');

app.get('/', function(req, res) {
  res.send('OK');
});

app.get('/create', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query("CREATE TABLE Rank(id SERIAL,hands INTEGER NOT NULL,name VARCHAR(10) NOT NULL,level INTEGER NOT NULL,PRIMARY KEY(id))", function(err, result) {
        console.log(result);
      });
    }
  });
  res.render('index', {
    title: 'create',
  });
});

app.get('/add', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query("INSERT INTO Rank (hands, name, level) VALUES (10, 'taro', 2)", function(err, result) {
        console.log(result.rows);
      });
    }
  });
  res.render('index', {
    title: 'add',
  });
});

app.get('/get', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query("SELECT name, hands FROM rank", function(err, result) {
        console.log(result.rows);
      });
    }
  });
  res.render('index', {
    title: 'get',
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
