const vendors = require('./../../../vendors/index').getVendorsList();
const scopesInfo = require('./../../../api/provision/scopes');

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
        const vendorList = vendors.map((vendorSpec) => {
          return {
            id: vendorSpec.id,
            name: vendorSpec.name,
            scopes: scopesInfo.filter((scopeInfo) => {
              return vendorSpec.scopes.includes(scopeInfo.id);
            }),
          };
        });
        // console.log(vendorList);
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

