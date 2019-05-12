
const prepareMAC = (mac) => {
  return mac.match(/[0-9A-F]/gi).join('').toLowerCase();
};

const getMacFromFile = (filename) => {
  const macArray0 = filename.match(new RegExp('cfg(.*).xml'));
  if (macArray0 && macArray0[1]) {
    return macArray0[1].toLowerCase();
  }

  const macArray1 = filename.match(new RegExp('Config(.*).xml'));
  if (macArray1 && macArray1[1]) {
    return macArray1[1].toLowerCase();
  }

  const macArray2 = filename.match(new RegExp('cfg(.*)'));
  if (macArray2 && macArray2[1]) {
    return macArray2[1].toLowerCase();
  }

  const macArray3 = filename.match(new RegExp('(.*).xml'));
  if (macArray3 && macArray3[1]) {
    return macArray3[1].toLowerCase();
  }

  const macArray4 = filename.match(new RegExp('(.*).cfg'));
  if (macArray4 && macArray4[1]) {
    return macArray4[1].toLowerCase();
  }
};

module.exports = {
  prepareMAC,
  getMacFromFile,
};
