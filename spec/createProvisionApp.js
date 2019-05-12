const path = require('path');
const merge = require('merge');

const vendors = require('./../vendors');
const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);
const verification = require('./../api/provision/verification')
    .ruleVerification;

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
      verification,
    }, deps),
  });
  return app;
};

module.exports = createProvisionApp;
