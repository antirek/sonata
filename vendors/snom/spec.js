module.exports = {
  version: '1.0',
  id: 'snom',
  name: 'Snom',
  instruction: 'в Setup / Advanced / Update / Setting URL ' +
               'укажите {{protocol}}{{server}}{{qs}}/{mac}.xml',
  defaults: {
    firmware: {
      url: 'firmware.snom.com',
    },
  },
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
  ],
  models: require('./models'),
  timezones: {
    'GMT+01': 'RUS+1',
    'GMT+02': 'RUS+2',
    'GMT+03': 'RUS+3',
    'GMT+04': 'RUS+4',
    'GMT+05': 'RUS+5',
    'GMT+06': 'RUS+6',
    'GMT+07': 'RUS+7',
    'GMT+08': 'RUS+8',
    'GMT+09': 'RUS+9',
    'GMT+10': 'RUS+10',
    'GMT+11': 'RUS+11',
  },
};
