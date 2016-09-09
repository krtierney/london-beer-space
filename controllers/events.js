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

  if(req.file) req.body.image = req.file.key;

  Event.create(req.body)
    .then(function(event) {
      return Event.findById(event._id);
    })
    .then(function(event) {
      res.status(201).json(event);
    })
    .catch(function(err) {
      if(err.name && err.name === "ValidationError") {
        res.status(400).json(err);
      } else {
        console.log("eventCreateError: ", err);
        res.status(500).json(err);
      }
    });
}

function eventShow(req, res) {
  Event.findById(req.params.id)
    .then(function(event) {
      if(!event) res.status(404).json({ message: "Sorry, that event couldn't be found" });
      res.status(200).json(event);
    })
    .catch(function(err) {
      res.status(500).json(err);      
    });
}

function eventUpdate(req, res) {

  if(req.file) req.body.image = req.file.key;

  Event.findById(req.params.id)
    .then(function(event) {
      // if (req.user._id !== event.user) res.send(401)
      for(key in req.body) event[key] = req.body[key];
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
      if(err.name && err.name === "ValidationError") {
        res.status(400).json(err);
      } else {
        console.log("eventUpdateError: ", err);
        res.status(500).json(err);
      }
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