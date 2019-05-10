const path = require('path');
const fetch = require('node-fetch');

const device = {
  id: 'sdgjdeu9443908590sfdsf8u984',
  model: 'gxp1600',
  vendor: 'grandstream',
  mac: '001565113af8',
  timezone: 'UTC+03',
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

const logs = [
  {
    updated_at: '',
    token: 'token1',
    ip: '127.0.0.1',
    status: 'OK',
  },
];

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

RequestLog.find = () => {
  return {
    skip: () => {
      return {
        limit: () => {
          return {
            sort: () => {
              return {
                exec: () => {
                  return Promise.resolve(logs);
                },
              };
            },
          };
        },
      };
    },
  };
};

const createApp = require('./../app').createApp;
const app = createApp({
  apiDoc: require('./../api/manage/api-doc.js'),
  paths: path.resolve(__dirname, './../api/manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    config: null,
  },
});

describe('manage', ()=> {
  it('get config on server', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/log/request/token1/')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          expect(json[0].status).toEqual('OK');
          expect(json[0].ip).toEqual('127.0.0.1');
          expect(json[0].token).toEqual('token1');
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
