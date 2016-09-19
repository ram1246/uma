define(function() {
    'user strict';
    var session = function() {

        var self = this;

        self.create = function (user) {
            this.user = user;
            this.userRole = user.userRole;
            self.user = user;
        };
        self.destroy = function () {
            this.user = null;
            this.userRole = null;
        };
    };

    session.$inject = [];
    return session;
});