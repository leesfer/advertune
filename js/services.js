'use strict';

/* Services */

angular.module('myApp.services', [])

	.factory('FIREBASE_URL', function() {
		return 'https://advertune.firebaseio.com/';
	})

	.factory('dataService', function($firebase, FIREBASE_URL){

		var dataRef = new Firebase(FIREBASE_URL);
		var fireData = $firebase(dataRef);

		return fireData;

	})

	.factory('advertiserService', function(dataService) {

		var advertisersDb = dataService.$child('advertisers');

		var advertiserServiceObject = {
			saveAdvertiser: function(advertiser) {
				advertisersDb.$add(advertiser);
			}
		};

		return advertiserServiceObject;

	})

	.factory('publisherService', function(dataService) {

		var publishersDb = dataService.$child('publishers');

		var publisherServiceObject = {
			savePublisher: function(publisher) {
				publishersDb.$add(publisher);
			}
		};

		return publisherServiceObject;

	})

	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {

		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);
		var emails = dataService.$child('emails');

		var authServiceObject = {
			register: function(userAdv) {
				auth.$createUser(userAdv.email, userAdv.password).then(function(data){
					console.log(data);
					authServiceObject.login(userAdv, function() {
						emails.$add({email: userAdv.email});
					});
				});
			},
			login: function(userAdv, optionalCallback) {
				auth.$login('password', userAdv).then(function(data){
					console.log(data);
					
					if (optionalCallback) {
						optionalCallback();
					}

					// Redirect to waitlist page
					$location.path('/dashboard');
				});
			},
			logout: function() {
				auth.$logout();
				// Redirect to landing page
				$location.path('/');
			},
			getCurrentUser: function() {
				return auth.$getCurrentUser();
			}
		};

		$rootScope.$on('$firebaseSimpleLogin:login', function(e, userAdv) {
			// Save currentUser on our rootScope
			$rootScope.currentUser = userAdv;
		});

		$rootScope.$on('$firebaseSimpleLogin:logout', function() {
			// Save currentUser on our rootScope as null
			$rootScope.currentUser = null;
		});

		return authServiceObject;

	});