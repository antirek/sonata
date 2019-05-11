const vendors = require('./../../../../vendors/index').getVendorsList();

module.exports = () => {
  /**
    *
    * @param {Object} req
    * @param {Object} res
    */
  const get = (req, res) => {
    console.log('get request params', req.params);
    const id = req.params.id;

    const getModelsByVendor = (vendor) => {
      // console.log(vendor, model);
      const vendorSpec = vendors.find((vendorSpec) => {
        return vendorSpec.id === vendor;
      });
      // console.log(vendorSpec);

      return vendorSpec.models;
    };


    (() => {
      return new Promise((resolve, reject) => {
        const deviceList = getModelsByVendor(id);
        const preparedDeviceList = deviceList.map((model) => {
          return {
            id: model.id,
            name: model.name,
          };
        });
        res.status(200).json(preparedDeviceList);
        resolve();
      });
    })()
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  };

  get.apiDoc = {
    description: 'get vendor supported model list by vendor id',
    operationId: 'get config',
    tags: ['vendor'],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'requested vendor model list',
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
  };
};

