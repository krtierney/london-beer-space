var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

function register(req, res) {
  User.create(req.body, function(err, user) {
    if(err) return res.status(400).json(err);

    var payload = { _id: user._id, username: user.username, isAdmin: user.isAdmin };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*12 });

    return res.status(200).json({
      message: "Thanks for registering!",
      token: token
    });
  });
}

function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) res.send(500).json(err);
    if(!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Incorrect email address or password" });
    }

    var payload = { _id: user._id, username: user.username, isAdmin: user.isAdmin };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*12 });
    
    return res.status(200).json({ 
      message: "Login successful",
      token: token
    });
  });
}

function updateDetails(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err) res.send(500).json(err);
    if(!user || !user.validatePassword(req.body.oldPassword)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.email = user.email || req.body.email;
    user.password = req.body.newPassword;
    user.passwordConfirmation = req.body.passwordConfirmation;

    return user.save();
  })
  .then(function(user) {
    res.status(200).json(user);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
}

module.exports = {
  register: register,
  login: login,
  updateDetails: updateDetails
}