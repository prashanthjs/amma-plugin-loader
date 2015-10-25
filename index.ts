import Hapi = require('hapi');
import Hoek = require('hoek');
import _ = require('lodash');
import Items = require('items');
import ObjectPath = require('object-path');

export interface IListener{
  type: string;
  method: any;
}

export interface IConfig {
  options?: Object;
  services?: Object;

  routes?: any[];
  listeners?:IListener[];
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

  constructor(_config: IConfig) {
    this._config = _config;
    this.register.attributes = this._config.attributes;
  }

  register: IRegister = (server, options, next) => {
    server.bind(this);
    this._server = server;
    this._config = Hoek.merge(this._config, options);
    this._server.expose('config', this._config);
    this._loadServices();
    this._loadRoutes();
    this._loadListeners();
    return this._loadCallbacks(next);
  }

  protected _loadServices(): void {
    let services = this._config.services;
    _.forEach(services, (Service: IService, key: string) => {
      let classObject = new Service(this._server);
      _.bindAll(classObject);
      this._server.expose(key, classObject);
    });
  }

  protected _loadRoutes(): void {
    let routes = this._config.routes;
    if (routes && routes.length) {
      for (let i = 0; i < routes.length; i++) {
        routes[i].config.handler = this.getParsedObject(routes[i].config.handler);
      }
      this._config.routes = routes;
      this._server.route(routes);
    }
  }

  protected _loadListeners(): void {
    let listeners = this._config.listeners;
    if (listeners && listeners.length) {
      for (let i = 0; i < listeners.length; i++) {
        let listener:IListener = listeners[i];
        listener.method = this.getParsedObject(listener.method);
        this._server.ext(listener.type, listener.method);
      }
    }
  }

  protected _loadCallbacks(next: (error?: any, result?: any) => any): any {
    let runArray = this._config.runs;
    this._server.expose('config', this._config);
    if (runArray && runArray.length) {
      for (let i = 0; i < runArray.length; i++) {
        runArray[i] = this.getParsedObject(runArray[i]);
      }
      this._config.runs = runArray;
      this._server.expose('config', this._config);
      return Items.serial(runArray, (item: any, done: (error?: any, result?: any) => any) => {
        return item(done);
      }, (error?: any) => {
          if (error) {
            return next(error);
          }
          return next();
        });
    } else {
      return next();
    }
  }

  getParsedObject(handler: any): any {
    if (typeof handler === 'string' && this.isArgumentAService(handler)) {
      let serviceString = this.getFilteredArgument(handler);
      if (ObjectPath.has(this._server, serviceString)) {
        return ObjectPath.get(this._server, serviceString);
      }
    }
    return handler;
  }

  getFilteredArgument(argumentId: string): string {
    return argumentId.replace(/%/g, '');
  }

  isArgumentAService(arg: string): boolean {
    if ((/^%[^%]+%$/.test(arg))) {
      return true;
    }
    return false;
  }

}
