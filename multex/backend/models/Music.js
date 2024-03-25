const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;