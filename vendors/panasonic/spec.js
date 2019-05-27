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
};
