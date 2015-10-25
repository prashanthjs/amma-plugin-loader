import Hapi = require('hapi');
import Code = require('code');
import Lab = require('lab');
import Sinon = require('sinon');

let TestSampleModule = require('./test-sample-module');
let SuccessSampleModule = require('./test-sample-module/success-run');
let FailureSampleModule = require('./test-sample-module/failure-run');

let lab = exports.lab = Lab.script(),
  before = lab.before,
  beforeEach = lab.beforeEach,
  afterEach = lab.afterEach,
  after = lab.after,
  expect = Code.expect,
  suite = lab.suite,
  test = lab.test;

suite('Plugin Loader', () => {
  let server = new Hapi.Server();
  server.connection({ port: 15000 });
  test('Load file', (next) => {
    server.register({ register: TestSampleModule }, function(err) {
      expect(err).to.equal(undefined);
      next();
    });
  });
  test('Load services', (next) => {
    expect(server.plugins['test-sample-module'].testController).to.be.exist();
    next();
  });
  test('Load routes', (next) => {
    let table = server.table();
    expect(table).to.have.length(1);

    let options: any = {
      method: 'GET',
      url: '/test'
    };
    server.inject(options, (response) => {
      let result = response.result;
      expect(response.statusCode).to.equal(200);
      expect(result).to.be.empty();
      return next();
    });
  });
  suite('Load runs', () => {
    test('Load success run', (next) => {
      let server = new Hapi.Server();
      server.register({ register: SuccessSampleModule }, function(err) {
        expect(err).to.equal(undefined);
        next();
      });
    });
    test('Load failure run', (next) => {
      let server = new Hapi.Server();
      server.register({ register: FailureSampleModule }, function(err) {
        expect(err).to.be.exist();
        next();
      });
    });
  });



  suite('Load object paths', () => {
    test('Load handler is not a string', (next) => {
      var func = Sinon.spy();
      var result = TestSampleModule.getParsedObject(func);
      expect(result).to.be.equal(func);
      next();
    });

    test('string but not literal', (next) => {
      var func = 'test';
      var result = TestSampleModule.getParsedObject(func);
      expect(result).to.be.equal(func);
      next();
    });

    test('string literal but not a valid path', (next) => {
      var func = '%test%';
      var result = TestSampleModule.getParsedObject(func);
      expect(result).to.be.equal(func);
      next();
    });
  });

});
