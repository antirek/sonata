
module.exports = [
  {
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
    models: require('./grandstream/models'),
  },
  {
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
    models: require('./panasonic/models'),
  },
  {
    id: 'yealink',
    name: 'Yealink',
    scopes: [
      'accounts',
      'phonebooks',
      'timezone',
      'ntp',
    ],
    models: require('./yealink/models'),
  },
  {
    id: 'fanvil',
    name: 'Fanvil',
    instruction: 'В поле Server {{server}}, в поле file {{qs}}/{mac}.cfg',
    scopes: [
      'accounts',
      'phonebooks',
      'timezone',
      'ntp',
    ],
    models: require('./fanvil/models'),
  },
  {
    id: 'digium',
    name: 'Digium',
    scopes: [
      'accounts',
      'phonebooks',
      'timezone',
      'ntp',
    ],
    models: [
      {
        id: 'a25',
        name: 'A25',
        type: 'phone',
        template: 'fanvil/default.cfg',
        accounts: 6,
      },
    ],
  },
  {
    id: 'audiocodes',
    name: 'AudioCodes',
    scopes: [
      'accounts',
      'phonebooks',
      'timezone',
      'ntp',
    ],
    models: require('./audiocodes/models'),
  },
];
