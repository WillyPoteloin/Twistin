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

app.controller('medias', function ($scope, $http, $routeParams) {

	$scope.getAll = function() {	
		// on appel l'API pour récupérer les medias
		$http.get('/medias').
		success(function(data, status, headers, config) {
			$scope.medias = data;
			// on regarde si on est sur un média
			if($routeParams.id != undefined) {
				// on doit trouver le media dans le tableau de media
				$.each($scope.medias, function(index, val) {
					if($routeParams.id === val._id) {
						$scope.mediaCurrent = val;
					}
				});
			}
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		$http.post('/medias/add', {media: $scope.mediaToAdd}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.mediaToAdd.nom = '';
			$scope.mediaToAdd.url = '';
			$scope.mediaToAdd.nbChaine = 0;
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.mediaToAdd.nom = '';
			$scope.mediaToAdd.url = '';
			$scope.mediaToAdd.nbChaine = 0;
		});

	};
	$scope.edit = function() {
		
	};
	$scope.delete = function() {
		if($scope.mediaCurrent._id != undefined) {
			$http.delete('/medias/delete/'+$scope.mediaCurrent._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.mediaCurrent._id = undefined;
				$scope.mediaCurrent.nom = '';
				$scope.mediaCurrent.url = '';
				$scope.mediaCurrent.nbChaine = 0;
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.mediaCurrent._id = undefined;
				$scope.mediaCurrent.nom = '';
				$scope.mediaCurrent.url = '';
				$scope.mediaCurrent.nbChaine = 0;
			});

		}
	};

	// objet pour l'édition d'un média
	$scope.mediaCurrent = {
		nom: '',
		url: '',
		nbChaine: 0
	};

	// objet pour l'ajout d'un média
	$scope.mediaToAdd = {
		nom: '',
		url: '',
		nbChaine: 0
	};

	// on doit récupérer tous les medias en base
	$scope.medias = $scope.getAll();
});
var app = angular.module('app');

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'manager/views/home.html'
	})
	.when('/home', {
		redirectTo: '/'})
	.when('/medias', {
		templateUrl: 'manager/views/medias.html'})
	.when('/medias/add', {
		templateUrl: 'manager/views/add_medias.html'})
	.when('/medias/:id', {
		templateUrl: 'manager/views/media.html'})
	.when('/404', {
		templateUrl: 'manager/views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	// $locationProvider.html5Mode(true);
});

//# sourceMappingURL=manager.js.map