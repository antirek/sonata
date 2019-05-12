const fetch = require('node-fetch');

const device = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1620',
  vendor: 'grandstream',
  mac: '001565113af8',
  timezone_offset: 'GMT+03',
  ntp_server: 'pool.ntp.org',
  status: true,
  created_at: '2019-01-18T15:39:15.645Z',
  updated_at: (new Date()).toISOString(),
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
      enabled: false,
      sip_register: '',
      sip_name: '',
      sip_user: '',
      sip_password: '',
      sip_auth: '',
    },
  ],
};

const Device = {
  findOne: () => {
    return Promise.resolve(device);
  },
};

const createApp = require('./createProvisionApp');
const app = createApp({Device});

describe('provision with disabled line', () => {
  it('get xml config', (done) => {
    const server = app.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg.xml')
        .then((res) => res.text())
        .then((config) => {
          // console.log(' ------------------- ')
          // console.log(res);
          expect(config.includes('<config version="1">')).toBe(true);
          expect(config.includes('<P271>1</P271>')).toBe(true);
          expect(config.includes('<P47>sip.mangosip.ru</P47>')).toBe(true);
          expect(config.includes('<P35>sip101</P35>')).toBe(true);
          expect(config.includes('<P36>sip101</P36>')).toBe(true);
          expect(config.includes('<P2>admin1</P2>')).toBe(true);
          expect(config.includes('<P34>1234</P34>')).toBe(true);

          expect(config.includes('<P401>0</P401>')).toBe(true);
          expect(config.includes('<P417>Мобилон</P417>')).toBe(true);
          expect(config.includes('<P402></P402>')).toBe(true);
          expect(config.includes('<P404></P404>')).toBe(true);
          expect(config.includes('<P405></P405>')).toBe(true);
          expect(config.includes('<P406></P406>')).toBe(true);
          expect(config.includes('<P407></P407>')).toBe(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
