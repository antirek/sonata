
const getTimezoneByOffset = (offset, vendor) => {
  const offsets = {
    'grandstream': {
      'GMT+01': 'CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00',
      'GMT+02': 'TZP-2',
      'GMT+03': 'TZQ-3',
      'GMT+04': 'TZR-4',
      'GMT+05': 'TZS-5',
      'GMT+06': 'TZV-6',
      'GMT+07': 'TZX-7',
      'GMT+08': 'TZY-8',
      'GMT+09': 'TZZ-9',
      'GMT+10': 'EST-10',
      'GMT+11': 'TZc-11',
    },
    'yealink': {
      'GMT+01': '+1',
      'GMT+02': '+2',
      'GMT+03': '+3',
      'GMT+04': '+4',
      'GMT+05': '+5',
      'GMT+06': '+6',
      'GMT+07': '+7',
      'GMT+08': '+8',
      'GMT+09': '+9',
      'GMT+10': '+10',
      'GMT+11': '+11',
    },
    'panasonic': {
      'GMT+01': '60',
      'GMT+02': '120',
      'GMT+03': '180',
      'GMT+04': '240',
      'GMT+05': '300',
      'GMT+06': '360',
      'GMT+07': '420',
      'GMT+08': '480',
      'GMT+09': '540',
      'GMT+10': '600',
      'GMT+11': '660',
    },
    'fanvil': {
      'GMT+01': '',
      'GMT+02': '',
      'GMT+03': '12',
      'GMT+04': '',
      'GMT+05': '',
      'GMT+06': '',
      'GMT+07': '28',
      'GMT+08': '',
      'GMT+09': '',
      'GMT+10': '',
      'GMT+11': '',
    },
  };

  return offsets[vendor] ? offsets[vendor][offset] : null;
};

module.exports = {
  getTimezoneByOffset,
};
