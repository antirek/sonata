
module.exports = {
  grandstream: {
    gxp1400: {
      type: 'phone',
      template: 'default_phone.xml',
      accounts: 2,
    },
    gxp1610: {
      type: 'phone',
      template: 'default_phone.xml',
      accounts: 1,
    },
    gxp1620: {
      type: 'phone',
      template: 'default_phone.xml',
      accounts: 2,
    },
    dp715: {
      type: 'gateway',
      template: 'default_gateway.xml',
      accounts: 5,
      profiles: 2,
    },
    ht812: {
      type: 'gateway',
      template: 'default_gateway.xml',
      accounts: 2,
      profiles: 2,
    },
    ht814: {
      type: 'gateway',
      template: 'default_gateway.xml',
      accounts: 4,
      profiles: 2,
    },
  },
  panasonic: {
    tgp600: {
      type: 'phone',
      template: 'default.sys',
      accounts: 8,
    },
  },
  yealink: {
    t28p: {
      type: 'phone',
      template: 'default.cfg',
      accounts: 6,
    },
  },
  fanvil: {
    c58: {
      type: 'phone',
      template: 'default.cfg',
    },
    x5s: {
      type: 'phone',
      template: 'default.cfg',
      accounts: 6,
    },
  },
};
