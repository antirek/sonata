module.exports = {
  settings: {
    mongodb: 'mongodb://localhost:27017/sonata',
  },
  logs: {
    mongodb: 'mongodb://localhost:27017/sonata_log2',
  },
  provision: {
    port: 3020,
  },
  manage: {
    port: 3021,
  },
  url: {
    provision: 'http://provision.server.com',
  },
  remove: {
    cron: '0 4 * * *',
  },
};
