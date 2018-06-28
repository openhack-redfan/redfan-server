var express = require('express');
var app = express();
const PORT = 2468;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/sign_up', function(req, res) {
  console.log("received json sign_in data from android application");
  // res.send
  // DB insert하기
})


app.listen(PORT, function() {
  console.log("Middle Server is Running...")
});
