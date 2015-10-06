import Plugin = require('../../../index');
let attributes = require('./package.json');
let testController = require('./controller');
let PluginLoader = Plugin.default;
let config: Plugin.IConfig = {
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
let plugin = new PluginLoader(config);
export = plugin;
