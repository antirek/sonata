
const rules = require('./../helpers/rules');

const deviceExpired = {
  updated_at: '2019-01-18T15:41:15.645Z',
};

const deviceFresh = {
  updated_at: (new Date()).toISOString(),
};

describe('rules', () => {
  it('check expired device config', (done) => {
    const result = rules.isFreshUpdate(deviceExpired);
    expect(result).toBe(false);

    done();
  });
  it('check fresh device config', (done) => {
    const result = rules.isFreshUpdate(deviceFresh);
    expect(result).toBe(true);

    done();
  });
});


describe('rules', () => {
  const device = {
    status: true,
    mac: 'aa:aa:aa:aa:aa:aa',
    updated_at: (new Date()).toISOString(),
    rules: {
      mac: true,
    },
  };

  it('check valid mac rule', (done) => {
    const requestInfoValid = {
      mac: 'aa:aa:aa:aa:aa:aa',
    };

    rules.ruleVerification(device, requestInfoValid)
        .then((result) => {
          expect(result).toBe(device);
          done();
        });
  });


  it('check not valid mac rule', () => {
    const requestInfoInvalid = {
      mac: 'aa:aa:aa:aa:aa:bb',
    };

    expectAsync(rules.ruleVerification(device, requestInfoInvalid))
        .toBeRejected();
    // done();
  });
});


describe('rules', () => {
  const device = {
    status: true,
    updated_at: (new Date()).toISOString(),
    rules: {
      ip: '192.168.200.1',
    },
  };

  it('check valid ip rule', (done) => {
    const requestInfoValid = {
      remote_ip: '192.168.200.1',
    };

    rules.ruleVerification(device, requestInfoValid)
        .then((result) => {
          expect(result).toBe(device);
          done();
        });
  });

  it('check not valid ip rule', () => {
    const requestInfoInvalid = {
      remote_ip: '192.168.200.2',
    };

    expectAsync(rules.ruleVerification(device, requestInfoInvalid))
        .toBeRejected();
  });
});


describe('rules', () => {
  it('check valid ip rule', (done) => {
    const deviceTrue = {
      updated_at: (new Date()).toISOString(),
      status: true,
    };

    rules.ruleVerification(deviceTrue, {})
        .then((result) => {
          expect(result).toBe(deviceTrue);
          done();
        });
  });

  it('check not valid ip rule', () => {
    const deviceFalse = {
      updated_at: (new Date()).toISOString(),
      status: false,
    };

    expectAsync(rules.ruleVerification(deviceFalse, {}))
        .toBeRejected();
  });
});
