angular.module('communityController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, Communities) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Communities.get()
			.success(function(data) {
				$scope.posts = data;
				$scope.loading = false;
			});


		Communities.loggedIn()
			.success(function(data){
				if(data!="0") {
					$scope.user = data;
				}
			});





		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deletepost = function(id) {
			$scope.loading = true;

			Communities.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.posts = data; // assign our new list of todos
				}).
		    error(function(data, status, headers, config) {
		      alert(data)
		    });
		};
	});