const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  idThematic: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('thematic', postSchema);