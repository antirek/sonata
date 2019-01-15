
const device = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1600',
  vendor: 'grandstream',
  mac: 'E2ABB34347812',
  timezone: 'UTC+03',
  ntp_server: 'pool.ntp.org',
  accounts: [
    {
      name: 'манго',
      position: 1,
      sip_register: 'sip.mangosip.ru',
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
    },
    {
      name: 'Мобилон',
      position: 2,
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
};

const template = require('./../provision/template');

describe('template', () => {
  it('do good', (done) => {
    const config = template(device);
    console.log('config:', config);
    done();
  });
});
