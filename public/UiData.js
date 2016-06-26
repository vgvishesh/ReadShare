var app = angular.module('AppSearchBook', []);
app.controller('searchController',['$scope','talkToServer', function ($scope, talkToServer) {
	
	talkToServer("http://127.0.0.1:8080/backgroundimage").then(function(someData) {
		$scope.backgroundPhoto = someData.image;
		console.log($scope.backgroundPhoto);
	});

	$scope.quote = "You live only once, so make every moment a celebration";

	$scope.bookToSearch = "Look the Book!!";

	$scope.StartSearch = function(value)  {
		console.log(value);
	};
}]);

app.factory('talkToServer',['$http', function($http) {
	return function(serverAddress) 
	{
		return $http.get(serverAddress).then(function Success(response) 
		{
			console.log(response.data);
			return response.data;
		}, 
		function Error(err) 
		{
			console.log(err);			
			return err;
		});
	}
}]);