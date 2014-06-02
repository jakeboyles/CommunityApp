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


		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createpost = function() {
			$scope.loading = true;

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen

				// call the create function from our service (returns a promise object)
				Communities.create($scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						if(data!=="0") {
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.posts = data; // assign our new list of todos
						} else {
							$scope.loading = false;
							alert("Sign In");
						}
					});
		};




		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteCommunity = function(id) {
			$scope.loading = true;

			Communities.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.commmunities = data; // assign our new list of todos
				}).
		    error(function(data, status, headers, config) {
		      alert(data)
		    });
		};
	});