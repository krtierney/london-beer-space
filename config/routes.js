var router = require('express').Router();
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

var eventsController = require('../controllers/events');
var authController = require('../controllers/authentications');
var facebookController = require('../controllers/facebookOauth');
var twitterController = require('../controllers/twitterOauth');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Please log in before accessing this resource'});

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: 'Unauthorized' });

    req.user = payload;
    next();
  });
}


router.route('/events')
  .get(eventsController.index)
  .post(secureRoute, eventsController.create);

router.route('/events/:id')
  .get(eventsController.show)
  .put(secureRoute, eventsController.update)
  .patch(secureRoute, eventsController.update)
  .delete(secureRoute, eventsController.delete);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/oauth/facebook', facebookController.login);
router.post('/oauth/twitter', twitterController.login);

module.exports = router;