const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  uses: {
    type: Number,
    required: true,
    default: 0,
  },
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
