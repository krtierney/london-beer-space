var Event = require('../models/event');

function eventIndex(req, res) {

  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  Event.find({ date: { $gte: today }})
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

  req.body.createdBy = req.user._id;

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
      if (req.user._id !== event.createdBy && !req.user.isAdmin) {
        var e = new Error("Unauthorized");
        e.name = "AuthorizationError";

        throw e;
      }

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

      if(err.name && err.name === "AuthorizationError") {
        return res.status(401).json(err);
      }

      if(err.name && err.name === "ValidationError") {
        return res.status(400).json(err);
      }

      console.log("eventUpdateError: ", err);
      return res.status(500).json(err);
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