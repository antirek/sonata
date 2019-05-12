
const vendors = require('./../vendors');
const TemplateBuilder = require('./../template').Builder;


const grandstreamPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1400',
  vendor: 'grandstream',
  mac: '001565113af8',
  timezone_offset: 'GMT+03',
  ntp_server: 'pool.ntp.org',
  accounts: [
    {
      name: 'Мобилон',
      line: 1,
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
  phonebooks: [
    {
      name: 'Main phonebook',
      url: 'http://phonebook.mobilon.ru/pbnn/3242342?asas#wewe',
    },
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const template = new TemplateBuilder(vendors);
    const config = template.template(grandstreamPhone);
    // console.log('config:', config);

    expect(config.includes('<config version="1">')).toBe(true);
    expect(config.includes('<P47>sip.mobilonsip.ru</P47>')).toBe(true);
    expect(config.includes('<P35>sip102</P35>')).toBe(true);
    expect(config.includes('<P36>sip102</P36>')).toBe(true);
    expect(config.includes('<P2>admin1</P2>')).toBe(true);
    expect(config.includes('<P34>4321</P34>')).toBe(true);

    expect(config.includes('<P64>TZQ-3</P64>'))
        .toBe(true);

    expect(config.includes('<P330>1</P330>')).toBe(true);
    expect(config.includes(
        '<P331>phonebook.mobilon.ru/pbnn/3242342?asas#wewe</P331>'))
        .toBe(true);

    done();
  });
});

const yealinkPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 't28p',
  vendor: 'yealink',
  mac: '001565113af8',
  timezone_offset: 'GMT+03',
  ntp_server: 'pool.ntp.org',
  accounts: [
    {
      name: 'Мобилон',
      line: 1,
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
  phonebooks: [
    {
      name: 'Main phonebook',
      url: 'http://phonebook.mobilon.ru/pbnn/3242342?asas#wewe',
    },
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const template = new TemplateBuilder(vendors);
    const config = template.template(yealinkPhone);

    // console.log('config:', config);

    expect(config.includes(
        'remote_phonebook.data.1.url = ' +
      'http://phonebook.mobilon.ru/pbnn/3242342?asas#wewe'))
        .toBe(true);

    expect(config.includes(
        'remote_phonebook.data.1.name = Main phonebook'))
        .toBe(true);
    done();
  });
});

