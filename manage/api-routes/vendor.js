const vendors = require('./../../provision/vendors/index');

module.exports = () => {
  /**
  *
  * @param {Object} req
  * @param {Object} res
  */
  const get = (req, res) => {
    console.log('request params', req.params);
    console.log('request body:', JSON.stringify(req.body));

    console.log('vendors:', vendors);

    (() => {
      return new Promise((resolve, reject) => {
        const vendorList = [];
        for (const vendor in vendors) {
          if (Object.prototype.hasOwnProperty.call(vendors, vendor)) {
            vendorList.push({
              id: vendor,
              name: vendor,
            });
          }
        }
        resolve(vendorList);
      });
    })()
        .then((list) => {
          console.log('vendors list:', list);
          res.status(200).json(list);
        })
        .catch((err) => {
          console.log('error', err);
          res.status(404).send();
        });
  };


  get.apiDoc = {
    description: 'get list vendors',
    tags: ['vendor'],
    produces: [
      'application/json',
    ],
    responses: {
      200: {
        description: 'list vendors',
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
    get,
  };
};

