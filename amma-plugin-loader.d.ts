declare module 'amma-plugin-loader/index' {
	import Hapi = require('hapi');
	export interface IListener {
	    type: string;
	    method: any;
	}
	export interface IConfig {
	    options?: Object;
	    services?: Object;
	    routes?: any[];
	    listeners?: IListener[];
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
	    protected _loadListeners(): void;
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
