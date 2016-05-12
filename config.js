// This is where all the configuration for the project should happen. The ideal
// arrangement would keep you out of the gulpfile entirely.

var config = {};

config.deploy = {
  bucket: 'moose.texastribune.org',
  key: 'antlers',
  profile: 'newsapps'
};

config.templateFolder = './app/templates';

module.exports = config;
