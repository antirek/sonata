// Showing that you don't need to have apiDoc defined on methodHandlers.
const config = require('config');

module.exports = () => {
  const doc = {
    get: [(req, res, next) => {

    }],
  };

  doc.get.apiDoc = {
    description: 'get list configs',
    operationId: 'get',
    tags: ['config'],
    parameters: [
    ],
    responses: {
      200: {
        description: 'get list',
        schema: {
          type: 'array',
        },
      },
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error',
        },
      },
    },
  };

  return doc;
};
