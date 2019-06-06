module.exports = {
  version: '1.0',
  id: 'panasonic',
  name: 'Panasonic',
  instruction: 'в поле Protocol выберите "{{protocol}}", \n' +
                 'в поле Url укажите {{server}}{{qs}}/{{filename}}',
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
  ],
  models: require('./models'),
  timezones: {
    'GMT+01': '60',
    'GMT+02': '120',
    'GMT+03': '180',
    'GMT+04': '240',
    'GMT+05': '300',
    'GMT+06': '360',
    'GMT+07': '420',
    'GMT+08': '480',
    'GMT+09': '540',
    'GMT+10': '600',
    'GMT+11': '660',
  },
};
