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

  sql = "INSERT INTO users VALUES('" +
            req.body.userId + "','" +
            req.body.userPw + "','" +
            req.body.userName + "','" +
            req.body.channelUrl +
            "')";

  dbConnection.query(sql, function(err, row) {
    if(err) throw err;

    /* duplicate 정보가 들어왔을 때 (회원 아이디 중복시 예외처리 필요) */
    res.send("inserted user information into databases successfully\n");
  });
});

/* android 단으로부터 요청 받는 라우터 골격 */
app.post('/channels_info', function(req, res) {
    sql = "SELECT * FROM channels";
    // 
    // res.json({
    //   abc : "asdf"
    //
    // });

});

app.post('/videos_info', function(req, res) {
    sql = "SELECT * FROM videos";

});

app.post('/comments_info', function(req, res) {
    sql = "SELECT * FROM comments";
});

app.listen(PORT, function() {
  console.log("Middle Server is Running...")
});
