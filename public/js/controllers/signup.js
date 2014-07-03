angular.module('SignupController', ['angularFileUpload'])

// inject the Todo service factory into our controller
.controller('signupController', function($scope,$rootScope,$upload, $http, Communities,$location) {

	var profilePicture;

	$scope.signup = function() {
		$scope.signupData.profilepic = profilePicture;
		Communities.postSignUp($scope.signupData)
		.success(function(data){
			$rootScope.user = data;
			$location.url("/");
		}).
		error(function(data){
			var n = notyfy({
			text: data,
			timeout: 3000,
			type: 'error',
		});
		})
		
	}

	$scope.edit = function() {
		var userEdit = $scope.user;
		Communities.editUser(userEdit)
		.success(function(data){
			var n = notyfy({
			text: "Profile Updated",
			timeout: 3000,
			type: 'success',
		})
		});
		
	}


$scope.onProfileEdit = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
      var $file = $files[0];
      $upload.upload({
        url: 'post/image',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
      	var str = data.data;
      	str = str.replace(/"/g, "");
      	profilePicture = str;
        $scope.user.profilepicture = str;
        scope.$digest();
      }); 
    
 }


$scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
      var $file = $files[0];
      $upload.upload({
        url: 'post/image',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
      	var str = data.data;
      	str = str.replace(/"/g, "");
      	profilePicture = str;
        $scope.image = str;
        scope.$digest();
      }); 
    
 }


});