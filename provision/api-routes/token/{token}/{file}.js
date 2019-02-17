const template = require('./../../../template');
const strip = require('strip-passwords');
const ruleVerification = require('./../../../verification').ruleVerification;

module.exports = (Device) => {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {
    console.log('request params:', req.params);
    console.log('request user-agent:', req.headers['user-agent']);

    const token = req.params.token;
    console.log('token:', token);

    const file = req.params.file;
    console.log('file:', file);

    const mac = file.match(new RegExp('cfg(.*).xml'))[1];
    console.log('mac:', mac);

    const requestInfo = {
      remote_ip: req.remote_ip,
      mac,
    };

    Device.findOne({token, mac})
        .then((device) => {
          console.log('db find:', strip(device));
          return ruleVerification(device, requestInfo);
        })
        .then((device) => {
          const t = template(device);
          console.log('vendor', device.vendor);
          console.log('config template', t);
          res.status(200).type('application/xml').send(t);
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  }

  get.apiDoc = {
    description: 'get by token and mac',
    operationId: 'get device config',
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
        name: 'token',
        in: 'path',
        type: 'string',
        required: true,
        description: 'device config token',
      },
      {
        name: 'file',
        in: 'path',
        type: 'string',
        required: true,
        description: 'filename like cfg{mac}.xml',
      },
    ],
    get: get,
  };
};
