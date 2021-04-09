const express = require('express')
const Instagram = require('instagram-web-api')
const bodyParser = require('body-parser')

const { username, password } = process.env
const client = new Instagram({ username, password })

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {

  const $_hashtag = req.query.hashtag ? req.query.hashtag : null;
  const $_profile = req.query.profile ? req.query.profile : null;
  let response;

  (async function() {

    if($_profile) {
      await client.login()
      response = await client.getUserByUsername({ username: $_profile })
    } else if($_hashtag) {
      response = await client.getMediaFeedByHashtag({ hashtag: $_hashtag })
    } else {
      response = {hi: "use hashtag or profile params on url."}
    }

    res.send(response)
  })()

});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log('server runnnig');
});