const fs = require('fs');
const path = require('path');

const replace = require('./replace');
const preprocess = require('./preprocess');

const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;
  // console.log('devices', devices);

  const basePath = './provision/vendors/';
  const deviceSpec = replace.getDeviceSpec(vendor, model);

  if (!deviceSpec || !deviceSpec.template) {
    return null;
  }

  const templatePath = path.resolve(basePath, deviceSpec.template);
  // console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  // console.log('template', template);

  const templateProcess = preprocess(template, device);

  let config;
  if (deviceSpec.type === 'phone') {
    config = replace.phoneReplace(templateProcess, device);
  } else if (deviceSpec.type === 'gateway') {
    config = replace.gatewayReplace(templateProcess, device);
  }

  return config;
};

module.exports = template;
