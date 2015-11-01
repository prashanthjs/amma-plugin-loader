var TestController = (function () {
    function TestController() {
    }

    TestController.prototype.test = function (request, reply) {
        return reply({});
    };
    TestController.prototype.successRun = function (next) {
        return next();
    };
    TestController.prototype.failureRun = function (next) {
        return next('error');
    };
    return TestController;
})();
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = TestController;
