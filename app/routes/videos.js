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

// on récupère une vidéo par son id
router.get('/:id', function(req, res, next) {
	videos.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;