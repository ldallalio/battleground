const express = require('express');

const router = express.Router();

router.get('/videos', (req, res) => {
    res.render('videos/index');
});




module.exports = router;