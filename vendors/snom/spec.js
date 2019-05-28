module.exports = {
  version: '1.0',
  id: 'snom',
  name: 'Snom',
  instruction: 'в поле Protocol выберите "{{protocol}}", \n' +
                   'в поле Url укажите {{server}}{{qs}}',
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
