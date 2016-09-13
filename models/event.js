var mongoose = require('mongoose');
var s3 = require('../config/s3');

var eventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String }, 
  registrationUrl: { type: String },
  type: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

eventSchema.path('image')
  .get(function(image) {
    return s3.endpoint.href + "london-beer-space/" + image;
  })
  .set(function(image) {
    return image.split('/').splice(-1)[0];
  });

eventSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Event', eventSchema);