var Plugin = require('../../../index');
var attributes = require('./package.json');
var testController = require('./controller');
var PluginLoader = Plugin.default;
var config = {
    services: {
        'testController': testController.default
    },
    routes: [{
            method: 'GET',
            path: '/test',
            config: {
                handler: '%plugins.test-sample-module.testController.test%'
            }
        }],
    attributes: {
        pkg: attributes
    }
};
var plugin = new PluginLoader(config);
module.exports = plugin;
