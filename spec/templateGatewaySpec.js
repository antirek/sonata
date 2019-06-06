const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template/').Builder;
const template = new TemplateBuilder(vendors);

const grandstreamGatewayWithTwoAccounts = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'dp715',
  vendor: 'grandstream',
  mac: '001565113a78',
  timezone_offset: 'GMT+03',
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
      line: 1,
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
      profile_id: 0,
    },
    {
      name: 'манго',
      line: 2,
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
      profile_id: 1,
    },
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const config = template.template(grandstreamGatewayWithTwoAccounts);
    console.log('config:', config);

    expect(config.includes('<P2>admin1</P2>')).toBe(true);
    expect(config.includes('<P47>sip.mobilon.ru</P47>')).toBe(true);

    expect(config.includes('<P747>sip.mangosip.ru</P747>')).toBe(true);

    expect(config.includes('<P4060>sip101</P4060>')).toBe(true);
    expect(config.includes('<P4090>sip101</P4090>')).toBe(true);
    expect(config.includes('<P4120>1234</P4120>')).toBe(true);
    expect(config.includes('<P4180>sip101</P4180>')).toBe(true);
    expect(config.includes('<P4150>0</P4150>')).toBe(true);

    expect(config.includes('<P4061>sip102</P4061>')).toBe(true);
    expect(config.includes('<P4091>sip102</P4091>')).toBe(true);
    expect(config.includes('<P4121>4321</P4121>')).toBe(true);
    expect(config.includes('<P4181>sip102</P4181>')).toBe(true);
    expect(config.includes('<P4151>1</P4151>')).toBe(true);

    expect(config.includes('<P64>TZQ-3</P64>')).toBe(true);
    done();
  });
});

const grandstreamGatewayWithOneAccount = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'dp715',
  vendor: 'grandstream',
  mac: '001565113a78',
  timezone_offset: 'GMT+03',
  ntp_server: 'pool.ntp.org',
  profiles: [
    {
      sip_register: 'sip.mobilon.ru',
      id: 0,
    },
  ],
  accounts: [
    {
      name: 'мобилон',
      line: 1,
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
      profile_id: 0,
    },
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const config = template.template(grandstreamGatewayWithOneAccount);
    console.log('config:', config);

    expect(config.includes('<P2>admin1</P2>')).toBe(true);
    expect(config.includes('<P47>sip.mobilon.ru</P47>')).toBe(true);

    expect(config.includes('<P747>sip.mangosip.ru</P747>')).toBe(false);

    expect(config.includes('<P4060>sip101</P4060>')).toBe(true);
    expect(config.includes('<P4090>sip101</P4090>')).toBe(true);
    expect(config.includes('<P4120>1234</P4120>')).toBe(true);
    expect(config.includes('<P4180>sip101</P4180>')).toBe(true);
    expect(config.includes('<P4150>0</P4150>')).toBe(true);

    expect(config.includes('<P4061>sip102</P4061>')).toBe(false);
    expect(config.includes('<P4091>sip102</P4091>')).toBe(false);
    expect(config.includes('<P4121>4321</P4121>')).toBe(false);
    expect(config.includes('<P4181>sip102</P4181>')).toBe(false);
    expect(config.includes('<P4151>1</P4151>')).toBe(false);

    expect(config.includes('<P64>TZQ-3</P64>')).toBe(true);
    done();
  });
});
