const scopes = require('./scopes');
const path = require('path');
const fs = require('fs');

/**
 *
 */
class VendorStore {
  /**
   * @param {Object} options
   */
  constructor(options = {}) {
    this.vendorSpecPath = options.vendorSpecPath;
  }

  /**
   * @return {*}
   */
  getVendorSpecs() {
    const dirs = (p) => {
      return fs.readdirSync(p)
          .filter((f) => fs.statSync(path.join(p, f)).isDirectory());
    };

    const dirList = dirs(__dirname);

    const specs = dirList.map( (dir) => {
      const r = path.join(__dirname, dir, '/spec');
      return require(r);
    });
    return specs;
  }

  /**
   * @param {string} vendor
   * @param {string} offset
   * @return {*}
   */
  getTimezoneByOffset(vendor, offset) {
    const vendorSpec = this.getVendorSpec(vendor);
    const tz = vendorSpec.timezones ? vendorSpec.timezones[offset] : null;
    return tz;
  };

  /**
   * @return {*}
   */
  getVendorsList() {
    return this.getVendorSpecs();
  };

  /**
   * @return {*}
   */
  getScopesList() {
    return scopes;
  };

  /**
   * @param {string} vendor
   * @param {string} model
   * @return {*}
   */
  getConfigTemplate(vendor, model) {
    const deviceSpec = this.getDeviceSpec(vendor, model);
    if (!deviceSpec || !deviceSpec.template) {
      return null;
    }

    const templatePath = path.resolve(__dirname, deviceSpec.template);
    const template = fs.readFileSync(templatePath);

    return template.toString('utf8');
  };

  /**
   * @param {string} vendor
   * @return {*}
   */
  getVendorSpec(vendor) {
    const vendorSpec = this.getVendorSpecs().find((vendorSpec) => {
      return vendorSpec.id === vendor;
    });
    return vendorSpec;
  };

  /**
   * @param {string} vendor
   * @param {string} model
   * @return {*}
   */
  getDeviceSpec(vendor, model) {
    const vendorSpec = this.getVendorSpec(vendor);
    // console.log(vendorSpec);
    if (!vendorSpec.models || vendorSpec.models.length < 1) return null;

    const modelSpec = vendorSpec.models.find((modelSpec) => {
      return modelSpec.id === model;
    });

    return modelSpec;
  };
}

module.exports = VendorStore;
