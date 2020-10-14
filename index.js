const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const createApp = require('./app').createApp;
const deviceSchema = require('./models/device');
const requestLogSchema = require('./models/requestLog');

const VendorStore = require('./vendors/index');
const vendors = new VendorStore();

console.log('vendors', vendors);


const TBuilder = require('./template/index').Builder;

const template = new TBuilder(vendors);
const helpers = {
  mac: require('./helpers/mac'),
  rules: require('./helpers/rules'),
};

const settingsConn = mongoose.createConnection(config.settings.mongodb, {
  useNewUrlParser: true,
});

const logsConn = mongoose.createConnection(config.logs.mongodb, {
  useNewUrlParser: true,
});

const Device = settingsConn.model(
    'Device', deviceSchema('device'),
);

const RequestLog = logsConn.model(
    'RequestLog', requestLogSchema('log_request'),
);

console.log('config', config);

const manageApp = createApp({
  desciption: 'Manage API',
  apiDoc: require('./api/manage/api-doc.js'),
  paths: path.resolve(__dirname, 'api/manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    config,
    helpers,
  },
});

const provisionApp = createApp({
  desciption: 'Provision API',
  apiDoc: require('./api/provision/api-doc.js'),
  paths: path.resolve(__dirname, 'api/provision/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    template,
    helpers,
  },
});

manageApp.listen(config.manage.port);
provisionApp.listen(config.provision.port);
