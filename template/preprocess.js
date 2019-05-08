const preprocess = require('preprocess');

const preprocessTemplate = (template, device) => {
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

  return templateProcess;
};


module.exports = preprocessTemplate;
