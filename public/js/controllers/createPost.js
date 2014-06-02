angular.module('PostController', [])

	// inject the Todo service factory into our controller
	.controller('postController', function($scope, $http, Communities,$location) {
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
							$location.url("/");
						} else {
							$scope.loading = false;
						}
					});
		};
		});

