var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var medias = require('../models/media');

// récupération de tous les medias
router.get('/', function(req, res, next) {
	medias.find(function (err, medias) {
		if (err) return next(err);
		res.json(medias);
	});
});

// on récupère un media par son id
router.get('/:id', function(req, res, next) {
	medias.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;