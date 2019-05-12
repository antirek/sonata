const fetch = require('node-fetch');

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
    mac: true,
  },
};

const DeviceActual = {
  findOne: () => {
    return Promise.resolve(deviceActual);
  },
};

const createApp = require('./createProvisionApp');
const app = createApp({Device: DeviceActual});


describe('provision', () => {
  it('get xml config with valid mac', (done) => {
    const server = app.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg001565113af8.xml')
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


describe('provision', () => {
  it('get xml config with not valid mac', (done) => {
    const server = app.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg001565113af81111.xml')
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


const deviceActualWithDisabledMacRule = {
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
    mac: false,
  },
};

const DeviceActualWithDisabledMacRule = {
  findOne: () => {
    return Promise.resolve(deviceActualWithDisabledMacRule);
  },
};

const app2 = createApp({Device: DeviceActualWithDisabledMacRule});

describe('provision', () => {
  it('get xml config with not valid mac and disabled mac rule', (done) => {
    const server = app2.listen(3000);
    fetch('http://localhost:3000/v1/device/1/cfg001565113af811111.xml')
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
