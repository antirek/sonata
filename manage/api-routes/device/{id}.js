module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {

  }
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function post(req, res) {
    console.log('request params', req.params);
    console.log('request body:', req.body);

    Device.findByIdAndUpdate(req.params.id, req.body, {upsert: true})
        .then(()=>{
          return Device.findById(req.params.id);
        })
        .then((device) => {
          console.log('db return:', device);
          if (!device) {
            return Promise.reject(new Error('no device'));
          }
          res.status(200).json(device);
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  }

  get.apiDoc = {
    description: 'get by id',
    operationId: 'get config',
    tags: ['config'],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'requested device',
      },

      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error',
        },
      },
    },
  };

  post.apiDoc = {
    description: 'update config by id',
    operationId: 'update config',
    tags: ['config'],
    parameters: [
      {
        in: 'body',
        name: 'user',
        description: 'The user to create.',
        // type: 'object',
        schema: {
          type: 'object',
        },
      },
    ],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'requested device',
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
        name: 'id',
        in: 'path',
        type: 'string',
        required: true,
        description: 'id',
      },
    ],
    // get: get,
    post: post,
  };
};

