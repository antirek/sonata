
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
    ],
    models: [
      {
        id: 'gxp1400',
        name: 'GXP1400',
        type: 'phone',
        template: 'grandstream/default_phone.xml',
        accounts: 2,
      },
      {
        id: 'gxp1610',
        name: 'GXP1610',
        type: 'phone',
        template: 'grandstream/default_phone.xml',
        accounts: 1,
      },
      {
        id: 'gxp1620',
        name: 'GXP1620',
        type: 'phone',
        template: 'grandstream/default_phone.xml',
        accounts: 2,
      },
      {
        id: 'dp715',
        name: 'DP715',
        type: 'gateway',
        template: 'grandstream/default_gateway.xml',
        accounts: 5,
        profiles: 2,
      },
      {
        id: 'ht812',
        name: 'HT812',
        type: 'gateway',
        template: 'grandstream/default_gateway.xml',
        accounts: 2,
        profiles: 2,
      },
      {
        id: 'ht814',
        name: 'HT814',
        type: 'gateway',
        template: 'grandstream/default_gateway.xml',
        accounts: 4,
        profiles: 2,
      },
      {
        id: 'gxw4008',
        name: 'GXW4008',
        type: 'gateway',
        template: 'grandstream/default_gateway.xml',
        accounts: 8,
        profiles: 2,
      },
    ],
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
    models: [
      {
        id: 'tgp600',
        name: 'TGP600',
        type: 'phone',
        template: 'panasonic/default.sys',
        accounts: 8,
      },
    ],
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
    models: [
      {
        id: 't28p',
        name: 'T28P',
        type: 'phone',
        template: 'yealink/default.cfg',
        accounts: 6,
      },
    ],
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
    models: [
      {
        id: 'c58',
        name: 'C58',
        type: 'phone',
        template: 'fanvil/default.cfg',
      },
      {
        id: 'x5s',
        name: 'X5S',
        type: 'phone',
        template: 'fanvil/default.cfg',
        accounts: 6,
      },
    ],
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
    models: [
      {
        id: '320hd',
        name: '320HD',
        type: 'phone',
        template: 'audiocodes/default.cfg',
        accounts: 4,
      },
    ],
  },
];
