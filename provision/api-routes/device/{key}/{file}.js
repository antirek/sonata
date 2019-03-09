const template = require('./../../../template');
const strip = require('strip-passwords');

const ruleVerification = require('./../../../verification').ruleVerification;
const helper = require('./../../../../manage/helper');


module.exports = (Device, RequestLog) => {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  function get(req, res) {
    console.log('request device id');
    console.log('request params:', req.params);
    console.log('request user-agent:', req.headers['user-agent']);
    console.log('remote ip:', req.remote_ip);
    console.log('remote ip info:', req.ipInfo);

    const log = new RequestLog({
      ip: req.remote_ip,
      request: 'key',
      userAgent: req.headers['user-agent'],
    });

    const key = req.params.key;
    console.log('key:', key);

    const file = req.params.file;
    console.log('file:', file);

    const mac = helper.getMacFromFile(file);
    console.log('mac:', mac);

    const requestInfo = {
      remote_ip: req.remote_ip,
      mac,
    };

    Device.findOne({key})
        .then((device) => {
          console.log('db find:', strip(device));
          if (device.token) {
            log.token = device.token;
          }
          return ruleVerification(device, requestInfo);
        })
        .then((device) => {
          const t = template(device);
          console.log('vendor', device.vendor);
          console.log('config template', t);
          log.status = 'OK';
          res.status(200).type('application/xml').send(t);
        })
        .catch((err) => {
          console.log('error', err);
          log.status = 'FAIL';
          res.status(404).send();
        })
        .then(() => {
          log.save();
        })
        .catch((err) => {
          console.log('error', err);
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
