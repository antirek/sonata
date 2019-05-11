const vendorSpecs = require('./spec');
const getTimezoneByOffset = require('./timezones').getTimezoneByOffset;
const path = require('path');
const fs = require('fs');

const getVendorsList = () => {
  return vendorSpecs;
};

const getConfigTemplate = (vendor, model) => {
  const basePath = './vendors/';
  const deviceSpec = getDeviceSpec(vendor, model);


  if (!deviceSpec || !deviceSpec.template) {
    return null;
  }

  const templatePath = path.resolve(basePath, deviceSpec.template);
  // console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  return template;
};

const getVendorSpec = (vendor) => {
  const vendorSpec = vendorSpecs.find((vendorSpec) => {
    return vendorSpec.id === vendor;
  });
  return vendorSpec;
};

const getDeviceSpec = (vendor, model) => {
  const vendorSpec = getVendorSpec(vendor);
  // console.log(vendorSpec);
  if (!vendorSpec.models || vendorSpec.models.length < 1) return null;

  const modelSpec = vendorSpec.models.find((modelSpec) => {
    return modelSpec.id === model;
  });

  return modelSpec;
};


module.exports = {
  getVendorsList,
  getDeviceSpec,
  getVendorSpec,
  getTimezoneByOffset,
  getConfigTemplate,
};
