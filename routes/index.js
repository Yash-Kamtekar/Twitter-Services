const { json } = require('express');
var express = require('express');
var Twit = require('twit');
require('dotenv').config()

var router = express.Router();

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_API_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

// START - RAJ PARAGBHAI KINKHABWALA
// This function is specifically to sort data from the api
var sort_data = (data_arr, required_cols = []) => {
  var new_arr = []
  data_arr.map(data => {
    var new_data = {}
    required_cols.map(col => {
      new_data[col] = data[col];

    })
    new_arr.push(new_data);
  })

  return new_arr;
}
// This function is to display the front page
router.get('/', function (req, res, next) {
  // console.log(req.query);
  // console.log("Query Param = ", req.query["twitter_screen_name"]);

  let params = { screen_name: req.query["twitter_screen_name"] };
  // Using twitter api i am bring data over there.
  T.get("statuses/user_timeline", params, function (err, tweets, response) {

    //let data_source = sort_data(tweets, ["id","text"]);
    if (!err)
      res.render('index', { title: 'express', tweets: tweets });
    else
      res.json({ status: 0, error: err })

  });
  //console.log(data);
});

// This is a post request which is deleting the tweet online.
router.post('/delete/:id', function (req, res, next) {

  console.log(req.params.id);
  let params = { id: req.params.id };

  T.post("statuses/destroy", params, function (err, data, response) {
    if (!err)
      res.json({ status: 1, data: { id: data.id, timeStamp: data.created_id } })
    else
      res.json({ status: 0, error: err })
  });
})
// END - RAJ PARAGBHAI KINKHABWALA

// START - YASH KAMTEKAR
// This helps in creating new tweets in twitter.
router.post('/new/:tweet', function (req, res) {
  let data = { status: req.params.tweet };
  T.post('statuses/update', data, function (err, data, response) {
    if (!err)
      res.json({ status: 1, data: { id: data.id, timeStamp: data.created_id } })
    else
      res.json({ status: 0, error: err })
  })
});
// END - YASH KAMTEKAR
module.exports = router;
