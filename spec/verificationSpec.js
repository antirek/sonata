
const helper = require('./../api/provision/verification');

const deviceExpired = {
  updated_at: '2019-01-18T15:41:15.645Z',
};

const deviceFresh = {
  updated_at: (new Date()).toISOString(),
};

describe('helper', () => {
  it('check expired device config', (done) => {
    const result = helper.isFreshUpdate(deviceExpired);
    expect(result).toBe(false);

    done();
  });
  it('check fresh device config', (done) => {
    const result = helper.isFreshUpdate(deviceFresh);
    expect(result).toBe(true);

    done();
  });
});
