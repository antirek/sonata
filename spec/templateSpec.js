
const device = {
  domain: 'antirek.ru',
  model: 'gxp1600',
  vendor: 'grandstream',
};

const template = require('./../provision/template');

describe('template', () => {
  it('do good', (done) => {
    const config = template(device);
    console.log('config:', config);
    done();
  });
});
