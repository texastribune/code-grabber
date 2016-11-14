// This is where all the configuration for the project should happen. The ideal
// arrangement would keep you out of the gulpfile entirely.

var config = {};

config.deploy = {
  bucket: 'code-grabber.texastribune.org',
  key: 'antlers',
  profile: 'newsapps'
};

config.dataFolder = './data';
config.templateFolder = './app/templates';

config.data = {
  sheets: [
    {
      fileid: '1gCNdF5Zq1EhVvP_R5QUgkLqojD0KnPYqFq4TcVCokvs',
      name: 'festival',
      copytext: {
        basetype: 'objectlist'
      }
    }
  ]
};

module.exports = config;
