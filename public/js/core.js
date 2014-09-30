angular.module('scotchTodo', ['communityController','communitySearch','communityListController','SearchController','ProfileController','SinglePostController','SigninController','PostController','SignupController', 'communityService','ngRoute'])

.config(function($routeProvider) {
$routeProvider
    .when('/post/:postid', {
    controller:'getPostController',
    templateUrl:'views/post.html'
    })
    .when('/community/:communityid', {
    controller:'mainController',
    templateUrl:'views/list.html'
    })
    .when('/community/create', {
    controller:'mainController',
    templateUrl:'views/list.html'
    })
    .when('/community/search/:zip', {
    controller:'communitySearch',
    templateUrl:'views/searchCommunity.html'
    })
    .when('/profile/edit', {
    controller:'signupController',
    templateUrl:'views/editprofile.html'
    })
    .when('/profile/:profileid', {
    controller:'profileController',
    templateUrl:'views/profile.html'
    })
    .when('/signin', {
    controller:'signinController',
    templateUrl:'views/signin.html'
    })
    .when('/search/:query', {
    controller:'SearchController',
    templateUrl:'views/search.html'
    })
    .when('/signup', {
    controller:'signupController',
    templateUrl:'views/signup.html'
    })
    .when('/create', {
    controller:'postController',
    templateUrl:'views/createPost.html'
    })
    .when('/create', {
    controller:'communityListController',
    templateUrl:'views/create_community.html'
    })
    .when('/', {
    controller:'mainController',
    templateUrl:'views/home.html'
    })
    .otherwise({
    redirectTo:'/'
    });
})

