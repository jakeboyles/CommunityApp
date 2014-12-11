angular.module('communityListController', ['angularMoment','infinite-scroll'])


	// inject the Todo service factory into our controller
	.controller('communityListController', function($scope,$rootScope,$location,$routeParams, $http, Communities) {
		$scope.loading = true;
		var communities = [];
		

		Communities.getCommunitys()
		.success(function(data) {
			for(i=0;i<data.length;i++) {
				communities.push(data[i]);
			}
			$scope.communities = communities;
			$scope.loading = false;
			setTimeout(function () {
				var container = document.querySelector('.listContain');
				var msnry = new Masonry( container, {
			 	 	itemSelector: '.item'
				});
			},400);
		});


	$scope.createcommunity = function() {
	$scope.loading = true;
	$scope.formData.images = images;
	// validate the formData to make sure that something is there
	// if form is empty, nothing will happen

		// call the create function from our service (returns a promise object)
		Communities.create($scope.formData)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				alert("added");
			});
};



	$scope.create = function() {

	// validate the formData to make sure that something is there
	// if form is empty, nothing will happen

		// call the create function from our service (returns a promise object)
		Communities.createCommunity($scope.formData)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				if(data!=="0") {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$location.url("/");
				} else {
					$scope.loading = false;
				}
			});
};




	});

