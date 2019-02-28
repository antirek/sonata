const helper = require('./../helper');

module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function post(req, res) {
    console.log('request params', req.params);
    console.log('request body:', JSON.stringify(req.body));

    const key = req.body.key;
    console.log('key:', key);
    console.log('token:', req.body.token || '');
    console.log('mac:', req.body.mac);
    
    let device = req.body;
    device.mac = helper.prepareMAC(device.mac);
    console.log('device prepared for db:', device);

    Device.findOneAndUpdate({key}, device, {
      upsert: true,
      returnNewDocument: true,
    })
        .then(() => {
          return Device.findOne({key});
        })
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


  post.apiDoc = {
    description: 'create device config ',
    tags: ['config'],
    parameters: [
      {
        in: 'body',
        name: 'device',
        description: 'The device to create.',
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
    post: post,
  };
};

