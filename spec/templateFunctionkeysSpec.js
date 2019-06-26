
const VendorStore = require('./../vendors');
const vendors = new VendorStore();

const TemplateBuilder = require('./../template').Builder;


const fanvilPhone = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'x5s',
  vendor: 'fanvil',
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
    const config = template.template(fanvilPhone);
    console.log('config:', config);
    
    expect(config.includes('Fkey1 Type         :4')).toBe(true);
    expect(config.includes('Fkey1 Value        :01')).toBe(true);
    expect(config.includes('Fkey1 Title        :emergency')).toBe(true);
    expect(config.includes('Fkey2 Type         :1')).toBe(true);
    expect(config.includes('Fkey2 Value        :89135292926')).toBe(true);
    expect(config.includes('Fkey2 Title        :thanks')).toBe(true);
    done();
  });
});
