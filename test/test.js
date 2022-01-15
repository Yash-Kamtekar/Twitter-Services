//Anusha Gangasani

//START

// Anusha Gangasani

const Twit = require("twit");
const { response } = require("express");
const request = require("supertest");
const app = require("../app");
//const expect = require('chai').expect;

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_API_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

describe('Check Home Page', () => {
  test("Checking home page with get method", done => {
    request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('Adding new Tweet', () => {
  test("Adding tweet via post method", done => {
    var objJson = {
      tweet_text: "Tweet Added while Unit Testing"
    };
    request(app).post('/new/' + objJson.tweet_text).then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});


describe('Deleting Tweet', () => {
  test("Deleting tweet via post method.", done => {
    var objJson = {
      id: "1442351518800179201"
    };
    request(app).post('/delete/' + objJson.id).then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});


//END

// RAJ PARAGBHAI KINKHABWALA


// This test is regarding recent tweeets being called.
describe("Testing that the tweets are getting from user timeline", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});


describe("Check the Statuscode for destroyTweet API with invalid id", () => {
  test("it should response with GET method", done => {
    request(app).
      get("/delete/abc").then(res => {
        expect(res.statusCode).toBe(404);
        done();
      });
  });
});

// END - RAJ PARAGBHAI KINKHABWALA

// START - YASH KAMTEKAR

describe("Check postTweet API working with tweet as a parameter", () => {
  test("it should response with post method", done => {
    request(app).post("/new/hello").then(res => {
      expect(res.statusCode).toBe(200);
      done();
    })
  })
})

describe("Check postTweet API working with tweet as a parameter", () => {
  test("it should response with GET method", done => {
    request(app).get("/new/hello").then(res => {
      expect(res.statusCode).toBe(404);
      done();
    })
  })
})

describe("Check the Statuscode for destroyTweet API with invalid id", () => {
  test("it should response with post method", done => {
    request(app).
      post("/delete/abc").then(res => {
        expect(JSON.parse(res.text).error.statusCode).toBe(404);
        done();
      });
  });
});

// END - YASH KAMTEKAR

