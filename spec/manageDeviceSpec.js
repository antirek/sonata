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
  apiDoc: require('./../manage/api-doc.js'),
  paths: path.resolve(__dirname, './../manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    config: null,
  },
});

describe('manage', ()=> {
  it('get config on server', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/device/1/')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          expect(json.status).toEqual(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });

  it('delete config on server', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/device/1/', {
      method: 'DELETE',
    })
        .then((res) => {
          // console.log('res status', res.status);
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          expect(json.status).toEqual('OK');
        })
        .then(() => {
          server.close();
          done();
        });
  });

  it('create config on server', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/device/', {
      method: 'post',
      body: JSON.stringify(device),
      headers: {'Content-Type': 'application/json'},
    })
        .then((res) => {
          // console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log(json);
          // const containXml = res.includes('<config version="1">');
          // console.log('containXml', containXml);
          // expect(containXml).toBe(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
