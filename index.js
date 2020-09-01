const express = require("express");
const app = express();
const db = require('./db');

app.get('/', function(req, res) {
  let dt = new Date();
  dt.setHours(dt.getHours() + 9);
  console.log('日時', dt.toString());
  console.log('日時', dt.toLocaleString());
  res.send('OK');
});

app.get('/create', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log('connect error', err);
    } else {
      client.query("CREATE TABLE Rank(id SERIAL,hands INTEGER NOT NULL,name VARCHAR(10) NOT NULL,level INTEGER NOT NULL,PRIMARY KEY(id))", function(err, result) {
        console.log('err', err);
        console.log('result', result);
      });
    }
  });
  res.send('OK');
});

app.get('/add', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log('connect error', err);
    } else {
      client.query("INSERT INTO Rank (hands, name, level) VALUES (10, 'taro', 2)", function(err, result) {
        console.log('err', err);
        console.log('result.rows', result.rows);
      });
    }
  });
  res.send('OK');
});

app.get('/get', function(req, res) {
  db.pool.connect((err, client) => {
    if (err) {
      console.log('connect error', err);
    } else {
      client.query("SELECT name, hands FROM rank", function(err, result) {
        console.log('err', err);
        console.log('result.rows', result.rows);
      });
    }
  });
  res.send('OK');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
