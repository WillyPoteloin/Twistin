var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var videos = require('../models/video');

// récupération de toutes les vidéos
router.get('/', function(req, res, next) {
  videos.find(function (err, videos) {
    if (err) return next(err);
    res.json(videos);
  });
});

module.exports = router;