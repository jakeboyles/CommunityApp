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




	});

