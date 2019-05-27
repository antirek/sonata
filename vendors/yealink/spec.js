module.exports = {
  version: '1.0',
  id: 'yealink',
  name: 'Yealink',
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
  ],
  models: require('./models'),
};
