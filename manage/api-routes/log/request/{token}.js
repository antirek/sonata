
module.exports = (RequestLog) => {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  const get = (req, res) => {
    console.log('request params', req.params);
    console.log('request body:', JSON.stringify(req.body));

    RequestLog.find({token: req.params.token})
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
    ],
    get,
  };
};

