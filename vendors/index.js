const vendorSpecs = require('./spec');
const getTimezoneByOffset = require('./timezones').getTimezoneByOffset;
const scopes = require('./scopes');
const path = require('path');
const fs = require('fs');

const getVendorsList = () => {
  return vendorSpecs;
};

const getScopesList = () => {
  return scopes;
};

const getConfigTemplate = (vendor, model) => {
  const deviceSpec = getDeviceSpec(vendor, model);
  if (!deviceSpec || !deviceSpec.template) {
    return null;
  }

  const templatePath = path.resolve(__dirname, deviceSpec.template);
  console.log('template path:', templatePath);
  const template = fs.readFileSync(templatePath);

  return template.toString('utf8');
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
  getScopesList,
};
