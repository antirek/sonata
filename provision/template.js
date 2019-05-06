const fs = require('fs');
const path = require('path');
const devices = require('./vendors/index');
const preprocess = require('preprocess');
const url = require('url-parse');
const timezones = require('./timezones');


const replacePhonebooksVars = (config, phonebooks) => {
  phonebooks.forEach((element, id) => {
    const maskUrl = '{{' + (
      ['phonebook', id + 1, 'url'].join('_')
    ) + '}}';
    // console.log('mask url', maskUrl);
    const pbUrl = url(element.url);
    config = config.replace(maskUrl, pbUrl['host'] + pbUrl['pathname']
      + pbUrl['query'] + pbUrl['hash']);

    const maskProtocol = '{{' + (
      ['phonebook', id + 1, 'protocol'].join('_')
    ) + '}}';
    const protocol = url(element.url).protocol === 'https:' ? '3' : '1';
    config = config.replace(maskProtocol, protocol);


    const maskFullUrl = '{{' + (
      ['phonebook', id + 1, 'fullurl'].join('_')
    ) + '}}';
    config = config.replace(maskFullUrl, element.url);

    const maskName = '{{' + (
      ['phonebook', id + 1, 'name'].join('_')
    ) + '}}';
    config = config.replace(maskName, element.name);
  });
  return config;
};

const replaceAccountsVars = (config, accounts) => {
  accounts.forEach((element) => {
    element = findEnabledAndSet(element);
    for (prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        const mask = '{{' + (
          ['account', element.line, prop].join('_')
        ) + '}}';
        config = config.replace(new RegExp(mask, 'g'), element[prop]);
      }
    }
  });
  return config;
};

const replaceFirmware = (config, firmware) => {
  config = config.replace('{{firmware_url}}', firmware.url);
  return config;
};

const phoneReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}',
          timezones.getTimezoneByOffset(device.timezone_offset, device.vendor))
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  if (device.accounts) {
    config = replaceAccountsVars(config, device.accounts);
  }

  if (device.phonebooks && device.phonebooks.length > 0) {
    // console.log('replace phonebooks');
    config = replacePhonebooksVars(config, device.phonebooks);
  }

  // console.log('device ------:', device);
  if (device.firmware) {
    config = replaceFirmware(config, device.firmware);
    // console.log('---- 1', config)
  }

  return config;
};

const findEnabledAndSet = (account) => {
  if (!account.hasOwnProperty('enabled')) {
    account.enabled = 1;
  }
  if (!account.enabled) {
    account.enabled = 0;
  } else {
    account.enabled = 1;
  }
  return account;
};

const replaceProfilesVars = (config, profiles) => {
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

const gatewayReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}', device.timezone)
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  if (device.accounts) {
    config = replaceAccountsVars(config, device.accounts);
  }

  if (device.profiles) {
    config = replaceProfilesVars(config, device.profiles);
  }

  return config;
};

const getDeviceSpec = (vendor, model) => {
  // console.log(vendor, model);
  const vendorSpec = devices.find((vendorSpec) => {
    return vendorSpec.id === vendor;
  });
  // console.log(vendorSpec);
  if (!vendorSpec.models || vendorSpec.models.length < 1) return null;

  const modelSpec = vendorSpec.models.find((modelSpec) => {
    return modelSpec.id === model;
  });

  return modelSpec;
};


const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;
  console.log('devices', devices);

  const basePath = './provision/vendors/';
  const deviceSpec = getDeviceSpec(vendor, model);

  if (!deviceSpec || !deviceSpec.template) {
    return null;
  }

  const templatePath = path.resolve(basePath, deviceSpec.template);
  // console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  // console.log('template', template);

  const checkAccount = (id) => {
    return device.accounts.find((item) => {
      return Number.parseInt(item.line) === id;
    });
  };

  const checkProfile = (id) => {
    if (!device.profiles) return undefined;

    return device.profiles.find((item) => {
      return Number.parseInt(item.id) === id;
    });
  };

  const checkPhonebook = (id) => {
    // console.log('check phonebook', !device.phonebooks)
    if (!device.phonebooks) return undefined;

    return device.phonebooks[id - 1];
  };

  const checkFirmware = () => {
    if (!device.firmware) return undefined;

    return true;
  };

  const templateProcess = preprocess.preprocess(template, {
    ACCOUNT1: checkAccount(1),
    ACCOUNT2: checkAccount(2),
    ACCOUNT3: checkAccount(3),
    ACCOUNT4: checkAccount(4),
    ACCOUNT5: checkAccount(5),
    ACCOUNT6: checkAccount(6),
    ACCOUNT7: checkAccount(7),
    ACCOUNT8: checkAccount(8),
    PROFILE0: checkProfile(0),
    PROFILE1: checkProfile(1),
    PHONEBOOK1: checkPhonebook(1),
    PHONEBOOK2: checkPhonebook(2),
    FIRMWARE: checkFirmware(),
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
