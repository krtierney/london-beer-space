var Event = require('../models/event');

function eventIndex(req, res) {
  Event.find()
    .then(function(events) {
      res.status(200).json(events)
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
}

function eventCreate(req, res) {
  Event.create(req.body)
    .then(function(event) {
      return Event.findById(event._id);
    })
    .then(function(event) {
      res.status(201).json(event);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

function eventShow(req, res) {
  Event.findById(req.params.id)
    .then(function(event) {
      res.status(200).json(event);
    })
    .catch(function(err) {
      res.status(500).json(err);
      // Will this work?
      res.status(404).json({ message: "Sorry, that event couldn't be found" });
    });
}

function eventUpdate(req, res) {
  Event.findById(req.params.id)
    .then(function(event) {
      // if (req.user._id !== event.user) res.send(401)
      for(key in req.body) event[key] = req.body[key];
        // how to insert runValidators: true in here?
      return event.save();
    })
    .then(function(event) {
      return Event.findById(event._id);
    })
    .then(function(event) {
      res.status(200).json(event);
    })
    .catch(function(err) {
      console.log(err);
      // should this be a 400 error?
      res.status(500).json(err);
    });
}

function eventDelete(req, res) {
  Event.findById(req.params.id)
    .then(function(event) {
      return event.remove();
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
}

module.exports = {
  index: eventIndex,
  create: eventCreate,
  show: eventShow,
  update: eventUpdate,
  delete: eventDelete
}