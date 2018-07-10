const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  venue: String,
  time: Date,
  text: String,
  interestedUsers: [{type: Schema.Types.ObjectId, ref: 'user'}],
  cloudinaryUrl: String
})

module.exports = mongoose.model('event',eventSchema);
