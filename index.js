const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const createApp = require('./app').createApp;
const deviceSchema = require('./models/device');
const requestLogSchema = require('./models/requestLog');

const Device = mongoose.model(
    'Device', deviceSchema('device')
);

const RequestLog = mongoose.model(
    'RequestLog', requestLogSchema('log_request')
);

mongoose.connect(config.mongodb, {useNewUrlParser: true});

console.log('config', config);

const manageApp = createApp({
  apiDoc: require('./manage/api-doc.js'),
  paths: path.resolve(__dirname, 'manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
  },
});

const provisionApp = createApp({
  apiDoc: require('./provision/api-doc.js'),
  paths: path.resolve(__dirname, 'provision/api-routes'),
  dependencies: {
    Device,
    RequestLog,
  },
});

manageApp.listen(config.manage.port);
provisionApp.listen(config.provision.port);
