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
    console.log('remote ip:', req.remote_ip);
    console.log('remote ip info:', req.ipInfo);

    const key = req.params.key;
    console.log('key:', key);

    const file = req.params.file;
    console.log('file:', file);

    const mac = file.match(new RegExp('cfg(.*).xml'))[1];
    console.log('mac:', mac);

    const requestInfo = {
      remote_ip: req.remote_ip,
      mac,
    };

    Device.findOne({key})
        .then((device) => {
          console.log('db find:', strip(device));
          return ruleVerification(device, requestInfo);
        }).then((device) => {
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
    description: 'get by key',
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
        name: 'key',
        in: 'path',
        type: 'string',
        required: true,
        description: 'device config key',
      },
      {
        name: 'file',
        in: 'path',
        type: 'string',
        required: true,
        description: 'file',
      },
    ],
    get: get,
  };
};
