import Hapi = require('hapi');

export default class TestController {
  public test(request: Hapi.Request, reply: Hapi.IReply) {
    return reply({});
  }
  public successRun(next) {
    return next();
  }
  public failureRun(next) {
    return next('error');
  }
}
