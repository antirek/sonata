const path = require('path');
const fetch = require('node-fetch');
const template = require('./../template/').template;
const verification = require('./../api/provision/verification')
    .ruleVerification;

const deviceActual = {
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
  rules: {
    time: {
      until: (new Date((new Date()).getTime() + 10*60000)).toISOString(),
    },
  },
};

const DeviceActual = {
  findOne: () => {
    return Promise.resolve(deviceActual);
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
    Device: DeviceActual,
    RequestLog,
    template,
    verification,
  },
});


describe('provision', ()=> {
  it('get xml config actual until time', (done) => {
    const server = app.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg.xml')
        .then((res) => res.text())
        .then((res) => {
          // console.log(' ------------------- ')
          // console.log(res);
          const containXml = res.includes('<config version="1">');
          // console.log('containXml', containXml);
          expect(containXml).toBe(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});


const deviceNonActual = {
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
  rules: {
    time: {
      until: (new Date((new Date()).getTime() - 30*60000)).toISOString(),
    },
  },
};

const DeviceNonActual = {
  findOne: () => {
    return Promise.resolve(deviceNonActual);
  },
};

const app2 = createApp({
  apiDoc: require('./../api/provision/api-doc.js'),
  paths: path.resolve(__dirname, './../api/provision/api-routes'),
  dependencies: {
    Device: DeviceNonActual,
    RequestLog,
    template,
    verification,
  },
});


describe('provision', ()=> {
  it('get xml config expired until time', (done) => {
    const server = app2.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg.xml')
        .then((res) => res.text())
        .then((res) => {
          // console.log(' ------------------- ')
          // console.log(res);
          const containXml = res.includes('<config version="1">');
          // console.log('containXml', containXml);
          expect(containXml).toBe(false);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
