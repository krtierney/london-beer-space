var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  location: { type: String },
  image: { type: String }, 
  registrationUrl: { type: String },
  type: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);