var router = require('express').Router();
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

var eventsController = require('../controllers/events');
var authController = require('../controllers/authentications');

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
  .post(secureRoute)
  .post(eventsController.create);

router.route('/events/:id')
  .get(eventsController.show)
  .put(secureRoute)
  .put(eventsController.update)
  .patch(secureRoute)
  .patch(eventsController.update)
  .delete(secureRoute)
  .delete(eventsController.delete);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;