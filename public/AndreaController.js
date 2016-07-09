var app = angular.module('AppSearchBook', ['ngRoute']);
app.controller('searchController',['$scope', '$location', 'getFromServer', 'postToServer', 'saveData', function ($scope, $location, getFromServer, postToServer, saveData) {
	
	getFromServer("http://127.0.0.1:8080/backgroundimage").then(function(someData) {
		$scope.backgroundPhoto = someData.image;
		console.log($scope.backgroundPhoto);
	});

	$scope.quote = "You live only once, so make every moment a celebration";

	var initialDisplayText = getInitialDisplayText(saveData);
	console.log("initialDisplayText: " + initialDisplayText);

	$scope.bookToSearch = {
		text: initialDisplayText,
	};

	$scope.StartSearch = function()  {
		postToServer('http://127.0.0.1:8080/search', $scope.bookToSearch);
		console.log("bookName : " + $scope.bookToSearch.text);
		saveData.set($scope.bookToSearch.text);
		loadSearchResultsPage($location);
	};

	$scope.MonitorKeyStroke = function(keystroke) 
	{
		if(keystroke == 13)
		{
			$scope.StartSearch();
		}
	}
}]);

var loadSearchResultsPage = function(location) {
	location.path("/results");
}


var getInitialDisplayText = function(saveDataService)
{
	var defaultText = "Look the Book!!";
	var dataSaved = saveDataService.get();
	console.log("initialSaveData: " + dataSaved);
	
	if(!isEmpty(dataSaved)) {
		return dataSaved;
	}

	return defaultText;
}

function isEmpty(obj) {
    return (Object.getOwnPropertyNames(obj).length === 0);
}

app.factory('getFromServer',['$http', function($http) {
	return function(serverAddress) 
	{
		return $http.get(serverAddress).then(function Success(response) 
		{
			console.log("getFromServer " + response.data);
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
		console.log("postToServer: " + data);		
		return $http.post(serverAddress, data).then(function Success(response) {
		},
		function Error(err)
		{
			return err;
		});		
	}
}]);


app.factory('saveData', function() {
	var savedData = {};
	function set(data) {
		savedData = data;
	}
	function get() {
		return savedData;
	}
	return {
		set: set,
		get: get
	}
});

app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller:'searchController',
		templateUrl:'Views/FirstSearchPage.html'
	})
	.when('/results', {
		controller:'searchController',
		templateUrl:'Views/SearchResult.html'
	});
}]);