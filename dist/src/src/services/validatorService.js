define(function () {
    'user strict';
    var validatorSerice = function () {
        var self = this;
        self.isValidJson = function (jsonObj) {
            return jsonObj && typeof jsonObj === "object" ? true : false;
        };

        self.isValidFunction = function (functionToTest) {
            return functionToTest instanceof Function;
        };
    };
    validatorSerice.$inject = [];
    return validatorSerice;
});