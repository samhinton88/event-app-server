const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  image: { type: Buffer, contentType: String},
  title: String,
  venue: String,
  time: Date,
  text: String,
  interestedUsers: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

module.exports = mongoose.model('event',eventSchema);
