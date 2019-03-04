const template = require('./../provision/template');

const panasonicPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'tgp600',
  vendor: 'panasonic',
  mac: '001565113af8',
  timezone_offset: 'GMT+03',
  ntp_server: 'pool.ntp.org',
  accounts: [
    {
      name: 'манго',
      line: 1,
      sip_register: 'sip.mangosip.ru',
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
    },
    {
      name: 'Мобилон',
      line: 2,
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
};


describe('template', () => {
  it('do good', (done) => {
    const config = template(panasonicPhone);
    console.log('config:', config);

    expect(config.includes('SIP_RGSTR_ADDR_1="sip.mangosip.ru"')).toBe(true);
    expect(config.includes('PHONE_NUMBER_1="sip101"')).toBe(true);
    expect(config.includes('SIP_PASS_1="1234"')).toBe(true);

    done();
  });
});

