var User = require('../models/user');
var request = require('request-promise');
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

function login(req, res) {
  request.post({
    url: "https://graph.facebook.com/v2.5/oauth/access_token",
    qs: {
      client_id: process.env.FACEBOOK_API_KEY,
      client_secret: process.env.FACEBOOK_SECRET_KEY,
      code: req.body.code,
      redirect_uri: req.headers.origin + "/"
    },
    json: true
  }).then(function(access_token) {
    return request.get({
      url: "https://graph.facebook.com/v2.5/me?fields=id,email,name,picture",
      qs: access_token,
      json: true
    });
  }).then(function(profile) {
    return User.findOne({ email: profile.email })
      .then(function(user) {
        if(user) {
          user.facebookID = profile.id;
          user.avatar = profile.picture ? profile.picture.data.url : null;
        }
        else {
          user = new User({
            username: profile.login,
            email: profile.email,
            facebookID: profile.id,
            avatar: profile.avatar
          });
        }

        return user.save();
      })
  })
  .then(function(user) {
    var payload = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar
    };

    var token = jwt.sign(payload, secret, { expiresIn: '24h'});

    res.status(200).json({ token: token });

  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = {
  login: login
}