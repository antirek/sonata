const replace = require('./replace');
const preprocess = require('./preprocess');

doProfiles = (device) => {
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

/**
 *
 */
class Builder {
  /**
   *
   * @param {*} vendors
   */
  constructor(vendors) {
    this.vendors = vendors;
  }

  /**
   *
   * @param {*} device
   * @return {*}
   */
  template(device) {
    const vendor = device.vendor;
    const model = device.model;

    const deviceSpec = this.vendors.getDeviceSpec(vendor, model);
    const template = this.vendors.getConfigTemplate(vendor, model);

    if (!template) {
      return null;
    }

    if (deviceSpec.type === 'gateway' && !device.profiles) {
      device = doProfiles(device);
    }

    const templateProcess = preprocess(template, device);

    let config;
    if (deviceSpec.type === 'phone') {
      config = replace.phoneReplace(templateProcess, device);
    } else if (deviceSpec.type === 'gateway') {
      config = replace.gatewayReplace(templateProcess, device);
    }

    return config;
  };
}

module.exports = {
  Builder,
  doProfiles,
};
