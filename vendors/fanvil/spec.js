module.exports = {
  version: '1.0',
  id: 'fanvil',
  name: 'Fanvil',
  instruction: 'В поле Server {{server}}, в поле file {{qs}}/{mac}.cfg',
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
  ],
  models: require('./models'),
};
