const template = require('./../../../template');

module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {
    console.log('request params', req.params);


    Device.findById(req.params.id)
        .then((result) => {
          console.log('db find:', result);
          const device = result;

          if (!device) {
            console.log('no device');
            res.status(500).send();
            return;
          }

          console.log(device);
          const t = template(device);
          console.log('vendor', device.vendor);
          console.log('config template', t);
          res.status(200).type('application/xml').send(t);
        })
        .catch((err) => {
          console.log('error', err);
          res.status(500).send();
        });
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

