
module.exports = (RequestLog) => {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  const get = (req, res) => {
    console.log('request params', req.params);
    console.log('request body:', JSON.stringify(req.body));
    console.log('request query', req.query);
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    RequestLog.find({token: req.params.token})
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .sort({created_at: -1})
        .exec()
        .then((list) => {
          console.log('vendors list:', list);
          res.status(200).json(list);
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  };


  get.apiDoc = {
    description: 'get provision requests log',
    tags: ['log'],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'list requests',
      },

      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error',
        },
      },
    },
  };

  return {
    parameters: [
      {
        name: 'token',
        in: 'path',
        type: 'string',
        required: true,
        description: 'token',
      },
      {
        name: 'limit',
        in: 'query',
        type: 'integer',
        description: 'limit',
      },
      {
        name: 'offset',
        in: 'query',
        type: 'integer',
        description: 'offset',
      },
    ],
    get,
  };
};

