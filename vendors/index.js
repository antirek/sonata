const vendorSpecs = require('./spec');
const getTimezoneByOffset = require('./timezones').getTimezoneByOffset;

const getVendorsList = () => {
  return vendorSpecs;
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
};
