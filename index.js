const config = require('config');
const mongoose = require('mongoose');
const createApp = require('./app').createApp;
const deviceSchema = require('./models/device');
const path = require('path');

const Device = mongoose.model(
    'Device', deviceSchema('device')
);

mongoose.connect(config.mongodb, {useNewUrlParser: true});

console.log('config', config);

const manageApp = createApp({
  apiDoc: require('./manage/api-doc.js'),
  paths: path.resolve(__dirname, 'manage/api-routes'),
  dependencies: {
    Device,
  },
});

const provisionApp = createApp({
  apiDoc: require('./provision/api-doc.js'),
  paths: path.resolve(__dirname, 'provision/api-routes'),
  dependencies: {
    Device,
  },
});

manageApp.listen(config.manage.port);
provisionApp.listen(config.provision.port);
