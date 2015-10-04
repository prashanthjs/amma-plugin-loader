import Hapi = require('hapi');
export default class TestController {
    test(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response;
    successRun(next: any): any;
    failureRun(next: any): any;
}
