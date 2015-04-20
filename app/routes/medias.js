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

module.exports = router;