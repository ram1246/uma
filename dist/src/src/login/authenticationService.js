define(function() {
    'user strict';
    var authenticationService = function ($firebaseAuth) {
        var self = this;

        var authObj = $firebaseAuth();

        self.logout = function() {
            authObj.$signOut()
            Session.destroy();
            $window.sessionStorage.removeItem("userInfo");
        };
    };

    authenticationService.$inject = ['$firebaseAuth'];
    return authenticationService;
});