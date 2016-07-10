var app = angular.module('AppSearchBook', ['ngRoute']);

app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller:'mainPageController',
		templateUrl:'Views/FirstSearchPage.html'
	})
	.when('/results', {
		controller:'searchController',
		templateUrl:'Views/SearchResult.html'
	});
}]);