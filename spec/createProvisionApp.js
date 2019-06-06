const path = require('path');
const merge = require('merge');

const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);

const helpers = {
  rules: require('./../helpers/rules'),
  mac: require('./../helpers/mac'),
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


const createProvisionApp = (deps) => {
  // console.log('deps:', deps);
  const createApp = require('../app').createApp;
  const app = createApp({
    apiDoc: require('../api/provision/api-doc.js'),
    paths: path.resolve(__dirname, './../api/provision/api-routes'),
    dependencies: merge({
      RequestLog,
      template,
      helpers,
    }, deps),
  });
  return app;
};

module.exports = createProvisionApp;
