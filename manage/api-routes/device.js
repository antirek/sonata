module.exports = function(Device) {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function post(req, res) {
    console.log('request params', req.params);
    console.log('request body:', JSON.stringify(req.body));

    const device = new Device(req.body);
    console.log('device', device);
    device.save().then((res) => {
      // console.log('res save', res);
      console.log('save new config by id:', res._id);
      return res._id;
    }).then((id) => {
      return Device.findOne({_id: id});
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

