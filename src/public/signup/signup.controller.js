(function () {
    'use strict';
  
    angular.module('public')
      .controller('SignupController', SignupController);
  
    SignupController.$inject = ['$scope', '$http', 'UserService'];
    function SignupController($scope, $http, UserService) {
      $scope.submitForm = function () {
        if ($scope.signupForm.$valid) {
          var user = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            contact: $scope.user.contact,
            favoriteDish: $scope.user.favoriteDish
          };
  
          var dishCode = user.favoriteDish;
  
          var categoryCode = dishCode.match(/[a-zA-Z]+/)[0];
          var menuNumber = dishCode.match(/\d+/)[0] - 1;
  
          $http
            .get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryCode}/menu_items/${menuNumber}.json`)
            .then(function (response) {
              if (response.data === null) {
                $scope.favoriteDishError = 'No such menu number exists';
              } else {
                UserService.setUser(user);
                $scope.favoriteDishError = null;
                
                $scope.user.firstname = '';
                $scope.user.lastname = '';
                $scope.user.email = '';
                $scope.user.contact = '';
                $scope.user.favoriteDish = '';
                $scope.signupForm.$setPristine();
                $scope.signupForm.$setUntouched();
                alert("Menu successfully registered");

              }
            });
        }
      };
    }
  })();
  