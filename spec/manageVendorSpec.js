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

const createApp = require('../app').createApp;
const app = createApp({
  apiDoc: require('../manage/api-doc.js'),
  paths: path.resolve(__dirname, './../manage/api-routes'),
  dependencies: {
    Device,
    RequestLog,
    config: null,
  },
});

describe('manage vendor', ()=> {
  it('return list supportred vendors', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/vendor')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          // console.log('json:', json);
          const str = JSON.stringify(json);
          // console.log(str);
          expect(str.includes('{"id":"grandstream","name":"Grandstream",' +
            '"scopes":[{"id":"accounts","name":"SIP аккаунты"},' +
            '{"id":"timezone","name":"Таймзона"},' +
            '{"id":"phonebooks","name":"Телефонные книги"},' +
            '{"id":"ntp","name":"Сервер времени (NTP)"},' +
            '{"id":"firmware","name":"Прошивка"}]}'))
              .toEqual(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });


  it('return list supportred models', (done) => {
    const server = app.listen(3000);

    fetch('http://localhost:3000/v1/vendor/grandstream')
        .then((res) => {
          console.log(res);
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          console.log('json:', json);
          const str = JSON.stringify(json);
          console.log(str);
          expect(str.includes('{"id":"gxp1400","name":"GXP1400"}'))
              .toEqual(true);
        })
        .then(() => {
          server.close();
          done();
        });
  });
});
