const path = require('path');
const fetch = require('node-fetch');
const template = require('./../template/').template;

const deviceWithOneAccount = {
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
  ],
};

const DeviceWithOneAccount = {
  findOne: () => {
    return Promise.resolve(deviceWithOneAccount);
  },
};

/**
 *
 */
class RequestLog {
  /**
   *
   */
  constructor() {}
  /**
   *
   */
  save() {}
}

const createApp = require('./../app').createApp;
const app = createApp({
  apiDoc: require('./../api/provision/api-doc.js'),
  paths: path.resolve(__dirname, './../api/provision/api-routes'),
  dependencies: {
    Device: DeviceWithOneAccount,
    RequestLog,
    template,
  },
});


describe('provision device with one account', ()=> {
  it('get xml config', (done) => {
    const server = app.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg.xml')
        .then((res) => res.text())
        .then((config) => {
          // console.log(' ------------------- 1')
          // console.log(config);

          expect(config.includes('<config version="1">')).toBe(true);
          expect(config.includes('<P47>sip.mangosip.ru</P47>')).toBe(true);
          expect(config.includes('<P35>sip101</P35>')).toBe(true);
          expect(config.includes('<P36>sip101</P36>')).toBe(true);
          expect(config.includes('<P2>admin1</P2>')).toBe(true);
          expect(config.includes('<P34>1234</P34>')).toBe(true);

          expect(config.includes('<P401>1</P401>')).toBe(false);
          expect(config.includes('<P417>Мобилон</P417>')).toBe(false);
          expect(config.includes('<P402>sip.mobilonsip.ru</P402>')).toBe(false);
          expect(config.includes('<P404>sip102</P404>')).toBe(false);
          expect(config.includes('<P405>sip102</P405>')).toBe(false);
          expect(config.includes('<P406>4321</P406>')).toBe(false);
          expect(config.includes('<P407>sip102</P407>')).toBe(false);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});


const deviceWithTwoAccounts = {
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
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
};

const DeviceWithTwoAccounts = {
  findOne: () => {
    return Promise.resolve(deviceWithTwoAccounts);
  },
};

const app2 = createApp({
  apiDoc: require('./../api/provision/api-doc.js'),
  paths: path.resolve(__dirname, './../api/provision/api-routes'),
  dependencies: {
    Device: DeviceWithTwoAccounts,
    RequestLog,
    template,
  },
});


describe('provision device with two accounts', ()=> {
  it('get xml config', (done) => {
    const server = app2.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg.xml')
        .then((res) => res.text())
        .then((config) => {
          // console.log(' -------------------  2')
          // console.log(config);

          expect(config.includes('<config version="1">')).toBe(true);
          expect(config.includes('<P271>1</P271>')).toBe(true);
          expect(config.includes('<P47>sip.mangosip.ru</P47>')).toBe(true);
          expect(config.includes('<P35>sip101</P35>')).toBe(true);
          expect(config.includes('<P36>sip101</P36>')).toBe(true);
          expect(config.includes('<P2>admin1</P2>')).toBe(true);
          expect(config.includes('<P34>1234</P34>')).toBe(true);

          expect(config.includes('<P401>1</P401>')).toBe(true);
          expect(config.includes('<P417>Мобилон</P417>')).toBe(true);
          expect(config.includes('<P402>sip.mobilonsip.ru</P402>')).toBe(true);
          expect(config.includes('<P404>sip102</P404>')).toBe(true);
          expect(config.includes('<P405>sip102</P405>')).toBe(true);
          expect(config.includes('<P406>4321</P406>')).toBe(true);
          expect(config.includes('<P407>sip102</P407>')).toBe(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
