
const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template').Builder;


const snomPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'd785',
  vendor: 'snom',
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
  functionkeys: [
    {
      id: 1,
      name: 'emergency',
      type: 'dtmf',
      value: '01',
    },
    {
      id: 2,
      name: 'thanks',
      type: 'speeddial',
      value: '89135292926',
    },
  ],
};

describe('template', () => {
  it('do good', (done) => {
    const template = new TemplateBuilder(vendors);
    const config = template.template(snomPhone);
    console.log('config:', config);
    expect(config.includes(
        '<fkey idx="0" context="active" label="emergency" perm="">' +
      'dtmf 01</fkey>'
    )).toBe(true);
    expect(config.includes(
        '<fkey idx="1" context="active" label="thanks" perm="">' +
      'speed 89135292926</fkey>'
    )).toBe(true);

    done();
  });
});
