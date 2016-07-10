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
			console.log("response from server " + response.data);
			return response.data;
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
