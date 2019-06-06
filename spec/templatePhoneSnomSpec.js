const vendors = require('./../vendors');
const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);

const snomPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'd785',
  vendor: 'snom',
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
    const config = template.template(snomPhone);
    console.log('config:', config);

    expect(config.includes(
        '<user_name idx="1" perm="">sip101</user_name>'))
        .toBe(true);
    expect(config.includes(
        '<user_pass idx="1" perm="">1234</user_pass>'))
        .toBe(true);
    expect(config.includes(
        '<user_host idx="1" perm="">sip.mangosip.ru</user_host>'))
        .toBe(true);
    expect(config.includes(
        '<timezone>RUS+3</timezone>'))
        .toBe(true);
    expect(config.includes(
        '<user_realname idx="1" perm="">манго</user_realname>'))
        .toBe(true);

    done();
  });
});

