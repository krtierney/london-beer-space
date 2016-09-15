var router = require('express').Router();
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

var eventsController = require('../controllers/events');
var authController = require('../controllers/authentications');
var facebookController = require('../controllers/facebookOauth');
var twitterController = require('../controllers/twitterOauth');

var upload = require('./upload');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized'});

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: 'Unauthorized' });

    req.user = payload;
    next();
  });
}


router.route('/events')
  .get(eventsController.index)
  .post(secureRoute, upload.single('image'), eventsController.create);

router.route('/events/:id')
  .get(eventsController.show)
  .put(secureRoute, upload.single('image'), eventsController.update)
  .patch(secureRoute, upload.single('image'), eventsController.update)
  .delete(secureRoute, eventsController.delete)
  .post(secureRoute, upload.single('image'),eventsController.create);

router.post('/user/update', secureRoute, authController.updateDetails);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/oauth/facebook', facebookController.login);
router.post('/oauth/twitter', twitterController.login);

module.exports = router;