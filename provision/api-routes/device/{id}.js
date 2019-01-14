module.exports = {
  parameters: [
    {
      name: 'id',
      in: 'path',
      type: 'string',
      required: true,
      description: 'id',
    },
  ],
  get: get,
};

/**
*
* @param {Object} req
* @param {Object} res
*/
function get(req, res) {
  console.log('qw', req.params);
  res.status(200).json({
    id: req.params.id,
    name: req.query.name,
    age: req.query.age,
  });
}

get.apiDoc = {
  description: 'get device config by key',
  operationId: 'getDevice',
  tags: ['config'],
  responses: {
    200: {
      description: 'Requested user',
    },

    default: {
      description: 'Unexpected error',
      schema: {
        $ref: '#/definitions/Error',
      },
    },
  },
};

