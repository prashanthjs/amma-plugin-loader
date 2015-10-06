import Plugin = require('../../../index');
import testController = require('./controller');

let attributes = require('./package.json');
let PluginLoader = Plugin.default;
let config: Plugin.IConfig = {
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
let plugin:Plugin.IPluginLoader = new PluginLoader(config);
export = plugin;
