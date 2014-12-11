angular.module('communitySearch', ['angularMoment','infinite-scroll'])


	// inject the Todo service factory into our controller
	.controller('communitySearch', function($scope,$rootScope,$location,$routeParams, $http, Communities) {

		$scope.loading = true;
		var communities = [];
		var posts = [];


		var data = {
			id:$routeParams.zip,
		}

		$scope.zipcode = $routeParams.zip;
		

		Communities.getCommunitys(data)
		.success(function(data) {
			for(i=0;i<data.community.length;i++) {
				communities.push(data.community[i]);
			}

			for(i=0;i<data.posts.length;i++) {
				for(j=0;j<data.posts[i].length;j++){
				posts.push(data.posts[i][j]);
				}
			}

			console.log(JSON.stringify(posts));

			$scope.posts = posts;
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
	// validate the formData to make sure that something is there
	// if form is empty, nothing will happen

		// call the create function from our service (returns a promise object)
		Communities.newCommunity($scope.formData)
			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				$location.url("/");
			});
};




	});

