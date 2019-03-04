const fs = require('fs');
const path = require('path');
const devices = require('./vendors/index');
const preprocess = require('preprocess');
const url = require('url-parse');


const getTimezoneByOffset = (offset, vendor) => {
  const offsets = {
    'grandstream': {
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
    },
    'yealink': {
      'GMT+01': '+1',
      'GMT+02': '+2',
      'GMT+03': '+3',
      'GMT+04': '+4',
      'GMT+05': '+5',
      'GMT+06': '+6',
      'GMT+07': '+7',
      'GMT+08': '+8',
      'GMT+09': '+9',
      'GMT+10': '+10',
      'GMT+11': '+11',
    },
  };

  return offsets[vendor] ? offsets[vendor][offset] : null;
};

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

const phoneReplace = (template, device) => {
  let config = template.toString('utf8')
      .replace('{{timezone}}',
          getTimezoneByOffset(device.timezone_offset, device.vendor))
      .replace('{{ntp_server}}', device.ntp_server)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\n/g, '\n');

  if (device.accounts) {
    config = replaceAccountsVars(config, device.accounts);
  }

  if (device.phonebooks && device.phonebooks.length > 0) {
    console.log('replace phonebooks');
    config = replacePhonebooksVars(config, device.phonebooks);
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

const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;
  console.log('devices', devices);

  const basePath = './provision/vendors/';
  const deviceSpec = devices[vendor][model];

  if (!deviceSpec || !deviceSpec.template) {
    return null;
  }

  const templatePath = path.resolve(basePath, vendor, deviceSpec.template);
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

  const templateProcess = preprocess.preprocess(template, {
    ACCOUNT1: checkAccount(1),
    ACCOUNT2: checkAccount(2),
    ACCOUNT3: checkAccount(3),
    ACCOUNT4: checkAccount(4),
    ACCOUNT5: checkAccount(5),
    PROFILE0: checkProfile(0),
    PROFILE1: checkProfile(1),
    PHONEBOOK1: checkPhonebook(1),
    PHONEBOOK2: checkPhonebook(2),
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
