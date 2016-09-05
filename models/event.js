var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String }, 
  registrationUrl: { type: String },
  type: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);