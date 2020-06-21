const mongoose = require('mongoose');
const Video = require('./models/video');



const seedDB = () => {
  Video.create(
    {
      name: "Battleground Run Series",
      image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      description: "Staying healthy with this awesome running series",
  
    }, (err, video) => {
      if (err) {
        console.log(err);
      } else {
        console.log("NEWLY CREATED Video");
        console.log(video);
      }
    },
  );
  
  

};

module.exports = seedDB;
