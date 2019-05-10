const fs = require('fs');
const path = require('path');

const replace = require('./replace');
const preprocess = require('./preprocess');
const spec = require('./../vendors/spec');

const doProfiles = (device) => {
  const profiles = [];
  let profileId = 0;
  if (device.accounts) {
    for (const account of device.accounts) {
      if (account.sip_register) {
        profiles.push({
          sip_register: account.sip_register,
          id: profileId,
        });
        delete account.sip_register;
        account.profile_id = profileId;
        profileId++;
      }
      if (profiles.length >= 2) {
        break;
      }
    }
  }

  device.profiles = profiles;
  return device;
};


const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;
  // console.log('devices', devices);

  const basePath = './vendors/';
  const deviceSpec = spec.getDeviceSpec(vendor, model);

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

module.exports = {
  template,
  doProfiles,
};
