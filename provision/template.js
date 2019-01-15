const fs = require('fs');
const path = require('path');

const template = (device) => {
  const vendor = device.vendor;
  const model = device.model;

  const basePath = './provision/vendors/';
  const templatePath = path.resolve(basePath, vendor, model + '.xml');
  console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  // console.log('template', template);
  let config = template.toString('utf8')
    .replace('{{timezone}}', device.timezone)
    .replace('{{ntp_server}}', device.ntp_server);

  let accounts = device.accounts;
  accounts.forEach((element) => {
    for (prop in element) {
      let mask = '{{' + (['account', element.position, prop].join('_')) + '}}';
      //console.log(mask)
      config = config.replace(mask, element[prop]);
    }
  });
  
  return config;
};

module.exports = template;
