var app = angular.module('AppSearchBook', []);
app.controller('searchController',['$scope','getFromServer', 'postToServer', function ($scope, getFromServer, postToServer) {
	
	getFromServer("http://127.0.0.1:8080/backgroundimage").then(function(someData) {
		$scope.backgroundPhoto = someData.image;
		console.log($scope.backgroundPhoto);
	});

	$scope.quote = "You live only once, so make every moment a celebration";

	$scope.bookToSearch = {
		text: "Look the Book!!",
	};

	$scope.StartSearch = function(value)  {
		//console.log($scope.bookToSearch);
		postToServer('http://127.0.0.1:8080/search', $scope.bookToSearch);
	};
}]);

app.factory('getFromServer',['$http', function($http) {
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

app.factory('postToServer', ['$http', function($http) {
	return function (serverAddress, data)
	{
		console.log(data);		
		return $http.post(serverAddress, data).then(function Success(response) 
		{
		},
		function Error(err)
		{
			return err;
		});		
	}
}]);