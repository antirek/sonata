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
};
