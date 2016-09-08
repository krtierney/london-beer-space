var Event = require('../models/event');

function eventIndex(req, res) {
  Event.find(function(err, event) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(event);
  });
}

function eventCreate(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) return res.status(400).json(err);
    return res.status(201).json(event);
  });
}

function eventShow(req, res) {
  Event.findById(req.params.id, function(err, event) {
    if(err) return res.status(500).json(err);
    if(!event) return res.status(404).json({ message: "Sorry, that event couldn't be found" });
    return res.status(200).json(event);
  });
}

function eventUpdate(req, res) {
  Event.findByIdAndUpdate(req.params.id, req.body, {

    // secure route to only allow user who created it?
    // if(req.user._id !== event.user) res.send(401)
    new: true, runValidators: true }, function(err, event) {
      if(err) return res.status(400).json(err);
      return res.status(200).json(event);
  });
}

function eventDelete(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: eventIndex,
  create: eventCreate,
  show: eventShow,
  update: eventUpdate,
  delete: eventDelete
}