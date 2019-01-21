module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {
    console.log('get request params', req.params);

    Device.findOne({_id: req.params.id})
        .then((device) => {
          console.log('db return:', JSON.stringify(device));
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


  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function del(req, res) {
    console.log('del request params', req.params);

    Device.findOneAndRemove({_id: req.params.id})
        .then((device) => {
          console.log('db remove doc:', JSON.stringify(device));
          if (!device) {
            return Promise.reject(new Error('no device'));
          }
          res.status(200).json({status: 'OK'});
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  }

  del.apiDoc = {
    description: 'delete by id',
    operationId: 'delete config',
    tags: ['config'],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'status',
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
    get: get,
    del: del,
  };
};

