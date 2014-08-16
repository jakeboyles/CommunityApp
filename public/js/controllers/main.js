angular.module('communityController', ['angularMoment','infinite-scroll','stellar.directives'])


	// inject the Todo service factory into our controller
	.controller('mainController', function($scope,$rootScope,$location,$routeParams, $http, Communities,stellar) {
		$scope.formData = {};
		$scope.loading = true;
		var posts = [];
		var number = 0;
		$scope.posts = [];
		var page = {number:number};
		var noMore = false;

		var community = {
			com:$routeParams.communityid,
		}
		 stellar.against(window);

		$rootScope.location = $location.path();

		Communities.get(community)
		.success(function(data) {
			for(i=0;i<data.posts.length;i++) {
				posts.push(data.posts[i]);
			}
			$rootScope.communityinfo = data.Community[0];
			$scope.posts = posts;
			$scope.loading = false;
			setTimeout(function () {
				var container = document.querySelector('.listContain');
				var msnry = new Masonry( container, {
			 	 	itemSelector: '.item'
				});
			},800);
		});

		$scope.searchZip = function() {
			var zip = $scope.zip;
			$location.path('/community/search/'+zip)
		}

		Communities.loggedIn()
		.success(function(data){
			$rootScope.user = data;
		}).
		error(function(data){
			$location.url("/signin")
		})

		$scope.searchButton = function() {
		 $location.url("/search/"+$scope.search);
		 $(".search").hide();
		}


		$scope.showSearch = function() {
			$(".search").toggle();
		}


		$scope.init = function() {
			$( document ).ready(function() {
				var height = $(".ng-scope").height()-65;
				$('.header').css('height',height);
			})
		}


		if(typeof $rootScope.user!=="undefined") {
			if(!$rootScope.user.error) {
				Communities.getMessage()
				.success(function(data){
					$rootScope.messages = data;
				})
			} 
		}
		


		$scope.showMessageBox = function() {
			$('#viewModal').modal();
		}

		$scope.deleteMessage = function(id){
			Communities.deleteMessage(id)
			.success(function(data){
				Communities.getMessage()
				.success(function(data){
					$rootScope.messages = data;
					var n = notyfy({
						text: 'Message Deleted',
						timeout: 3000,
						type: 'success',
					});
				})
			})
		}
	
		$scope.showMessage = function(message) {
			$(".messages").hide();
			$(".backButton").show();
			$scope.oneMessage = message;
			$(".singleMessage").show();
			Communities.readMessage(message)
			.success(function(data){
				Communities.getMessage()
				.success(function(data){
					$rootScope.messages = data;
				})
			})
		}

		$scope.viewMessages = function() {
			$('#viewModal').modal();
			$(".backButton").hide();
			$(".singleMessage").hide();
			$(".messages").show();
		}


    	$scope.menuClick = function() {
			$(".mobileNav").toggle();
    	}

    	$scope.init();


	});

