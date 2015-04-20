var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var channels = require('../models/channel');

// on récupère toutes les chainnes
router.get('/', function(req, res, next) {
  channels.find(function (err, channels) {
    if (err) return next(err);
    res.json(channels);
  });
});

module.exports = router;