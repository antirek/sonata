const path = require('path');
const merge = require('merge');

const helpers = {
  mac: require('./../helpers/mac'),
  rules: require('./../helpers/rules'),
};

/**
 *
 */
class RequestLog {
  /**
     *
     */
  constructor() {}
  /**
     *
     */
  save() {}
}

const createManageApp = (deps) => {
  const createApp = require('./../app').createApp;

  const app = createApp({
    apiDoc: require('./../api/manage/api-doc.js'),
    paths: path.resolve(__dirname, './../api/manage/api-routes'),
    dependencies: merge({
      RequestLog,
      config: null,
      helpers,
    }, deps),
  });

  return app;
};

module.exports = createManageApp;
