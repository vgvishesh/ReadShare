var app = angular.module('AppSearchBook', []);
app.controller('searchController',['$scope', function($scope) {
	
	$scope.backgroundPhoto = "Images/read3.jpg";

	$scope.quote = "You live only once, so make every moment a celebration";

	$scope.bookToSearch = "Look the Book!!";

	$scope.StartSearch = function(value)  {
		console.log(value);
	};
}]);