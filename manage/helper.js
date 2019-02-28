
const prepareMAC = (mac) => {
  return mac.match(/[0-9A-F]/gi).join('').toLowerCase();
};

module.exports = {prepareMAC};
