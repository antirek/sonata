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

module.exports = {
  isFreshUpdate,
};
