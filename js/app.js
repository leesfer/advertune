'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'firebase'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/landing_page.html',
		controller: 'LandingPageController'
	});
	$routeProvider.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController'
	});
	$routeProvider.when('/register', {
		templateUrl: 'partials/register.html',
		controller: 'AuthController'
	});
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'AuthController'
	});
	$routeProvider.when('/advertisers', {
		templateUrl: 'partials/advertisers.html',
		controller: 'advertiserController'
	});
	$routeProvider.when('/publishers', {
		templateUrl: 'partials/publishers.html',
		controller: 'publisherController'
	});
  	$routeProvider.otherwise({redirectTo: '/'});

  	// use the HTML5 History API
  	$locationProvider.html5Mode(true);
}]);
