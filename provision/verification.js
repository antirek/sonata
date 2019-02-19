const ipRangeCheck = require('ip-range-check');

const isUntilTimeRule = (device) => {
  return device.rules && device.rules.time && device.rules.time.until;
};

const isExpiredUntilTimeRule = (device) => {
  let result = false;
  const dateUntil = (new Date(device.rules.time.until)).getTime();
  const dateActual = (new Date()).getTime();
  console.log('until:', dateUntil, 'actual:', dateActual);
  result = dateUntil - dateActual > 0 ? false : true;
  return result;
};

const isMacRule = (device) => {
  return device.rules && device.rules.mac && device.rules.hasOwnProperty('mac');
};

const isValidMac = (device, mac) => {
  return device.mac && (device.mac === mac);
};

const isIpRule = (device) => {
  return device.rules && device.rules.ip && device.rules.hasOwnProperty('ip');
};

const isValidIP = (device, ip) => {
  return ipRangeCheck(ip, device.rules.ip);
};

/**
  *
  * @param {Object} device
  * @return {Boolean}
  */
function isFreshUpdate(device) {
  let result = false;

  const deviceUpdateTime = Date.parse(device.updated_at);
  const nowTime = Date.now();
  const expiredMinutes = 10;
  const expiredMilliSeconds = expiredMinutes * 60 * 1000;

  // console.log('nowTime', nowTime);
  // console.log('expiredMilliSeconds', expiredMilliSeconds,
  // nowTime - expiredMilliSeconds);
  // console.log('deviceUpdateTime', deviceUpdateTime);

  if (nowTime - expiredMilliSeconds <= deviceUpdateTime) {
    result = true;
  }

  return result;
}

const ruleVerification = (device, requestInfo) => {
  if (!device) {
    return Promise.reject(new Error('no device config'));
  }

  // console.log('device:', strip(device));

  if (!device.status) {
    return Promise.reject(new Error('device config status disabled'));
  }

  if (isUntilTimeRule(device) && isExpiredUntilTimeRule(device)) {
    return Promise.reject(new Error('device until time rule expired'));
  }

  if (isMacRule(device) && !isValidMac(device, requestInfo.mac)) {
    console.log('mac', mac);
    return Promise.reject(new Error('device mac is not valid'));
  }

  if (isIpRule(device) && !isValidIP(device, requestInfo.remote_ip)) {
    return Promise.reject(new Error('device ip is not valid'));
  }

  if (!isFreshUpdate(device)) {
    return Promise.reject(new Error('device config expired'));
  }

  return Promise.resolve(device);
};

module.exports = {
  ruleVerification,
  isFreshUpdate,
};
