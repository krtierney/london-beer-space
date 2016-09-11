var User = require('../models/user');
var request = require('request-promise');
var jwt = require('jsonwebtoken');
var qs = require('qs');
var secret = require('../config/tokens').secret;

function login(req, res) {
  if (!req.body.oauth_token || !req.body.oauth_verifier) {

    return request.post({
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_SECRET_KEY,
        callback: req.body.redirectUri
      },
      json: true
    }).then(function(body) {
        var token = qs.parse(body);
        res.status(200).send(token);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json(err);
      });

  } else {
    return request.post({ 
      url: "https://api.twitter.com/oauth/access_token",
      form: {
        oauth_token: req.body.oauth_token,
        oauth_verifier: req.body.oauth_verifier
       }
      })
      .then(function(token) {
        var token = qs.parse(token);

        return request.get({
          url: "https://api.twitter.com/1.1/users/show.json",
          qs: { screen_name: token.screen_name },
          oauth: {
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_SECRET_KEY,
            oauth_token: token.oauth_token
          },
          json: true
        });
      })
      .then(function(profile) {
        return User.findOne({ twitterID: profile.id })
        .then(function(user) {
          if(user) {
            user.twitterID = profile.id;
            user.avatar = profile.profile_image_url;
          } else {
            user = new User({
              username: profile.name,
              twitterID: profile.id,
              avatar: profile.profile_image_url
            });
          }

          return user.save();
        });
      })
      .then(function(user) {
        var payload = {
          _id: user._id,
          username: user.username,
          avatar: user.avatar
        };

        var token = jwt.sign(payload, secret, { expiresIn: '24h' });

        res.status(200).json({ token: token });
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports = {
  login: login
}