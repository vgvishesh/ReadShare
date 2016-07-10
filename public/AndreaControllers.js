app.controller('mainPageController',['$scope', '$location', 'getFromServer', 'saveData', function ($scope, $location, getFromServer, saveData) {
	
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

	$scope.OnSearch = function()  {
		console.log("bookName onSearch: " + $scope.bookToSearch.text);
		saveData.set($scope.bookToSearch.text);
		loadSearchResultsPage($location);
	};

	$scope.MonitorKeyStroke = function(keystroke) 
	{
		if(keystroke == 13)
		{
			$scope.OnSearch();
		}
	}
}]);

app.controller('searchController', ['$scope', '$location', 'postToServer', 'saveData', function ($scope, $location, postToServer, saveData) {

	var search = function() {
		if($scope.bookToSearch.text != GetDefaultDiplayText()) {
			postToServer('http://127.0.0.1:8080/search', $scope.bookToSearch);
			console.log("bookName being searched : " + $scope.bookToSearch.text);
		}
	}
	
	var initialDisplayText = getInitialDisplayText(saveData);
	console.log("initialDisplayText: " + initialDisplayText);

	$scope.bookToSearch = {
		text: initialDisplayText,
	};

	search();

	$scope.StartSearch = function() {
		search();		
	}	
}]);



var loadSearchResultsPage = function(location) {
	location.path("/results");
}

var getInitialDisplayText = function(saveDataService)
{
	var defaultText = GetDefaultDiplayText();
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

function GetDefaultDiplayText() {
	return "Look the Book!!";
}