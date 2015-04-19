(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
angular.module('app', ['ngRoute']);

var app = angular.module('app');

app.value('keyword', '');
var app = angular.module('app');

app.controller('channels', function ($scope) {
	$scope.channels = [
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Fail Army',
			image: 'images/failarmy.png',
			url: '',
			description: 'La chaine Fail Army',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
		{
			name: 'Maxime Musqua',
			image: 'images/musqua.jpg',
			url: '',
			description: 'Les vidéos de Maxime Musqua.',
		},
	];

	$scope.selectedChannels = [];

	$scope.addChannelToSelection = function(channel) {
		$scope.selectedChannels.push(channel);
	};

	// Ajout d'un channel
	$scope.add = function(channel) {
		$scope.channels.push(channel);
	};

	// Suppression d'un channel
	$scope.remove = function(channel) {
		var index = $scope.channels.indexOf(channel);
		$scope.channels.splice(index, 1);
	};

	// Récupération des liens des vidéos d'un channel
	$scope.getLinks = function(channel) {
	};

});
var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
	nom: String,
	description: String,
	urlSource: String,
	media: mongoose.Schema.Types.ObjectId,
	followerSource: Number,
	followerTwistin: Number,
	nbRefus: Number,
	dateMaj: { type: Date, default: Date.now },
	dateAjout: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Channel', channelSchema);
var app = angular.module('app');

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home.html'
	})
	.when('/home', {
		redirectTo: '/'	})
	.when('/404', {
		templateUrl: 'views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	// $locationProvider.html5Mode(true);
});
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var channels = require('../models/channel');

/* GET /channelss listing. */
router.get('/', function(req, res, next) {
  channels.find(function (err, channels) {
    if (err) return next(err);
    res.json(channels);
  });
});

module.exports = router;

//# sourceMappingURL=app.js.map