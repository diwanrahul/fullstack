const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  originalFilename: String,
  originalSize: Number,
  compressedSize: Number,
  compressedPath: String, // for now local filesystem path
}, { timestamps: true });

module.exports = mongoose.model('ImageRecord', imageSchema);
