angular.module('communityService', [])
// super simple service
// each function returns a promise object 
.factory('Communities', function($http) {
return {
	get : function(page) {
	return $http.post('/api/posts/page',page);
	},
	getPost : function(id) {
	return $http.get('/api/posts/'+ id);
	},
	create : function(todoData) {
	return $http.post('/api/posts', todoData);
	},
	newCommunity : function(todoData) {
	return $http.post('/api/communities/add', todoData);
	},
	delete : function(id) {
	return $http.delete('/api/posts/' + id);
	},
	postSignUp: function(data) {
		return $http.post('/api/signup',data);
	},
	postSignIn: function(data) {
		return $http.post('/login',data);
	},
	getCommunitys: function(data) {
		return $http.post('/api/communities',data);
	},
	loggedIn: function(data) {
		return $http.get('/login');
	},
	deleteMessage: function(data) {
		return $http.delete('api/message/'+data);
	},
	readMessage: function(data) {
		return $http.put('api/message',data);
	},
	editUser: function(data) {
		return $http.post('/api/editProfile',data);
	},
	getProfile: function(data) {
		return $http.get('/api/profile/'+ data);
	},
	postComment: function(data) {
		return $http.post('/api/comment',data);
	},
	getComments: function(data) {
		return $http.post('/api/allComments',data);
	},
	acceptOffer:function(data) {
		return $http.post('/api/acceptOffer',data);
	},
	postMessage:function(data) {
		return $http.post('/api/message',data);
	},
	getMessage:function() {
		return $http.get('/api/message');
	},
	getSearch:function(data) {
		return $http.post('/api/search',data);
	}
}
});