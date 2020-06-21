const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  video: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Video", videoSchema);
