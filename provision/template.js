const fs = require('fs');
const path = require('path');
const devices = require('./vendors/index');
const preprocess = require('preprocess');

const offsets = {
  'GMT+01': 'CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00',
  'GMT+02': 'TZP-2',
  'GMT+03': 'TZQ-3',
  'GMT+04': 'TZR-4',
  'GMT+05': 'TZS-5',
  'GMT+06': 'TZV-6',
  'GMT+07': 'TZX-7',
  'GMT+08': 'TZY-8',
  'GMT+09': 'TZZ-9',
  'GMT+10': 'EST-10',
  'GMT+11': 'TZc-11',
};

const getTimezoneByOffset = (offset) => {
  return offsets[offset];
};

const phoneReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}', getTimezoneByOffset(device.timezone_offset))
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  const accounts = device.accounts;
  accounts.forEach((element) => {
    for (prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        const mask = '{{' + (
          ['account', element.line, prop].join('_')
        ) + '}}';
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
          ['account', element.line, prop].join('_')
        ) + '}}';
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

  const check = (id) => {
    return device.accounts.find((item) => {
      return Number.parseInt(item.line) === id;
    })
  }

  let templateProcess = preprocess.preprocess(template, {
    ACCOUNT1: check(1),
    ACCOUNT2: check(2),
    ACCOUNT3: check(3),
    ACCOUNT4: check(4),
  });

  let config;
  if (deviceSpec.type === 'phone') {
    config = phoneReplace(templateProcess, device);
  } else if (deviceSpec.type === 'gateway') {
    config = gatewayReplace(templateProcess, device);
  }

  return config;
};

module.exports = template;
