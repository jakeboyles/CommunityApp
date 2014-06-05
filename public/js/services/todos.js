angular.module('communityService', [])
// super simple service
// each function returns a promise object 
.factory('Communities', function($http) {
return {
	get : function() {
	return $http.get('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/posts');
	},
	getPost : function(id) {
	return $http.get('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/posts/'+ id);
	},
	create : function(todoData) {
	return $http.post('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/posts', todoData);
	},
	delete : function(id) {
	return $http.delete('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/posts/' + id);
	},
	postSignUp: function(data) {
		return $http.post('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/signup',data);
	},
	postSignIn: function(data) {
		return $http.post('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/login',data);
	},
	loggedIn: function(data) {
		return $http.get('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/login');
	},
	postComment: function(data) {
		return $http.post('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/comment',data);
	},
	getComments: function(data) {
		return $http.post('http://ec2-107-23-32-67.compute-1.amazonaws.com:8080/api/allComments',data);
	}
}
});