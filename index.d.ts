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
