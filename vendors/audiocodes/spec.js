module.exports = {
  version: '1.0',
  id: 'audiocodes',
  name: 'AudioCodes',
  scopes: [
    'accounts',
    'phonebooks',
    'timezone',
    'ntp',
  ],
  models: require('./models'),
  timezones: null,
};
