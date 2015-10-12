Package.describe({
  name: 'hiukim:slacklog',
  version: '0.0.1',
  summary: 'This package provides an easy way for sending messages to your slack channels',
  // URL to the Git repository containing the source code for this package.
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('http', ['server']);
  api.use('ecmascript');
  api.addFiles('slacklog.js');
  api.export('SlackLog', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('hiukim:slacklog');
});
