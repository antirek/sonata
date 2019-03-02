const vendors = require('./../../../provision/vendors/index');

module.exports = () => {
  /**
    *
    * @param {Object} req
    * @param {Object} res
    */
  const get = (req, res) => {
    console.log('get request params', req.params);
    const id = req.params.id;

    (() => {
      return new Promise((resolve, reject) => {
        const deviceList = vendors[id];
        const preparedDeviceList = [];
        for (const device in deviceList) {
          if (Object.prototype.hasOwnProperty.call(deviceList, device)) {
            preparedDeviceList.push({
              id: device,
              name: device,
              type: deviceList[device].type,
            });
          }
        }
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

