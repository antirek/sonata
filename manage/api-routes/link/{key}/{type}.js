const urlParse = require('url-parse');
const vendors = require('./../../../../provision/vendors/index');

const getUrl = (config, type, device) => {
  let secret;

  if (type === 'device') {
    secret = device.id;
  } else if (type === 'token') {
    secret = device.token ? device.token : null;
  } else {
    return;
  }

  if (!secret) return;

  return [
    config.url.provision, '/v1/',
    type, '/', secret,
  ].join('');
};

const getData = (config, type, device) => {
  const url = getUrl(config, type, device);
  const arrUrl = urlParse(url);
  let filename;

  if (device.vendor === 'panasonic') {
    filename = 'Config{mac}.xml';
  } else if (device.vendor === 'fanvil') {
    filename = '{mac}.cfg';
  }

  return {
    url,
    protocol: arrUrl['protocol'],
    server: arrUrl['hostname'],
    qs: arrUrl['pathname'],
    filename,
  };
};

module.exports = (Device, config) => {
  /**
    *
    * @param {Object} req
    * @param {Object} res
    */
  function get(req, res) {
    console.log('get request params', req.params);

    Device.findOne({key: req.params.key})
        .then((device) => {
          console.log('db return:', JSON.stringify(device));
          if (!device) {
            return Promise.reject(new Error('no device'));
          }
          const data = getData(config, req.params.type, device);
          if (!data) {
            return Promise.reject(new Error('no url'));
          }
          // console.log('vendors', vendors);

          const vendor = vendors.find((vendor) => {
            return vendor.id == device.vendor;
          });
            // console.log('vendor', vendor);

          let instruction;
          if (vendor && vendor.instruction) {
            instruction = vendor.instruction;
            instruction = instruction
                .replace('{{server}}', data.server)
                .replace('{{url}}', data.url)
                .replace('{{protocol}}', data.protocol)
                .replace('{{filename}}', data.filename)
                .replace('{{qs}}', data.qs);
          } else {
            instruction = data.url;
          }

          res.status(200).json({data, instruction});
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  }

  get.apiDoc = {
    description: 'get provision link by personal device key and type',
    operationId: 'getProvisionLink',
    tags: ['link'],
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
    parameters: [
      {
        name: 'key',
        in: 'path',
        type: 'string',
        required: true,
        description: 'key',
      },
      {
        name: 'type',
        in: 'path',
        type: 'string',
        required: true,
        description: 'type',
      },
    ],
    get: get,
  };
};

