const fs = require('fs');
const path = require('path');
const devices = require('./vendors/index');

const phoneReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}', device.timezone)
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  const accounts = device.accounts;
  accounts.forEach((element) => {
    for (prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        const mask = '{{' + (
          ['account', element.position, prop].join('_')
        ) + '}}';
        // console.log(mask)
        config = config.replace(mask, element[prop]);
      }
    }
  });
  return config;
};


const gatewayReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}', device.timezone)
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  const accounts = device.accounts;
  accounts.forEach((element) => {
    for (prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        const mask = '{{' + (
          ['account', element.position, prop].join('_')
        ) + '}}';
        // console.log(mask)
        config = config.replace(mask, element[prop]);
      }
    }
  });

  const profiles = device.profiles;
  profiles.forEach((element) => {
    for (prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        const mask = '{{' + (
          ['profile', element.id, prop].join('_')
        ) + '}}';
        // console.log(mask)
        config = config.replace(mask, element[prop]);
      }
    }
  });

  return config;
};

const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;
  console.log('devices', devices);

  const basePath = './provision/vendors/';
  const deviceSpec = devices[vendor][model];

  const templatePath = path.resolve(basePath, vendor, deviceSpec.template);
  // console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  // console.log('template', template);
  let config;
  if (deviceSpec.type === 'phone') {
    config = phoneReplace(template, device);
  } else if (deviceSpec.type === 'gateway') {
    config = gatewayReplace(template, device);
  }

  return config;
};

module.exports = template;