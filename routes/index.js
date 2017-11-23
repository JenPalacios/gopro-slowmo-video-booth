const express = require('express');
const functions = require('./../src/video.js');

const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/record', functions.videoSession);

module.exports = router;
