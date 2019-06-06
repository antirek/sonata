const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);

const panasonicPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'x5s',
  vendor: 'fanvil',
  mac: '001565113af8',
  timezone_offset: 'GMT+07',
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
    const config = template.template(panasonicPhone);
    console.log('config:', config);

    expect(config.includes('SIP1 Phone Number  :sip101')).toBe(true);
    expect(config.includes('SIP1 Register Pswd :1234')).toBe(true);
    expect(config.includes('SIP1 Register Addr :sip.mangosip.ru')).toBe(true);

    expect(config.includes('SIP2 Phone Number  :sip102')).toBe(true);
    expect(config.includes('SIP2 Register Pswd :4321')).toBe(true);
    expect(config.includes('SIP2 Register Addr :sip.mobilonsip.ru')).toBe(true);

    expect(config.includes('Time Zone          :28')).toBe(true);

    done();
  });
});

