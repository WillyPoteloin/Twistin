var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var channels = require(__dirname + '/app/models/channel.js');

/* GET /channelss listing. */
router.get('/', function(req, res, next) {
  channels.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

module.exports = router;