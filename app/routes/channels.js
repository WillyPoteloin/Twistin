var express = require('express');
var multer  = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var router = express.Router();

var mongoose = require('mongoose');
var channels = require('../models/channel');

var multerParser = multer({ dest: './public/uploads/'});
var jsonParser = bodyParser.json();

// on récupère toutes les chainnes
router.get('/', function(req, res, next) {
	channels.find(function (err, channels) {
		if (err) return next(err);
		res.json(channels);
	});
});

// on récupère une chaine par son id
router.get('/:id', function(req, res, next) {
	channels.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

// on créer une chaine
router.post('/add', jsonParser, function(req, res, next) {
	// on regarde si la chaine a une image et si celle ci est encore dans le dossier d'upload
	if(req.body.channel.img !== undefined && /uploads/.test(req.body.channel.img)) {
		var oldPath = './public/'+req.body.channel.img;
		// on doit extraire l'extension de fichier de l'image
		var ext = req.body.channel.img.lastIndexOf('.');
		ext = req.body.channel.img.slice(ext+1);
		// on doit déplacer et renommer l'image et la supprimer du dossier d'upload
		req.body.channel.img = '/images/channel/'+req.params.id+'.'+ext;
		fs.rename(oldPath, './public/'+req.body.channel.img, function(error) {
			if(error) throw error;
		});
	}
	medias.create(req.body.channel, function (err, post) {		
		if (err) return next(err);
		res.json(post);
	});
});

// on supprime une chaine
router.delete('/delete/:id', function(req, res, next) {
	medias.findByIdAndRemove(req.params.id, {}, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;