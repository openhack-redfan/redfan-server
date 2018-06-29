/* port number */
const PORT = 24680;

var doAsync = require('./senti/index.js')

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
  sql = "SELECT * FROM users WHERE userId = '" + req.body.userId + "' AND userPw = '" + req.body.userPw + "'";
  dbConnection.query(sql, function(err, row) {
    if(row.length > 0) res.json({"result":"true"});
    else res.json({"result":"false"});
  });
});

app.post('/channels_info', function(req, res) {
    var retObj = new Object();
    // sql = "SELECT * FROM channels WHERE channelUrl IN (SELECT channelURL FROM users WHERE userId = '" + "test2@test.com" + "')"
    sql = "SELECT * FROM channels WHERE channelUrl IN (SELECT channelURL FROM users WHERE userId = '" + req.body.userId + "')"

    dbConnection.query(sql, function(err, row) {
      retObj.channel = row[0];

      sql = "SELECT * FROM videos WHERE videoChannelId IN (SELECT channelId FROM channels WHERE channelUrl = '" + retObj.channel.channelUrl + "')";
      dbConnection.query(sql, function(err, row) {
        retObj.videos = row;
        /* 채널 정보와 비디오 정보를 함께 res */
        res.json(retObj);
      });
    });
});

app.post('/comments_info', function(req, res) {
    /* 코멘트는 하나의 비디오에 달린 여러개의 비디오 로드 */
    // req.body.videoId -------
    sql = "SELECT * FROM comments WHERE videoId IN (SELECT videoId FROM videos WHERE videoId = '" + req.body.videoId + "')";
    let commentPerVideo = [];
    dbConnection.query(sql, function(err, row) {
      for(let elem of row)
        commentPerVideo.push(elem.commentText);
      // res.send(commentPerVideo);
      console.log(doAsync(commentPerVideo));
    });
});

app.listen(PORT, function() {
  console.log("Middle Server is Running...");
});
