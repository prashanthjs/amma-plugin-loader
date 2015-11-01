var Hoek = require('hoek');
var _ = require('lodash');
var Items = require('items');
var ObjectPath = require('object-path');
var PluginLoader = (function () {
    function PluginLoader(_config) {
        var _this = this;
        this.register = function (server, options, next) {
            server.bind(_this);
            _this._server = server;
            _this._config = Hoek.merge(_this._config, options);
            _this._server.expose('config', _this._config);
            _this._loadServices();
            _this._loadCallbacks(function (err) {
                if(err){
                    next(err);
                }
                else {
                    _this._loadListeners();
                    _this._loadRoutes();
                    next();
                }
            });
        };
        this._config = _config;
        this.register.attributes = this._config.attributes;
    }

    PluginLoader.prototype._loadServices = function () {
        var _this = this;
        var services = this._config.services;
        _.forEach(services, function (Service, key) {
            var classObject = new Service(_this._server);
            _.bindAll(classObject);
            _this._server.expose(key, classObject);
        });
    };
    PluginLoader.prototype._loadRoutes = function () {
        var routes = this._config.routes;
        if (routes && routes.length) {
            for (var i = 0; i < routes.length; i++) {
                routes[i].config.handler = this.getParsedObject(routes[i].config.handler);
            }
            this._config.routes = routes;
            this._server.route(routes);
        }
    };
    PluginLoader.prototype._loadListeners = function () {
        var listeners = this._config.listeners;
        if (listeners && listeners.length) {
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener.method = this.getParsedObject(listener.method);
                this._server.ext(listener.type, listener.method);
            }
        }
    };
    PluginLoader.prototype._loadCallbacks = function (next) {
        var runArray = this._config.runs;
        this._server.expose('config', this._config);
        if (runArray && runArray.length) {
            for (var i = 0; i < runArray.length; i++) {
                runArray[i] = this.getParsedObject(runArray[i]);
            }
            this._config.runs = runArray;
            this._server.expose('config', this._config);
            return Items.serial(runArray, function (item, done) {
                return item(done);
            }, function (error) {
                if (error) {
                    return next(error);
                }
                return next();
            });
        }
        else {
            return next();
        }
    };
    PluginLoader.prototype.getParsedObject = function (handler) {
        if (typeof handler === 'string' && this.isArgumentAService(handler)) {
            var serviceString = this.getFilteredArgument(handler);
            if (ObjectPath.has(this._server, serviceString)) {
                return ObjectPath.get(this._server, serviceString);
            }
        }
        return handler;
    };
    PluginLoader.prototype.getFilteredArgument = function (argumentId) {
        return argumentId.replace(/%/g, '');
    };
    PluginLoader.prototype.isArgumentAService = function (arg) {
        if ((/^%[^%]+%$/.test(arg))) {
            return true;
        }
        return false;
    };
    return PluginLoader;
})();
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = PluginLoader;
