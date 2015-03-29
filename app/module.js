angular.module('twistin', []);
angular.module('twistin').config(['$controllerProvider', function($controllerProvider) {
  $controllerProvider.allowGlobals();
}]);