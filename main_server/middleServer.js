/* port number */
const PORT = 24680;

/* express module */
var express = require('express');
var app = express();

/* body-parser */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/* database module */
var mysql = require('mysql'), sql,
  dbConnection = mysql.createConnection({
  host: "13.209.8.64",
  user: "teamRedFan",
  password: "1234",
  database: "redFan"
});

app.post('/sign_up', function(req, res) {
  console.log("received json sign_in data from android application");
  sql = "SELECT * FROM users WHERE userId = '"  + req.body.userId + "'";
  console.log(sql);
  dbConnection.query(sql, function(err, row) {
    if(row.length == 0) {
      sql = "INSERT INTO users VALUES('" +
                req.body.userId + "','" +
                req.body.userPw + "','" +
                req.body.userName + "','" +
                req.body.channelUrl +
                "')";

      dbConnection.query(sql, function(err, row) {
        if(err) console.log("error occur");
        console.log("true");
        res.json({"result":"true"});
      });
    } else {
      console.log("false")
      res.json({"result":"false"});
    }
  });

});

app.post('/sign_in', function(req, res) {
  sql = 'SELECT '
});

/* 결론 : userId만 전달되면 모든 정보를 참조할 수 있도록 sql query 작성해야 함 */
app.post('/channels_info', function(req, res) {
    /* 채널은 하나의 tuple만 로드 */
    sql = "SELECT * FROM channels";
    dbConnection.query(sql, function(err, row) {
      if(err) console.log("error occur");
      res.json(row[0]);
    });
});

app.post('/videos_info', function(req, res) {
    /* 비디오는 하나의 채널에 달린 여러개의 비디오 로드 */
    sql = "SELECT * FROM videos";
    dbConnection.query(sql, function(err, row) {
      if(err) console.log("error occur");
      res.json(row);
    });
});

app.post('/comments_info', function(req, res) {
    /* 코멘트는 하나의 비디오에 달린 여러개의 비디오 로드 */
    sql = "SELECT * FROM comments";
    dbConnection.query(sql, function(err, row) {
      if(err) console.log("error occur");
      res.json(row);
    });
});

app.listen(PORT, function() {
  console.log("Middle Server is Running...");
});
