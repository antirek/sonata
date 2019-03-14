const path = require('path');
const fetch = require('node-fetch');

const device = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1600',
  vendor: 'grandstream',
  mac: '001565113af8',
  timezone: 'UTC+03',
  token: 'ertyeriutyiure',
  ntp_server: 'pool.ntp.org',
  status: true,
  accounts: [
    {
      name: 'манго',
      position: 1,
      sip_register: 'sip.mangosip.ru',
      sip_name: 'sip101',
      sip_user: 'sip101',
      sip_password: '1234',
      sip_auth: 'sip101',
    },
    {
      name: 'Мобилон',
      position: 2,
      sip_register: 'sip.mobilonsip.ru',
      sip_name: 'sip102',
      sip_user: 'sip102',
      sip_password: '4321',
      sip_auth: 'sip102',
    },
  ],
};

const Device = class {
  /**
   * @return {Promise}
   */
  save() {
    return Promise.resolve(device);
  }
};

Device.findOneAndUpdate = () => {
  return Promise.resolve(device);
};

Device.findOne = () => {
  return Promise.resolve(device);
};

Device.findOneAndRemove = () => {
  return Promise.resolve(device);
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

const config = {
  url: {
    provision: 'http://provision.server.com',
  },
};

const createApp = require('./../app').createApp;
const app = createApp({
  apiDoc: require('./../manage/api-doc.js'),
  paths: path.resolve(__dirname, './../manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    config,
  },
});

describe('manage', ()=> {
  it('get link for device', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/link/1/device')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          const url = 'http://provision.server.com/v1/device/' +
            'sdgjdeu9443908590sfdsf8u984';
          expect(json.data.url).toEqual(url);
        })
        .then(() => {
          server.close();
          done();
        });
  });

  it('get link for token', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/link/1/token')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          const url = 'http://provision.server.com/v1/token/ertyeriutyiure';
          expect(json.data.url).toEqual(url);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
