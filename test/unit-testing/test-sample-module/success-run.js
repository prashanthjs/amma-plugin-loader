var Plugin = require('../../../index');
var testController = require('./controller');
var attributes = require('./package.json');
var PluginLoader = Plugin.default;
var config = {
    services: {
        'testController': testController.default
    },
    runs: [
        '%plugins.test-sample-module.testController.successRun%'
    ],
    attributes: {
        pkg: attributes
    }
};
var plugin = new PluginLoader(config);
module.exports = plugin;
