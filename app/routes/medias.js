var express = require('express');
var multer  = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var router = express.Router();

var mongoose = require('mongoose');
var medias = require('../models/media');

var multerParser = multer({ dest: './public/uploads/'});
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
	// on regarde si le média a une image et si celle ci est encore dans le dossier d'upload
	if(req.body.media.img !== undefined && /uploads/.test(req.body.media.img)) {
		var oldPath = './public/'+req.body.media.img;
		// on doit extraire l'extension de fichier de l'image
		var ext = req.body.media.img.lastIndexOf('.');
		ext = req.body.media.img.slice(ext+1);
		// on doit déplacer et renommer l'image et la supprimer du dossier d'upload
		req.body.media.img = '/images/media/'+req.params.id+'.'+ext;
		fs.rename(oldPath, './public/'+req.body.media.img, function(error) {
			if(error) throw error;
		});
	}
	medias.create(req.body.media, function (err, post) {		
		if (err) return next(err);
		res.json(post);
	});
});

// on met à jour un media
router.post('/update/:id', jsonParser, function(req, res, next) {
	// on regarde si le média a une image et si celle ci est encore dans le dossier d'upload
	if(req.body.media.img !== undefined && /uploads/.test(req.body.media.img)) {
		var oldPath = './public/'+req.body.media.img;
		// on doit extraire l'extension de fichier de l'image
		var ext = req.body.media.img.lastIndexOf('.');
		ext = req.body.media.img.slice(ext+1);
		// on doit déplacer et renommer l'image et la supprimer du dossier d'upload
		req.body.media.img = '/images/media/'+req.params.id+'.'+ext;
		fs.rename(oldPath, './public/'+req.body.media.img, function(error) {
			if(error) throw error;
		});
	}
	medias.findByIdAndUpdate(req.params.id, { $set: {nom: req.body.media.nom, url: req.body.media.url, img: req.body.media.img}}, function (err, post) {
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