const PORT = 24680;

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: "13.209.8.64",
  user: "teamRedFan",
  password: "1234",
  database: "redFan"
})

app.post('/sign_up', function(req, res) {
  console.log("received json sign_in data from android application");

  var sql = "INSERT INTO users VALUES('" +
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


app.listen(PORT, function() {
  console.log("Middle Server is Running...")
});
