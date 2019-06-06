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
};
