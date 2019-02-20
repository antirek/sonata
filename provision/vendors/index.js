
module.exports = {
  grandstream: {
    gxp1400: {
      type: 'phone',
      template: 'gxp1400.xml',
      accounts: 2,
    },
    gxp1610: {
      type: 'phone',
      template: 'gxp1610.xml',
      accounts: 1,
    },
    gxp1620: {
      type: 'phone',
      template: 'gxp1620.xml',
      accounts: 2,
    },
    dp715: {
      type: 'gateway',
      template: 'dp715.xml',
      accounts: 5,
      profiles: 2,
    },
    ht812: {
      type: 'gateway',
      template: 'ht812.xml',
    },
    ht814: {
      type: 'gateway',
      template: 'ht814.xml',
    },
  },
  panasonic: {
    tgp600: {
      type: 'phone',
      template: 'tgp600.sys',
    },
  },
  yealink: {
    t28p: {
      type: 'phone',
      template: 't19.cfg',
    },
  },
  fanvil: {
    c58: {
      type: 'phone',
      template: 'c58.cfg',
    },
  },
};
