/// <reference path="./typings/bluebird/bluebird.d.ts" />
/// <reference path="./typings/del/del.d.ts" />
/// <reference path="./typings/dts-bundle/dts-bundle.d.ts" />
/// <reference path="./typings/glob/glob.d.ts" />
/// <reference path="./typings/gulp-nodemon/gulp-nodemon.d.ts" />
/// <reference path="./typings/gulp/gulp.d.ts" />
/// <reference path="./typings/hapi/hapi.d.ts" />
/// <reference path="./typings/lodash/lodash.d.ts" />
/// <reference path="./typings/minimatch/minimatch.d.ts" />
/// <reference path="./typings/missing.d.ts" />
/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/object-path/object-path.d.ts" />
/// <reference path="./typings/orchestrator/orchestrator.d.ts" />
/// <reference path="./typings/q/Q.d.ts" />
/// <reference path="./typings/sinon/sinon.d.ts" />
declare module 'amma-plugin-loader/index' {
	import Hapi = require('hapi');
	export interface IConfig {
	    options?: Object;
	    services?: Object;
	    routes?: any[];
	    runs?: any[];
	    attributes: Object;
	}
	export interface IService {
	    (server?: Hapi.Server): void;
	}
	export interface IRegister {
	    (server: Hapi.Server, options: any, next: (error?: any, result?: any) => any): void;
	    attributes?: any;
	}
	export interface IPluginLoader {
	    register: IRegister;
	    getParsedObject(handler: any): any;
	    getFilteredArgument(argumentId: string): string;
	    isArgumentAService(arg: string): boolean;
	}
	export default class PluginLoader implements IPluginLoader {
	    protected _server: Hapi.Server;
	    protected _config: IConfig;
	    constructor(_config: IConfig);
	    register: IRegister;
	    protected _loadServices(): void;
	    protected _loadRoutes(): void;
	    protected _loadCallbacks(next: (error?: any, result?: any) => any): any;
	    getParsedObject(handler: any): any;
	    getFilteredArgument(argumentId: string): string;
	    isArgumentAService(arg: string): boolean;
	}

}
declare module 'amma-plugin-loader/test/unit-testing/test-sample-module/controller' {
	import Hapi = require('hapi');
	export default class TestController {
	    test(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response;
	    successRun(next: any): any;
	    failureRun(next: any): any;
	}

}
declare module 'amma-plugin-loader/test/unit-testing/test-sample-module/failure-run' {
	import Plugin = require('amma-plugin-loader/index'); let plugin: Plugin.IPluginLoader;
	export = plugin;

}
declare module 'amma-plugin-loader/test/unit-testing/test-sample-module/index' {
	import Plugin = require('amma-plugin-loader/index'); let plugin: Plugin.IPluginLoader;
	export = plugin;

}
declare module 'amma-plugin-loader/test/unit-testing/test-sample-module/success-run' {
	import Plugin = require('amma-plugin-loader/index'); let plugin: Plugin.IPluginLoader;
	export = plugin;

}
declare module 'amma-plugin-loader' {
	import main = require('amma-plugin-loader/index');
	export = main;
}
