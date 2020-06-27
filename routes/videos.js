const express = require("express");
const Video = require("../models/video");

const router = express.Router();

router.get("/videos", (req, res) => {
  Video.find({}, (err, allVideos) => {
    if (err) {
      console.log(err);
    } else {
      res.locals.title = "The Battleground";
      res.render("videos/index", { videos: allVideos });
    }
  });
});

module.exports = router;
