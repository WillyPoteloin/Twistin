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
angular.module('app', ['ngRoute', 'formly', 'formlyBootstrap', 'angularFileUpload']);

var app = angular.module('app');

app.value('keyword', '');
var app = angular.module('app');

app.controller('channels', function ($scope, $http, $routeParams, $location, FileUploader) {

	// model d'une chaine
	$scope.channel = {
		nom: '',
		description: '',
		url: '',
		media: '',
		img: '',
		followerSource: 0,
		followerTwistin: 0,
		nbRefus: 0,
		dateAjout: '',
		dateMaj: '',
	};

	// on déclare une variable sur le scope pour récupérer l'upload d'une image pour la chaine
	$scope.uploader = new FileUploader({
		url: '/upload'
	});

	$scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
	};
	$scope.uploader.onAfterAddingFile = function(fileItem) {
		$scope.uploader.uploadItem(fileItem);
	};
	$scope.uploader.onBeforeUploadItem = function(item) {
	};
	$scope.uploader.onProgressItem = function(fileItem, progress) {
	};
	$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
		if(response == 'nok') {

		}
		else if(response.path !== undefined) {
			var file = response;
			$scope.channel.img = file.path.replace('public/', '');
		}
	};

	// on regarde si on est sur une chaine en particulier avec la route
	if($routeParams.id != undefined) {
		// on doit trouver la chaine en base
		$http.get('/channels/'+$routeParams.id).
		success(function(data, status, headers, config) {
			$scope.channel = data;
		}).
		error(function(data, status, headers, config){
		});
	}

	$scope.getAll = function(callback) {	
		// on appel l'API pour récupérer les chaines
		$http.get('/channels').
		success(function(data, status, headers, config) {
			$scope.channels = data;
			callback();
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		if($scope.form.$invalid) return false;
		$http.post('/channels/add', {channel: $scope.channel}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'une chaine
			$scope.channel = {
				nom: '',
				description: '',
				url: '',
				media: '',
				img: '',
				followerSource: 0,
				followerTwistin: 0,
				nbRefus: 0,
				dateAjout: '',
				dateMaj: '',
			};
			$location.path('/channels');
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'une chaine
			$scope.channel = {
				nom: '',
				description: '',
				url: '',
				media: '',
				img: '',
				followerSource: 0,
				followerTwistin: 0,
				nbRefus: 0,
				dateAjout: '',
				dateMaj: '',
			};
		});
	};
	$scope.update = function() {
		if($scope.form.$invalid) return false;
		$http.post('/channels/update/'+$scope.channel._id, {media: $scope.channel}).
		success(function(data, status, headers, config) {
			$location.path('/channels');
		}).
		error(function(data, status, headers, config) {
		});
	};
	$scope.delete = function() {
		if($scope.channel._id != undefined) {
			$http.delete('/channels/delete/'+$scope.channel._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'une chaine
				$scope.channel = {
					nom: '',
					description: '',
					url: '',
					media: '',
					img: '',
					followerSource: 0,
					followerTwistin: 0,
					nbRefus: 0,
					dateAjout: '',
					dateMaj: '',
				};
				$location.path('/medias');
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'une chaine
				$scope.channel = {
					nom: '',
					description: '',
					url: '',
					media: '',
					img: '',
					followerSource: 0,
					followerTwistin: 0,
					nbRefus: 0,
					dateAjout: '',
					dateMaj: '',
				};
			});
		}
	};
	$scope.imgDelete = function(){
		$scope.channel.img = '';
	};

	// on doit récupérer tous les chaines en base
	$scope.channels = $scope.getAll(function() {

		// liste des champs pour le formulaire d'une chaine
		$scope.fields = [];
	});

});
var app = angular.module('app');

app.controller('medias', function ($scope, $http, $routeParams, $location, FileUploader) {

	// model d'un média
	$scope.media = {
		nom: '',
		url: '',
		img: '',
		nbChaine: 0
	};

	// on déclare une variable sur le scope pour récupérer l'upload d'une image pour le média
	$scope.uploader = new FileUploader({
		url: '/upload'
	});

	$scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
	};
	$scope.uploader.onAfterAddingFile = function(fileItem) {
		$scope.uploader.uploadItem(fileItem);
	};
	$scope.uploader.onBeforeUploadItem = function(item) {
	};
	$scope.uploader.onProgressItem = function(fileItem, progress) {
	};
	$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
	};
	$scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
		if(response == 'nok') {

		}
		else if(response.path !== undefined) {
			var file = response;
			$scope.media.img = file.path.replace('public/', '');
		}
	};

	// on regarde si on est sur un media en particulier avec la route
	if($routeParams.id != undefined) {
		// on doit trouver le media en base
		$http.get('/medias/'+$routeParams.id).
		success(function(data, status, headers, config) {
			$scope.media = data;
		}).
		error(function(data, status, headers, config){
		});
	}

	$scope.getAll = function(callback) {	
		// on appel l'API pour récupérer les medias
		$http.get('/medias').
		success(function(data, status, headers, config) {
			$scope.medias = data;
			callback();
		}).
		error(function(data, status, headers, config) {
		});
	};

	$scope.add = function() {
		if($scope.form.$invalid) return false;
		$http.post('/medias/add', {media: $scope.media}).
		success(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.media.nom = '';
			$scope.media.url = '';
			$scope.media.img = '';
			$scope.media.nbChaine = 0;
			$location.path('/medias');
		}).
		error(function(data, status, headers, config) {
			// on vide l'objet pour l'ajout d'un média
			$scope.media.nom = '';
			$scope.media.url = '';
			$scope.media.img = '';
			$scope.media.nbChaine = 0;
		});
	};
	$scope.update = function() {
		if($scope.form.$invalid) return false;
		$http.post('/medias/update/'+$scope.media._id, {media: $scope.media}).
		success(function(data, status, headers, config) {
			$location.path('/medias');
		}).
		error(function(data, status, headers, config) {
		});
	};
	$scope.delete = function() {
		if($scope.media._id != undefined) {
			$http.delete('/medias/delete/'+$scope.media._id).
			success(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.media._id = undefined;
				$scope.media.nom = '';
				$scope.media.url = '';
				$scope.media.img = '';
				$scope.media.nbChaine = 0;
				$location.path('/medias');
			}).
			error(function(data, status, headers, config) {
				// on vide l'objet pour l'ajout d'un média
				$scope.media._id = undefined;
				$scope.media.nom = '';
				$scope.media.url = '';
				$scope.media.img = '';
				$scope.media.nbChaine = 0;
			});
		}
	};
	$scope.imgDelete = function(){
		$scope.media.img = '';
	};

	// on doit récupérer tous les medias en base
	$scope.medias = $scope.getAll(function() {

		// liste des champs pour le formulaire d'un média
		$scope.fields = [
			{
				type: 'input',
				key: 'nom',
				templateOptions: {
					label: 'Nom du média',
					placeholder: 'Youtube'
				},
				validators: {
					notEmpty: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return value !== '';
					},
					isUnique: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						// On parcours chaque média pour voir si le nom existe déjà
						var test = true;
						$.each($scope.medias, function(index, val) {
							if(val.nom == value && val._id != $scope.media._id) {
								test = false;
								return;
							}
						});

						return test;
					}
				}
			},
			{
				type: 'input',
				key: 'url',
				templateOptions: {
					label: 'Site du média',
					placeholder: 'https://youtube.com'
				},
				validators: {
					notEmpty: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						return value !== '';
					},
					isUrl: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						// Vérifier que l'url est bien une url
						var regexUrl = /^https?\:\/\/.*\..{2,4}$/;
						if(value.match(regexUrl) !== null) {
							return true;
						}
						else {
							return false;
						}
					},
					isUnique: function($viewValue, $modelValue, scope) {
						var value = $modelValue || $viewValue;
						// On parcours chaque média pour voir si le nom existe déjà
						var test = true;
						$.each($scope.medias, function(index, val) {
							if(val.url == value && val._id != $scope.media._id) {
								test = false;
								return;
							}
						});

						return test;
					}
				}
			}
		];
	});

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
		templateUrl: 'manager/views/media.html'})
	.when('/medias/:id', {
		templateUrl: 'manager/views/media.html'})
	.when('/channels', {
		templateUrl: 'manager/views/channels.html'})
	.when('/channels/add', {
		templateUrl: 'manager/views/channel.html'})
	.when('/channels/:id', {
		templateUrl: 'manager/views/channel.html'})
	.when('/404', {
		templateUrl: 'manager/views/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});

	// $locationProvider.html5Mode(true);
});

//# sourceMappingURL=manager.js.map