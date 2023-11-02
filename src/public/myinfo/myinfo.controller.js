(function () {
    angular.module('public')
      .controller('MyInfoController', MyInfoController);
  
    MyInfoController.$inject = ['UserService', '$http'];
    function MyInfoController(UserService, $http) {
      var $ctrl = this;
  
      $ctrl.userInfo = UserService.getUserInfo();
      $ctrl.favoriteDishItem = null;
  
      if ($ctrl.userInfo) {
        var user = $ctrl.userInfo;
        var favoriteDish = user.favoriteDish;
  
        var categoryCode = favoriteDish.match(/[a-zA-Z]+/)[0];
        var menuNumber = favoriteDish.match(/\d+/)[0] - 1;
        $ctrl.categoryCode = categoryCode;
        $http
          .get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryCode}/menu_items/${menuNumber}.json`)
          .then(function (response) {
            $ctrl.favoriteDishItem = response.data;
          });
      }
    }
  })();
  
  