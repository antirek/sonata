module.exports = {
  version: '1.0',
  id: 'grandstream',
  name: 'Grandstream',
  instruction: 'в поле Protocol выберите "{{protocol}}", \n' +
                 'в поле Url укажите {{server}}{{qs}}',
  defaults: {
    firmware: {
      url: 'firmware.grandstream.com',
    },
  },
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
    'firmware',
  ],
  models: require('./models'),
  timezones: {
    'GMT+01': 'CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00',
    'GMT+02': 'TZP-2',
    'GMT+03': 'TZQ-3',
    'GMT+04': 'TZR-4',
    'GMT+05': 'TZS-5',
    'GMT+06': 'TZV-6',
    'GMT+07': 'TZX-7',
    'GMT+08': 'TZY-8',
    'GMT+09': 'TZZ-9',
    'GMT+10': 'EST-10',
    'GMT+11': 'TZc-11',
  },
};
