'use strict';

/* Services */

angular.module('myApp.services', [])
	// .value('FIREBASE_URL', 'https://waitandeat-elias.firebaseio.com')
	.factory('FIREBASE_URL', function() {
		return 'https://waitandeat-elias.firebaseio.com/';
	})

	.factory('dataService', function($firebase, FIREBASE_URL){

		var dataRef = new Firebase(FIREBASE_URL);
		var fireData = $firebase(dataRef);

		return fireData;

	})

	.factory('advertiserService', function(dataService) {

		var advertisers = dataService.$child('advertisers');

		var advertiserServiceObject = {
			saveAdvertiser: function(advertiser) {
				advertisers.$add(party);
			}
		};

		return partyServiceObject;

	})

	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {

		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);
		var emails = dataService.$child('emails');

		var authServiceObject = {
			register: function(user) {
				auth.$createUser(user.email, user.password).then(function(data){
					console.log(data);
					authServiceObject.login(user, function() {
						emails.$add({email: user.email});
					});
				});
			},
			login: function(user, optionalCallback) {
				auth.$login('password', user).then(function(data){
					console.log(data);
					
					if (optionalCallback) {
						optionalCallback();
					}

					// Redirect to waitlist page
					$location.path('/waitlist');
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

		$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
			// Save currentUser on our rootScope
			$rootScope.currentUser = user;
		});

		$rootScope.$on('$firebaseSimpleLogin:logout', function() {
			// Save currentUser on our rootScope as null
			$rootScope.currentUser = null;
		});

		return authServiceObject;

	});