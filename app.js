var express = require('express');
var app = express();

var environment = app.get('env');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.PORT || 3000;
var routes = require('./config/routes');
var databaseUri = require('./config/db')(environment);

mongoose.Promise = bluebird;
mongoose.connect(databaseUri);

if('test' !== environment) {
  app.use(require('morgan')('dev'));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.use(express.static('public'));

app.listen(port, function() {
  console.log('express on port ' + port)
});

module.exports = app;