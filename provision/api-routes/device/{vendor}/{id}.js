module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {
    console.log('qqw', req.params);

    Device.find(null, {'_id': 0, '__v': 0, 'items._id': 0})
        .then((result) => {
          // console.log(result)
          res.status(200).json(result);
          const device = result;
          const vendor = device.vendor;

          console.log('vendor', vendor);
        });
    /*
    res.status(200).json({
      id: req.params.id,
      name: req.query.name,
      age: req.query.age,
    });
    */
  }

  get.apiDoc = {
    description: 'get by id',
    operationId: 'get config',
    tags: ['config'],
    produces: [
      'application/xml',
    ],
    responses: {
      200: {
        description: 'Requested config',
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
        name: 'vendor',
        in: 'path',
        type: 'string',
        required: true,
        description: 'vendor',
      },
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
};

