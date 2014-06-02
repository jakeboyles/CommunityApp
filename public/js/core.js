angular.module('scotchTodo', ['communityController','SigninController','SignupController', 'communityService','ngRoute'])

.config(function($routeProvider) {
$routeProvider
    .when('/', {
    controller:'mainController',
    templateUrl:'views/post.html'
    })
    .when('/signin', {
    controller:'signinController',
    templateUrl:'views/signin.html'
    })
    .when('/signup', {
    controller:'signupController',
    templateUrl:'views/signup.html'
    })
    .when('/projects/:projectid', {
    controller:'projectCtrl',
    templateUrl:'project.html'
    })
    .otherwise({
    redirectTo:'/'
    });
})

