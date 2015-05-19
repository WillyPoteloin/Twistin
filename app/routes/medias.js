var express = require('express');
var multer  = require('multer');
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');
var medias = require('../models/media');

var multerParser = multer({ dest: './uploads/'});

var jsonParser = bodyParser.json();

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

// on créer un media
router.post('/add', jsonParser, function(req, res, next) {
	medias.create(req.body.media, function (err, post) {		
		if (err) return next(err);
		res.json(post);
	});
});

// on met à jour un media
router.post('/update/:id', jsonParser, function(req, res, next) {
	medias.findByIdAndUpdate(req.params.id, { $set: {nom: req.body.media.nom, url: req.body.media.url}}, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

// on supprime un media
router.delete('/delete/:id', function(req, res, next) {
	medias.findByIdAndRemove(req.params.id, {}, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;