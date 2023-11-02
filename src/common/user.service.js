(function () {
    angular.module('public')
      .service('UserService', UserService);
  
    function UserService() {
      var userInfo = null;
      var favoriteDish = '';
  
      this.setUser = function (user) {
        userInfo = user;
        favoriteDish = user.favoriteDish;
      };
  
      this.getUserInfo = function () {
        return userInfo;
      };
  
      this.getUserFavoriteDish = function () {
        return favoriteDish;
      };
    }
  })();
  