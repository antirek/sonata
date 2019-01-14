const fs = require('fs');
const path = require('path');

const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;

  const basePath = './provision/vendors/';
  const templatePath = path.resolve(basePath, vendor, model + '.xml');
  const template = fs.readFileSync(templatePath);

  // console.log('template', template);
  const config = template.toString('utf8').replace('{{domain}}', device.domain);

  return config;
};

module.exports = template;
