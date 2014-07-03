angular.module('SearchController', ['angularMoment'])


	// inject the Todo service factory into our controller
	.controller('SearchController', function($scope,$rootScope,$routeParams,$location, $http, Communities) {
		$scope.formData = {};
		$scope.loading = true;

		var query = $routeParams.query;


	var search = {
	 	query:query,
	 };

		Communities.getSearch(search)
		.success(function(data){
			$scope.posts = data.results;
			$scope.loading = false;
			setTimeout(function () {
				var container = document.querySelector('.listContain');
				var msnry = new Masonry( container, {
			 	 	itemSelector: '.item'
				});
			},100);
		})

	});
		




