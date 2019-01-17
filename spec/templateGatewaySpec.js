
const grandstreamPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'ht812',
  vendor: 'grandstream',
  mac: '001565113a78',
  timezone: 'UTC+03',
  ntp_server: 'pool.ntp.org',
  profiles: [
    {
      sip_register: 'sip.mobilon.ru',
      id: 0,
    },
    {
      sip_register: 'sip.mangosip.ru',
      id: 1,
    },
  ],
  accounts: [
    {
      name: 'мобилон',
      position: 1,
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
      profile_id: 0,
    },
    {
      name: 'манго',
      position: 2,
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
      profile_id: 1,
    },
  ],
};

const template = require('./../provision/template');

describe('template', () => {
  it('do good', (done) => {
    const config = template(grandstreamPhone);
    console.log('config:', config);

    done();
  });
});
