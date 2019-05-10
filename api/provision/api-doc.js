module.exports = {
  swagger: '2.0',
  basePath: '/v1',
  schemes: ['http'],

  info: {
    title: 'provision api',
    version: '1.0.0',
  },

  definitions: {
    Error: {
      additionalProperties: true,
    },
  },
  // paths are derived from args.routes.  These are filled in by fs-routes.
  paths: {},
};
