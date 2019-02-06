
const grandstreamPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1600',
  vendor: 'grandstream',
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

const template = require('./../provision/template');

describe('template', () => {
  it('do good', (done) => {
    const config = template(grandstreamPhone);
    // console.log('config:', config);
    expect(config.includes('<config version="1">')).toBe(true);
    expect(config.includes('<P47>sip.mangosip.ru</P47>')).toBe(true);
    expect(config.includes('<P35>sip101</P35>')).toBe(true);
    expect(config.includes('<P36>sip101</P36>')).toBe(true);
    expect(config.includes('<P2>admin1</P2>')).toBe(true);
    expect(config.includes('<P34>1234</P34>')).toBe(true);

    expect(config.includes('<P64>TZQ-3</P64>'))
        .toBe(true);

    done();
  });
});
