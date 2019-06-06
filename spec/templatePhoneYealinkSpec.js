const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);

const yealinkPhoneWithTwoAccounts = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 't28p',
  vendor: 'yealink',
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
    const config = template.template(yealinkPhoneWithTwoAccounts);
    console.log('config:', config);

    expect(config.includes('account.1.enable = 1')).toBe(true);
    expect(config.includes('account.1.display_name = sip101')).toBe(true);
    expect(config.includes('account.1.password = 1234')).toBe(true);

    expect(config.includes('account.2.enable = 1')).toBe(true);
    expect(config.includes('account.2.display_name = sip102')).toBe(true);
    expect(config.includes('account.2.password = 4321')).toBe(true);

    expect(config.includes('local_time.time_zone = +3')).toBe(true);
    done();
  });
});


const yealinkPhoneWithOneAccount = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 't28p',
  vendor: 'yealink',
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
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const config = template.template(yealinkPhoneWithOneAccount);
    console.log('config:', config);

    expect(config.includes('account.1.enable = 1')).toBe(true);
    expect(config.includes('account.1.display_name = sip101')).toBe(true);
    expect(config.includes('account.1.password = 1234')).toBe(true);

    expect(config.includes('account.2.enable = 1')).toBe(false);

    done();
  });
});
