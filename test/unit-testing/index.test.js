var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Sinon = require('sinon');
var TestSampleModule = require('./test-sample-module');
var SuccessSampleModule = require('./test-sample-module/success-run');
var FailureSampleModule = require('./test-sample-module/failure-run');
var lab = exports.lab = Lab.script(), before = lab.before, beforeEach = lab.beforeEach, afterEach = lab.afterEach, after = lab.after, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Plugin Loader', function () {
    var server = new Hapi.Server();
    server.connection({port: 15000});
    test('Load file', function (next) {
        server.register({register: TestSampleModule}, function (err) {
            expect(err).to.equal(undefined);
            next();
        });
    });
    test('Load services', function (next) {
        expect(server.plugins['test-sample-module'].testController).to.be.exist();
        next();
    });
    test('Load routes', function (next) {
        var table = server.table();
        expect(table).to.have.length(1);
        var options = {
            method: 'GET',
            url: '/test'
        };
        server.inject(options, function (response) {
            var result = response.result;
            expect(response.statusCode).to.equal(200);
            expect(result).to.be.empty();
            return next();
        });
    });
    suite('Load runs', function () {
        test('Load success run', function (next) {
            var server = new Hapi.Server();
            server.register({register: SuccessSampleModule}, function (err) {
                expect(err).to.equal(undefined);
                next();
            });
        });
        test('Load failure run', function (next) {
            var server = new Hapi.Server();
            server.register({register: FailureSampleModule}, function (err) {
                expect(err).to.be.exist();
                next();
            });
        });
    });
    suite('Load object paths', function () {
        test('Load handler is not a string', function (next) {
            var func = Sinon.spy();
            var result = TestSampleModule.getParsedObject(func);
            expect(result).to.be.equal(func);
            next();
        });
        test('string but not literal', function (next) {
            var func = 'test';
            var result = TestSampleModule.getParsedObject(func);
            expect(result).to.be.equal(func);
            next();
        });
        test('string literal but not a valid path', function (next) {
            var func = '%test%';
            var result = TestSampleModule.getParsedObject(func);
            expect(result).to.be.equal(func);
            next();
        });
    });
});
